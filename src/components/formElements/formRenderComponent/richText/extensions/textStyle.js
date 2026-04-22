/**
 * TextStyle 扩展
 * 扩展 Tiptap 的 TextStyle，支持 fontFamily 和 fontSize 属性
 * 用于实现字体和字号选择功能
 */
import { TextStyle as TextStyleOriginal } from '@tiptap/extension-text-style';

export const TextStyle = TextStyleOriginal.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      // 字体属性
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily?.replace(/['"]+/g, ''),
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) {
            return {};
          }
          return {
            style: `font-family: ${attributes.fontFamily}`,
          };
        },
      },
      // 字号属性
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },
});
