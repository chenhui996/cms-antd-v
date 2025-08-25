# 中文字符计数功能

## 概述

Input 组件现在支持中文字符计数功能，可以将中文字符按 2 个字符计算，英文字符按 1 个字符计算。

## 使用方法

### 基本用法

```vue
<template>
  <!-- 标准字符计数 -->
  <Input v-model:value="value1" show-count :maxlength="20" />
  
  <!-- 中文字符计数 -->
  <Input 
    v-model:value="value2" 
    show-count 
    :maxlength="10" 
    :chinese-count="true"
    placeholder="最多输入10个中文字符或20个英文字符" 
  />
</template>
```

### 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `chineseCount` | `boolean` | `false` | 是否启用中文字符计数 |
| `maxlength` | `number` | - | 最大长度限制 |
| `showCount` | `boolean` | `false` | 是否显示字数统计 |

### 字符计数规则

- **标准模式** (`chineseCount: false`)：每个字符按 1 个字符计算
- **中文模式** (`chineseCount: true`)：
  - 中文字符（包括基本汉字、扩展汉字、CJK统一汉字等）按 2 个字符计算
  - 英文字符、数字、符号等按 1 个字符计算

### 显示格式

启用中文字符计数时，字数显示格式为：
```
当前字符数/最大长度 (剩余: 剩余可输入字符数)
```

例如：`8/10 (剩余: 2)`

## 技术实现

### 核心函数

所有相关逻辑都封装在 `src/components/Input/lib/chineseCount.ts` 文件中，采用函数式编程风格：

- `isChineseChar(char: string)`: 检测单个字符是否为中文字符
- `getChineseCharLength(str: string)`: 计算字符串的中文字符长度
- `isExceeded(str, maxLength, chineseCount)`: 检查是否超出长度限制
- `formatCountDisplay(str, maxLength, chineseCount)`: 格式化字符计数显示
- `truncateToMaxLength(str, maxLength, chineseCount)`: 截断字符串到指定长度

### 中文字符检测

使用正则表达式检测中文字符，包括：
- 基本汉字：`\u4e00-\u9fa5`
- 扩展汉字：`\u3400-\u4dbf`
- CJK统一汉字：`\u20000-\u2a6df`
- 其他汉字相关字符

### 实时输入限制

当启用中文字符计数时，组件会：
1. 实时监听输入事件
2. 计算当前字符长度
3. 超出限制时自动截断输入
4. 更新显示的字数统计

## 示例

### 场景1：用户名输入
```vue
<Input 
  v-model:value="username" 
  :maxlength="20" 
  :chinese-count="true"
  placeholder="用户名最多20个中文字符" 
/>
```

### 场景2：标题输入
```vue
<Input 
  v-model:value="title" 
  :maxlength="50" 
  :chinese-count="true"
  placeholder="标题最多50个中文字符" 
/>
```

### 场景3：描述输入
```vue
<Input 
  v-model:value="description" 
  :maxlength="100" 
  :chinese-count="true"
  placeholder="描述最多100个中文字符" 
/>
```

## 注意事项

1. **优先级**：当同时设置 `maxlength` 和 `chineseCount: true` 时，`maxlength` 表示中文字符限制
2. **性能**：每次输入都会计算字符长度，但现代浏览器性能足够
3. **兼容性**：完全向后兼容，现有代码无需修改
4. **国际化**：目前主要支持中文字符，可根据需要扩展其他语言

## 更新日志

- **v1.0.0**: 新增中文字符计数功能
  - 支持中文字符按 2 个字符计算
  - 实时输入限制和字数统计
  - 函数式编程风格的代码结构
  - 完整的类型定义和文档
