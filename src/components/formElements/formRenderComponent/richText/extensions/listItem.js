/**
 * ListItem 扩展
 * 自定义列表项节点，支持 fontFamily 和 fontSize 属性
 * 解决有序/无序列表的数字/圆点不跟随字体和字号变化的问题
 */
import { Node, mergeAttributes } from '@tiptap/react';

export const ListItem = Node.create({
  name: 'listItem',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'paragraph+',

  parseHTML() {
    return [
      {
        tag: 'li',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['li', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addAttributes() {
    return {
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
