import type { Ref } from "vue"
import type { TableRowData } from "./types"
import pinyinMatch from 'pinyin-match'
import { debounce } from "lodash"

export function treeToFlatWithoutId(treeData: any[], options = {}) {
  const {
    rowField: idKey = 'id',
    parentField: parentIdKey = 'parentId',
    childrenField: childrenKey = 'children',
    idPreFix = 'node_',
    rootParentId = null
  } = options as any

  const flatData: any[] = []
  let counter = 1
  function traverse(node: any, parentId: string) {
    const id = `${idPreFix}${counter++}`
    const flatNode = { ...node }
    delete flatNode[childrenKey]
    flatNode[idKey] = id
    flatNode[parentIdKey] = parentId

    flatData.push(flatNode)

    if (node[childrenKey] && Array.isArray(node[childrenKey])) {
      node[childrenKey].forEach((child) => {
        traverse(child, id)
      })
    }
  }

  // 处理顶层节点
  if (Array.isArray(treeData)) {
    treeData.forEach((node) => {
      traverse(node, rootParentId)
    })
  } else {
    traverse(treeData, rootParentId)
  }
  console.log('flatData', flatData)
  return flatData
}

export function findParentsInFlatTree(
  flatData: any[],
  childItems: readonly any[],
  options = {} as any
) {
  const {
    rowField: idKey = 'id',
    parentField: parentIdKey = 'parentId',
    rootParentId = null
  } = options

  // 创建ID到节点的映射表，便于快速查找
  const nodeMap = new Map()
  flatData.forEach((node: { [x: string]: any }) => {
    nodeMap.set(node[idKey], { ...node })
  })

  // 用于存储所有需要返回的节点ID（去重）
  const resultIds = new Set()
  // 用于存储最终结果（包含所有子节点和父节点）
  const result: any[] = []

  // 处理单个子节点的情况
  if (!Array.isArray(childItems)) {
    childItems = [childItems]
  }

  // 首先将所有子节点添加到结果中
  childItems.forEach((child: { [x: string]: any }) => {
    const childId = child[idKey]
    if (!childId) return // 跳过无效子节点

    const childNode = nodeMap.get(childId)
    if (childNode && !resultIds.has(childId)) {
      resultIds.add(childId)
      result.push(childNode)
    }
  })

  // 遍历每个子节点，收集其父节点路径
  childItems.forEach((child: { [x: string]: any }) => {
    const childId = child[idKey]
    if (!childId) return // 跳过无效子节点

    let currentId = childId

    // 循环查找父节点，直到根节点或找不到父节点为止
    while (currentId !== rootParentId) {
      const currentNode = nodeMap.get(currentId)
      if (!currentNode) break

      const parentId = currentNode[parentIdKey]
      if (parentId === rootParentId) break

      const parentNode = nodeMap.get(parentId)
      if (!parentNode)  break

      // 如果父节点ID未被记录过，则添加到结果中
      if (!resultIds.has(parentId)) {
        resultIds.add(parentId)
        result.push(parentNode)
      }

      currentId = parentId
    }
  })
  if(result.length === 0){
    return childItems
  }
  return result
}

export function convertToTree(flatData: any[]) {
  // 创建一个映射表存储所有节点
  const nodeMap: any = {};
  // 存储根节点
  const tree: any = {};
  
  // 首先将所有节点存入映射表
  flatData.forEach(node => {
      // 复制节点，避免修改原始数据
      nodeMap[node.id] = { ...node };
      // 初始化children数组
      nodeMap[node.id].children = [];
  });
  
  // 构建树形结构
  flatData.forEach(node => {
      const currentNode = nodeMap[node.id];
      const parentId = node.parentId;
      
      if (parentId && parentId.includes('_currency')) {
          // 如果是顶级节点，直接添加到树的根节点下
          if (!tree[parentId]) {
              tree[parentId] = {
                  id: parentId,
                  label: parentId === 'local_currency' ? '本币投组' : '外币投组',
                  children: []
              };
          }
          tree[parentId].children.push(currentNode);
      } else {
          // 处理有其他父节点的情况（当前数据中没有这种情况）
          const parentNode = nodeMap[parentId];
          if (parentNode) {
              parentNode.children.push(currentNode);
          }
      }
  });
  
  // 将树形对象转换为数组形式返回
  return Object.values(tree);
}

/**
 * 处理表格选择变更事件
 * 更新选中记录数组并同步到双向绑定
 * @param records - 选中的表格行数据
 */
export const flattenRecords = (data: TableRowData[], isLeaf?: boolean): TableRowData[] => {
  let result: TableRowData[] = []
  data.forEach((item) => {
    if (isLeaf) {
      if (item.children && item.children.length) {
        result = [...result, ...flattenRecords(item.children, true)]
      } else {
        result.push(item)
      }
    } else {
      if (!(item.children && item.children.length)) {
        result.push(item)
      }
    }
  })
  return result
}

/**
 * 计算id-parentId结构数据的最后一层节点数量
 * @param {Array} data - 扁平化数据，每个元素包含id和parentId字段
 * @returns {number} - 最后一层节点数量
 */
export function countLastLevelNodes(data: TableRowData[]) {
  // 获取所有父节点ID的集合
  const parentIds = new Set(data.map((item: TableRowData) => item.parentId).filter((id) => id !== null))

  // 统计没有子节点的节点
  return data.filter((item) => !parentIds.has(item.id)).length
}

/**
 * 初始化收藏状态
 * 从IndexedDB加载收藏数据并填充到响应式Map中
 */
export const initFavorites = async (idb: any, favorites: any) => {
  try {
    const storedData = await idb.getFavorites()
    const entries =
      typeof storedData === 'object' && storedData !== null ? Object.entries(storedData) : []
    entries.forEach(([key, value]) => favorites.set(String(key), value))
  } catch (e) {
    console.error('Failed to load favorites from IndexedDB:', e)
  }
}

/**
 * 点击空白区域关闭下拉面板
 * @param e - 鼠标事件对象
 * @param querySelectRef - 查询选择器引用
 * @param open - 下拉面板显示状态
 */
export const handleClosedSelect = (
  e: MouseEvent,
  querySelectRef: Ref<HTMLElement | null, HTMLElement | null>,
  open: Ref<boolean, boolean>,
  closedSelect: (e: MouseEvent) => void
) => {
  if (!querySelectRef.value) return

  const popupRect = querySelectRef.value.getBoundingClientRect()
  const { left: popupLeft, top: popupTop, width: popupWidth, height: popupHeight } = popupRect
  const { clientX: x, clientY: y } = e

  // 判断点击位置是否在弹窗外部
  if (x < popupLeft || x > popupLeft + popupWidth || y < popupTop || y > popupTop + popupHeight) {
    open.value = false
    document.removeEventListener('click', closedSelect)
  }
}

/**
 * 搜索匹配逻辑
 * 支持中英文直接匹配和拼音首字母匹配
 * @param item - 投组数据项
 * @param inputValue - 搜索输入值
 * @returns 是否匹配成功
 */
export const matchesSearch = (item: TableRowData, inputValue: string, props: any): boolean => {
  if (!inputValue) return true
  const lowerInput = inputValue.toLowerCase()
  const lowerLabel = item[props.labelKey].toLowerCase()

  // 直接匹配（中英文）
  if (lowerLabel.includes(lowerInput)) return true

  // 拼音首字母匹配
  return Boolean(pinyinMatch.match(lowerLabel, lowerInput))
}

/**
 * IndexedDB工具类
 * 用于管理投组收藏状态的持久化存储
 * 支持收藏数据的读取、保存和数据库连接管理
 */
export const initIDB = (props: any) => {
  return  {
    dbName: 'FavoritesDB',
    db: null as IDBDatabase | null,
    /**
     * 获取对象存储名称
     * @returns 固定的对象存储名称
     */
    getStoreName(): string {
      return 'favoritesStore'
    },
    /**
     * 打开IndexedDB数据库连接
     * 如果数据库不存在则创建，版本为1
     * @returns 数据库实例Promise
     */
    async openDB(): Promise<IDBDatabase> {
      if (this.db) return this.db
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1)
        request.onupgradeneeded = (e) => {
          // 检查 e.target 是否为 null 或 undefined，避免类型错误
          const eventTarget = e.target as IDBOpenDBRequest | null
          const db = eventTarget?.result
          const storeName = this.getStoreName()
          // 检查 db 是否存在，避免出现 'db' 可能为 'undefined' 的错误
          if (db && !db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' })
          }
        }
        request.onsuccess = (e) => {
          // 由于 e.target 类型为 EventTarget，直接访问 result 属性会报错，需要进行类型断言
          const eventTarget = e.target as IDBOpenDBRequest
          this.db = eventTarget.result
          resolve(this.db)
        }
        // 由于 e.target 类型为 EventTarget，直接访问 error 属性会报错，需要进行类型断言
        request.onerror = (e) => {
          const eventTarget = e.target as IDBOpenDBRequest
          reject(eventTarget.error)
        }
      })
    },
    /**
     * 关闭IndexedDB数据库连接
     */
    async closeDB() {
      if (this.db) {
        this.db.close()
        this.db = null
      }
    },
    /**
     * 从IndexedDB获取收藏状态
     * 基于组件id和用户id区分不同的收藏集合
     * @returns 收藏状态对象Promise，键为投组value，值为是否收藏
     */
    async getFavorites(): Promise<Record<string, boolean>> {
      const db = await this.openDB()
      return new Promise((resolve) => {
        const transaction = db.transaction(this.getStoreName(), 'readonly')
        const store = transaction.objectStore(this.getStoreName())
        const userId = localStorage.getItem('userId') || 'defaultUser'
        const key = `${props.id || 'default'}_${userId}`
        const request = store.get(key)
        request.onsuccess = () => resolve(request.result?.data || {})
        request.onerror = () => resolve({})
      })
    },
    /**
     * 保存收藏状态到IndexedDB
     * @param data - 收藏状态对象，键为投组value，值为是否收藏
     * @returns 保存结果Promise
     */
    async saveFavorites(data: Record<string, boolean>): Promise<void> {
      if (!props.id) {
        console.warn('选择组件,请传入id,存储时作为区分使用')
        console.error('如不传入则默认值为 default,可能导致存储混淆')
      }
      const db = await this.openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('favoritesStore', 'readwrite')
        const store = transaction.objectStore(this.getStoreName())
        const userId = localStorage.getItem('userId') || 'defaultUser'
        const key = `${props.id || 'default'}_${userId}`
        const request = store.put({ id: key, data })
  
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
        // request.y
        onerror = () => reject(request.error)
      })
    }
  }
}

/**
 * 保存收藏状态到IndexedDB
 * 使用防抖优化频繁保存操作
 * @param favData - 收藏状态对象
 */
export const saveFavorites = debounce(async (favData: Record<string, boolean>, idb: any) => {
  try {
    await idb.saveFavorites(favData)
  } catch (e) {
    console.error('Failed to save favorites to IndexedDB:', e)
  }
}, 300) // 300ms防抖