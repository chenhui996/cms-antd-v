import { ref } from 'vue'
import { TableSelect } from '../index'
import { ConfigProvider } from 'ant-design-vue'
import type { Meta } from '@storybook/vue3'
import './style.less'

const meta: Meta<typeof TableSelect> = {
  title: '通用/TableSelect 选择组件',
  component: TableSelect,
  decorators: [
    () => ({
      template: '<div class="storybook-demo"><story /></div>',
    })
  ],
};

export default meta;

function trimFirstTwoSpaces(str: string) {
  if (str.startsWith('    ')) {
    return str.slice(4);
  }
  return str;
}

const setupMatch = (code: string) => {
  const matches = code.matchAll(/const\s+\w+\s*=\s*ref\([^)]+\);/g);
  const extractedLines = Array.from(matches).map(match => match[0]);

  const regex = /setup\(\)\s*\{([\s\S]*?)\s*return\s*\{/;
  const match = code.match(regex);

  if (match && match[1]) {
    const setupContent = match[1].split('\n').slice(1).map(line => trimFirstTwoSpaces(line)).join('\n');
    // console.log(setupContent);
    return setupContent
  }

  // console.log(code, extractedLines);

  return extractedLines.join('\n') || ''
}

const parameters = (instance: any) => {
  return {
    docs: {
      source: {
        code: `
<template>${instance().template}</template>

<script lang="ts" setup>
${instance().setup ? `${setupMatch(String(instance().setup))}` : ''}
</script>
`
      }
    }
  }
}

// ------------------------------------------------------------------------------------------------------------------------

export const Default = () => {
  return {
    components: { ConfigProvider, TableSelect },
    setup() {
      const selectedItems = ref([
        { label: 'POC演示投组3(zlt985)', value: 67602 },
        { label: 'POC演示投组1(zlt985)', value: 67595 }
      ])
      const portfolioList = [
        {
          label: 'POC演示投组2(zlt985)',
          portfolioSource: 'NORMAL',
          portfolioType: 'AFSN',
          value: 67600,
          isCheck: true
        },
        {
          label: 'POC演示投组3(zlt985)',
          portfolioSource: 'NORMAL',
          portfolioType: 'TradingN',
          value: 67602,
          isCheck: true
        },
        {
          label: 'POC演示投组1(zlt985)',
          portfolioSource: 'NORMAL',
          portfolioType: 'HTMN',
          value: 67595,
          isCheck: true
        }
      ]
      const change = () => {
        console.log(selectedItems.value)
      }
      return {
        checked: ref(false),
        selectedItems,
        portfolioList,
        change
      }
    },
    template: `
  <TableSelect
    v-model="selectedItems"
    :tableList="portfolioList"
    labelKey="label"
    valueKey="value"
    d="product1"
    @update:modelValue="change"
  ></TableSelect>
      `
  }
}

Default.storyName = "基础用法 default";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

enum suspendedEnum {
  GROUP = '群组',
  NORMAL = '一般投组',
  NORMAL_SUSPEND = '一般投组(停用)',
  PNTT = '资产衍生',
  PNTT_SUSPEND = '衍生投组(停用)'
}
enum portfolioTypeEnum {
  HTM = 'HTM',
  FVTPL = 'FVTPL',
  Hedge = 'Hedge',
  'A/R' = 'A/R',
  TradingN = '为出售而持有/剩余',
  HTMN = '为收取而持有',
  AFS = 'AFS',
  Trading = 'Trading',
  AFSN = '为收取及出售而持有'
}

export const ChildrenComponent = () => ({
  components: { TableSelect },
  setup() {
    const selectedKeys = ref([67600, 67602])

    const filtersList = [
      {
        name: '投组类型',
        key: 'portfolioType',
        options: Object.entries(portfolioTypeEnum).map(([value, label]) => ({
          value,
          label
        }))
      },
      {
        name: '投组来源',
        key: 'portfolioSource',
        options: Object.entries(suspendedEnum).map(([value, label]) => ({
          value,
          label
        }))
      }
    ]

    const portfolioList = [
      {
        label: '本币投组',
        value: 'local_currency',
        children2: [
          {
            label: 'POC演示投组2(zlt985)',
            portfolioSource: 'NORMAL',
            portfolioType: 'AFSN',
            value: 67600,
            isCheck: true
          },
          {
            label: '本币流动性投组',
            portfolioSource: 'NORMAL',
            portfolioType: 'HTM',
            value: 67604,
            isCheck: true
          },
          {
            label: '本币定期投组',
            portfolioSource: 'NORMAL',
            portfolioType: 'HTMN',
            value: 67606,
            isCheck: true
          }
        ]
      },
      {
        label: '外币投组',
        value: 'foreign_currency',
        children2: [
          {
            label: 'POC演示投组3(zlt985)',
            portfolioSource: 'NORMAL',
            portfolioType: 'TradingN',
            value: 67602,
            isCheck: true
          },
          {
            label: '外币交易投组',
            portfolioSource: 'NORMAL',
            portfolioType: 'Trading',
            value: 67605,
            isCheck: true
          },
          {
            label: '外币对冲投组',
            portfolioSource: 'NORMAL',
            portfolioType: 'Hedge',
            value: 67607,
            isCheck: true
          }
        ]
      }
    ]
    const change = (e: any) => {
      console.log(e)
    }

    const treeConfig = {
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children2'
    }

    return {
      checked: ref(false),
      selectedKeys,
      portfolioList,
      filtersList,
      change,
      treeConfig
    }
  },
  template: `
  <TableSelect
    v-model="selectedKeys"
    :tableList="portfolioList"
    :isValueKeyMode="true"
    labelKey="label"
    valueKey="value"
    :filtersList="filtersList"
    treeConfigType="children"
    id="product"
    :treeConfig="treeConfig"
    @update:modelValue="change"
  ></TableSelect>
`
})

ChildrenComponent.storyName = 'children 树自定义父子关系'
ChildrenComponent.parameters = parameters(ChildrenComponent)

// ------------------------------------------------------------------------------------------------------------------------

enum suspendedEnumIdDemo {
  GROUP = '群组',
  NORMAL = '一般投组',
  NORMAL_SUSPEND = '一般投组(停用)',
  PNTT = '资产衍生',
  PNTT_SUSPEND = '衍生投组(停用)'
}
enum portfolioTypeEnumIdDemo {
  HTM = 'HTM',
  FVTPL = 'FVTPL',
  Hedge = 'Hedge',
  'A/R' = 'A/R',
  TradingN = '为出售而持有/剩余',
  HTMN = '为收取而持有',
  AFS = 'AFS',
  Trading = 'Trading',
  AFSN = '为收取及出售而持有',
  AFSN1 = '为收取及出售而持有1',
  AFSN2 = '为收取及出售而持有2',
  AFSN3 = '为收取及出售而持有3',
  AFSN5 = '为收取及出售而持有5'
}

export const PCIdComponent = () => ({
  components: { TableSelect },
  setup() {
    const selectedKeys = ref([67600111])

    const filtersList = [
      {
        name: '投组类型',
        key: 'portfolioType',
        allowNull: true,
        options: Object.entries(portfolioTypeEnumIdDemo).map(([value, label]) => ({
          value,
          label
        }))
      },
      {
        name: '投组来源',
        key: 'portfolioSource',
        options: Object.entries(suspendedEnumIdDemo).map(([value, label]) => ({
          value,
          label
        }))
      }
    ]
    const portfolioList = [
      { id: 'local_currency', parentId: null, label: '本币投组' },
      {
        id: 67600111,
        parentId: 'local_currency',
        label: 'POC演示投组2(zlt985)',
        value: 67600111,
        portfolioSource: 'NORMAL',
        portfolioType: 'AFSN',
        isCheck: true
      },
      {
        id: 676002,
        parentId: 'local_currency',
        label: 'portfolioType 为空',
        value: 676002,
        portfolioSource: 'NORMAL',
        portfolioType: '',
        isCheck: true
      },

      {
        id: 676001,
        parentId: 'local_currency',
        label: 'portfolioType 不存在',
        value: 676001,
        portfolioSource: 'NORMAL',
        isCheck: true
      },
      {
        id: 67604,
        parentId: 'local_currency',
        label: '本币流动性投组',
        value: 67604,
        portfolioSource: 'NORMAL',
        portfolioType: 'HTM',
        isCheck: true
      },
      {
        id: 67606,
        value: 67606,
        parentId: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676061,
        value: 676061,
        parentId: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676062,
        value: 676062,
        parentId: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676063,
        value: 676063,
        parentId: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676064,
        value: 676064,
        parentId: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676065,
        value: 676065,
        parentId: 'local_currency',
        label: '本币定期投组5',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676066,
        value: 676066,
        parentId: 'local_currency',
        label: '本币定期投组6',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 676067,
        value: 676067,
        parentId: 'local_currency',
        label: '本币定期投组7',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },

      {
        id: 676068,
        value: 676068,
        parentId: 'local_currency',
        label: '本币定期投组8',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },

      {
        id: 676069,
        value: 676069,
        parentId: 'local_currency',
        label: '本币定期投组9',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },

      {
        id: 6760610,
        value: 6760610,
        parentId: 'local_currency',
        label: '本币定期投组10',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      // {
      //   id: '67606_1',
      //   value: '67606_1',
      //   parentId: '67606',
      //   label: '本币定期投组_1',
      //   portfolioSource: 'NORMAL',
      //   portfolioType: 'HTMN',
      //   isCheck: true
      // },
      { id: 'foreign_currency', parentId: null, label: '外币投组' },
      {
        id: 167602,
        value: 167602,
        parentId: 'foreign_currency',
        label: 'POC演示投组3(zlt985)',
        portfolioSource: 'NORMAL',
        portfolioType: 'TradingN',
        isCheck: true
      },
      {
        id: 167605,
        value: 167605,
        parentId: 'foreign_currency',
        label: '外币交易投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'Trading',
        isCheck: true
      },
      {
        id: 167607,
        value: 167607,
        parentId: 'foreign_currency',
        label: '外币对冲投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'Hedge',
        isCheck: true
      },
      {
        id: 167600111,
        parentId: 'foreign_currency',
        label: 'POC演示投组2(zlt985)',
        value: 167600111,
        portfolioSource: 'NORMAL',
        portfolioType: 'AFSN',
        isCheck: true
      },
      {
        id: 1676002,
        parentId: 'foreign_currency',
        label: 'portfolioType 为空',
        value: 1676002,
        portfolioSource: 'NORMAL',
        portfolioType: '',
        isCheck: true
      },

      {
        id: 1676001,
        parentId: 'foreign_currency',
        label: 'portfolioType 不存在',
        value: 1676001,
        portfolioSource: 'NORMAL',
        isCheck: true
      },
      {
        id: 167604,
        parentId: 'foreign_currency',
        label: '本币流动性投组',
        value: 167604,
        portfolioSource: 'NORMAL',
        portfolioType: 'HTM',
        isCheck: true
      },
      {
        id: 167606,
        value: 167606,
        parentId: 'foreign_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676061,
        value: 1676061,
        parentId: 'foreign_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676062,
        value: 1676062,
        parentId: 'foreign_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676063,
        value: 1676063,
        parentId: 'foreign_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676064,
        value: 1676064,
        parentId: 'foreign_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676065,
        value: 1676065,
        parentId: 'foreign_currency',
        label: '本币定期投组5',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676066,
        value: 1676066,
        parentId: 'foreign_currency',
        label: '本币定期投组6',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      {
        id: 1676067,
        value: 1676067,
        parentId: 'foreign_currency',
        label: '本币定期投组7',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },

      {
        id: 1676068,
        value: 1676068,
        parentId: 'foreign_currency',
        label: '本币定期投组8',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },

      {
        id: 1676069,
        value: 1676069,
        parentId: 'foreign_currency',
        label: '本币定期投组9',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },

      {
        id: 16760610,
        value: 16760610,
        parentId: 'foreign_currency',
        label: '本币定期投组10',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
    ]
    const change = (e: any) => {
      console.log(e)
    }
    const change2 = (...args: any) => {
      console.log(args)
    }

    const treeConfig = {
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children',
      indent: '10'
    }

    return {
      checked: ref(false),
      selectedKeys,
      portfolioList,
      filtersList,
      change,
      change2,
      treeConfig
    }
  },
  template: `
  <TableSelect
    v-model:modelValue="selectedKeys"
    :tableList="portfolioList"
    :isValueKeyMode="true"
    labelKey="label"
    valueKey="value"
    onlyKey="id"
    :filtersList="filtersList"
    treeConfigType="parent"
    id="product"
    :treeConfig="treeConfig"
    style="width:250px"
    @update:modelValue="change"
    @change="change2"
  ></TableSelect>

  <TableSelect
    v-model:modelValue="selectedKeys"
    :tableList="portfolioList"
    :isValueKeyMode="true"
    labelKey="label"
    valueKey="value"
    onlyKey="value"
    :filtersList="filtersList"
    treeConfigType="parent"
    id="product"
    style="width:250px"
    @update:modelValue="change"
    :disabled="true"
  ></TableSelect>
`
})

PCIdComponent.storyName = '父子id树'
PCIdComponent.parameters = parameters(PCIdComponent)

// ------------------------------------------------------------------------------------------------------------------------

enum suspendedEnumAllReturnDemo {
  GROUP = '群组',
  NORMAL = '一般投组',
  NORMAL_SUSPEND = '一般投组(停用)',
  PNTT = '资产衍生',
  PNTT_SUSPEND = '衍生投组(停用)'
}
enum portfolioTypeEnumAllReturnDemo {
  HTM = 'HTM',
  FVTPL = 'FVTPL',
  Hedge = 'Hedge',
  'A/R' = 'A/R',
  TradingN = '为出售而持有/剩余',
  HTMN = '为收取而持有',
  AFS = 'AFS',
  Trading = 'Trading',
  AFSN = '为收取及出售而持有'
}

export const AllReturnComponent = () => ({
  components: { ConfigProvider, TableSelect },
  setup() {
    const selectedKeys = ref([])
    const filtersList = [
      {
        name: '投组类型',
        key: 'portfolioType',
        options: Object.entries(portfolioTypeEnumAllReturnDemo).map(([value, label]) => ({
          value,
          label
        }))
      },
      {
        name: '投组来源',
        key: 'portfolioSource',
        options: Object.entries(suspendedEnumAllReturnDemo).map(([value, label]) => ({
          value,
          label
        }))
      }
    ]
    const portfolioList = [
      { id: 'local_currency', parentId: null, label: '本币投组' },
      {
        id: 67600,
        parentId: 'local_currency',
        label: 'POC演示投组2(zlt985)',
        value: 676071,
        portfolioSource: 'NORMAL',
        portfolioType: 'AFSN',
        isCheck: true
      },
      {
        id: 67604,
        parentId: 'local_currency',
        label: '本币流动性投组',
        value: 67604,
        portfolioSource: 'NORMAL',
        portfolioType: 'HTM',
        isCheck: true
      },
      {
        id: 67606,
        value: 67606,
        parentId: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      { id: 'foreign_currency', parentId: null, label: '外币投组' },
      {
        id: 676020,
        value: 676020,
        parentId: 'foreign_currency',
        label: 'POC演示投组3(zlt985)',
        portfolioSource: 'NORMAL',
        portfolioType: 'TradingN',
        isCheck: true
      },
      {
        id: 676050,
        value: 676050,
        parentId: 'foreign_currency',
        label: '外币交易投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'Trading',
        isCheck: true
      },
      {
        id: 676070,
        value: 676070,
        parentId: 'foreign_currency',
        label: '外币对冲投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'Hedge',
        isCheck: true
      }
    ]
    const change = () => {
      console.log(selectedKeys.value)
    }
    return {
      checked: ref(false),
      selectedKeys,
      portfolioList,
      filtersList,
      change
    }
  },
  template: `
  <TableSelect
    v-model="selectedKeys"
    :tableList="portfolioList"
    :isValueKeyMode="false"
    labelKey="label"
    valueKey="value"
    :filtersList="filtersList"
    treeConfigType="parent"
    id="product"
    @update:modelValue="change"
  ></TableSelect>
`
})

AllReturnComponent.storyName = '父子id树 all_return'
AllReturnComponent.parameters = parameters(AllReturnComponent)

// ------------------------------------------------------------------------------------------------------------------------

enum suspendedEnumCPCDemo {
  GROUP = '群组',
  NORMAL = '一般投组',
  NORMAL_SUSPEND = '一般投组(停用)',
  PNTT = '资产衍生',
  PNTT_SUSPEND = '衍生投组(停用)'
}
enum portfolioTypeEnumCPCDemo {
  HTM = 'HTM',
  FVTPL = 'FVTPL',
  Hedge = 'Hedge',
  'A/R' = 'A/R',
  TradingN = '为出售而持有/剩余',
  HTMN = '为收取而持有',
  AFS = 'AFS',
  Trading = 'Trading',
  AFSN = '为收取及出售而持有'
}

export const CustomPCComponent = () => ({
  components: { ConfigProvider, TableSelect },
  setup() {
    const selectedKeys = ref([67600, 67607])

    const filtersList = [
      {
        name: '投组类型',
        key: 'portfolioType',
        options: Object.entries(portfolioTypeEnumCPCDemo).map(([value, label]) => ({
          value,
          label
        }))
      },
      {
        name: '投组来源',
        key: 'portfolioSource',
        options: Object.entries(suspendedEnumCPCDemo).map(([value, label]) => ({
          value,
          label
        }))
      }
    ]
    const portfolioList = [
      { id1: 'local_currency', parentId1: null, label: '本币投组' },
      {
        id1: 67600,
        parentId1: 'local_currency',
        label: 'POC演示投组2(zlt985)',
        value: 67600,
        portfolioSource: 'NORMAL',
        portfolioType: 'AFSN',
        isCheck: true
      },
      {
        id1: 67604,
        parentId1: 'local_currency',
        label: '本币流动性投组',
        value: 67604,
        portfolioSource: 'NORMAL',
        portfolioType: 'HTM',
        isCheck: true
      },
      {
        id1: 67606,
        value: 67606,
        parentId1: 'local_currency',
        label: '本币定期投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'HTMN',
        isCheck: true
      },
      { id1: 'foreign_currency', parentId1: null, label: '外币投组' },
      {
        id1: 67602,
        value: 67602,
        parentId1: 'foreign_currency',
        label: 'POC演示投组3(zlt985)',
        portfolioSource: 'NORMAL',
        portfolioType: 'TradingN',
        isCheck: true
      },
      {
        id1: 67605,
        value: 67605,
        parentId1: 'foreign_currency',
        label: '外币交易投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'Trading',
        isCheck: true
      },
      {
        id1: 67607,
        value: 67607,
        parentId1: 'foreign_currency',
        label: '外币对冲投组',
        portfolioSource: 'NORMAL',
        portfolioType: 'Hedge',
        isCheck: true
      }
    ]
    const treeConfig = {
      rowField: 'id1',
      parentField: 'parentId1',
    }
    const change = (e: any) => {
      console.log(e)
    }
    return {
      checked: ref(false),
      selectedKeys,
      portfolioList,
      filtersList,
      treeConfig,
      change
    }
  },
  template: `
  <TableSelect
    v-model="selectedKeys"
    :tableList="portfolioList"
    :isValueKeyMode="true"
    labelKey="label"
    valueKey="value"
    :filtersList="filtersList"
    treeConfigType="parent"
    id="product"
    :treeConfig="treeConfig"
    @update:modelValue="change"
  ></TableSelect>
`
})

CustomPCComponent.storyName = '父子id树自定义父子关系';
CustomPCComponent.parameters = parameters(CustomPCComponent)

// ------------------------------------------------------------------------------------------------------------------------

enum suspendedEnumBigDataDemo {
  GROUP = '群组',
  NORMAL = '一般投组',
  NORMAL_SUSPEND = '一般投组(停用)',
  PNTT = '资产衍生',
  PNTT_SUSPEND = '衍生投组(停用)'
}

enum portfolioTypeEnumBigDataDemo {
  HTM = 'HTM',
  FVTPL = 'FVTPL',
  Hedge = 'Hedge',
  'A/R' = 'A/R',
  TradingN = '为出售而持有/剩余',
  HTMN = '为收取而持有',
  AFS = 'AFS',
  Trading = 'Trading',
  AFSN = '为收取及出售而持有'
}

export const BigDataComponent = () => ({
  components: { ConfigProvider, TableSelect },
  setup() {
    const selectedKeys = ref([100000, 100001])
    // 生成10000条不重复测试数据

    enum suspendedEnum {
      GROUP = '群组',
      NORMAL = '一般投组',
      NORMAL_SUSPEND = '一般投组(停用)',
      PNTT = '资产衍生',
      PNTT_SUSPEND = '衍生投组(停用)'
    }

    const filtersList = [
      {
        name: '投组类型',
        key: 'portfolioType',
        options: Object.entries(portfolioTypeEnumBigDataDemo).map(([value, label]) => ({
    value,
    label
        }))
      },
      {
        name: '投组来源',
        key: 'portfolioSource',
        options: Object.entries(suspendedEnumBigDataDemo).map(([value, label]) => ({
    value,
    label
        }))
      }
    ]

    const generateTestData = (count: number) => {
      const types = Object.keys(portfolioTypeEnum)
      const types2 = Object.keys(suspendedEnum)
      return Array.from({ length: count }, (_, i) => ({
        label1: `投组名称-${i + 1}`,
        value1: 100000 + i,
        portfolioType: types[i % types.length],
        portfolioSource: types2[i % types2.length],
        isFavorite: false
      }))
    }
    const portfolioList = generateTestData(20000)
    const change = (e: any) => {
      console.log(e)
    }
    return {
      checked: ref(false),
      selectedKeys,
      portfolioList,
      filtersList,
      change
    }
  },
  template: `
  <TableSelect
    v-model="selectedKeys"
    :tableList="portfolioList"
    :isValueKeyMode="true"
    labelKey="label1"
    valueKey="value1"
    onlyKey="value1"
    :filtersList="filtersList"
    id="product"
    @update:modelValue="change"
  ></TableSelect>
    `
})

BigDataComponent.storyName = '大量数据示例'
BigDataComponent.parameters = parameters(BigDataComponent)