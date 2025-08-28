/**
 * 中文字符计数工具函数
 * 采用函数式编程风格，所有函数都是纯函数
 */

// 中文字符正则表达式（只包含基本汉字和扩展汉字）
const CHINESE_CHAR_REGEX = /[\u4e00-\u9fa5\u3400-\u4dbf]/;

/**
 * 检测单个字符是否为中文字符
 * @param char 单个字符
 * @returns 是否为中文字符
 */
export const isChineseChar = (char: string): boolean => {
  if (char.length !== 1) return false;
  return CHINESE_CHAR_REGEX.test(char);
};

/**
 * 计算字符串的中文字符长度（中文字符算2，其他字符算1）
 * @param str 输入字符串
 * @returns 字符长度
 */
export const getChineseCharLength = (str: string): number => {
  if (!str) return 0;

  return str.split('').reduce((length, char) => {
    return length + (isChineseChar(char) ? 2 : 1);
  }, 0);
};

/**
 * 计算字符串的标准字符长度
 * @param str 输入字符串
 * @returns 字符长度
 */
export const getStandardCharLength = (str: string): number => {
  return str ? str.length : 0;
};

/**
 * 获取有效的最大长度配置
 * @param maxlength 最大长度值
 * @param chineseCount 是否启用中文字符计数
 * @returns 长度配置对象
 */
export const getEffectiveMaxLength = (maxlength?: number, chineseCount?: boolean) => {
  if (maxlength === undefined || maxlength === null) {
    return null;
  }

  return {
    type: chineseCount ? 'chinese' : 'standard',
    value: maxlength,
    isChinese: chineseCount
  };
};

/**
 * 检查字符串是否超出长度限制
 * @param str 输入字符串
 * @param maxLength 最大长度
 * @param chineseCount 是否启用中文字符计数
 * @returns 是否超出限制
 */
export const isExceeded = (str: string, maxLength: number, chineseCount?: boolean): boolean => {
  if (chineseCount) {
    return getChineseCharLength(str) > maxLength;
  }
  return getStandardCharLength(str) > maxLength;
};

/**
 * 获取剩余可输入字符数
 * @param str 当前字符串
 * @param maxLength 最大长度
 * @param chineseCount 是否启用中文字符计数
 * @returns 剩余可输入字符数
 */
export const getRemainingChars = (str: string, maxLength: number, chineseCount?: boolean): number => {
  if (chineseCount) {
    const currentLength = getChineseCharLength(str);
    return Math.max(0, maxLength - currentLength);
  }
  const currentLength = getStandardCharLength(str);
  return Math.max(0, maxLength - currentLength);
};

/**
 * 格式化字符计数显示
 * @param str 当前字符串
 * @param maxLength 最大长度
 * @param chineseCount 是否启用中文字符计数
 * @returns 格式化的显示字符串
 */
export const formatCountDisplay = (str: string, maxLength: number, chineseCount?: boolean): string => {
  if (chineseCount) {
    const currentLength = getChineseCharLength(str);
    const remaining = getRemainingChars(str, maxLength, chineseCount);
    return `${currentLength}/${maxLength} (剩余: ${remaining})`;
  }
  
  const currentLength = getStandardCharLength(str);
  return `${currentLength}/${maxLength}`;
};

/**
 * 截断字符串到指定长度限制
 * @param str 输入字符串
 * @param maxLength 最大长度
 * @param chineseCount 是否启用中文字符计数
 * @returns 截断后的字符串
 */
export const truncateToMaxLength = (str: string, maxLength: number, chineseCount?: boolean): string => {
  if (!chineseCount) {
    return str.slice(0, maxLength);
  }

  // 中文字符计数截断逻辑
  let result = '';
  let currentLength = 0;
  
  for (const char of str) {
    const charLength = isChineseChar(char) ? 2 : 1;
    if (currentLength + charLength <= maxLength) {
      result += char;
      currentLength += charLength;
    } else {
      break;
    }
  }
  
  return result;
};
