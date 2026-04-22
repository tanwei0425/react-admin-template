/**
 * 富文本编辑器常量配置
 */

// 标题级别配置
export const HEADINGS = [
  { label: '正文', value: 'paragraph' },
  { label: '标题 1', value: 1 },
  { label: '标题 2', value: 2 },
  { label: '标题 3', value: 3 },
  { label: '标题 4', value: 4 },
  { label: '标题 5', value: 5 },
  { label: '标题 6', value: 6 },
];

// 字体配置（包含Mac和Windows常用字体及回退方案）
export const FONTS = [
  { label: '默认', value: '' },
  { label: '苹方', value: '"PingFang SC", "Microsoft YaHei", sans-serif' },
  { label: '黑体-简', value: '"Heiti SC", "SimHei", sans-serif' },
  { label: '宋体-简', value: '"Songti SC", "SimSun", serif' },
  { label: '楷体-简', value: '"Kaiti SC", "KaiTi", serif' },
  { label: '华文黑体', value: '"STHeiti", "SimHei", sans-serif' },
  { label: '微软雅黑', value: '"Microsoft YaHei", "PingFang SC", sans-serif' },
  { label: 'Helvetica Neue', value: '"Helvetica Neue", Arial, sans-serif' },
  { label: 'Arial', value: 'Arial, "Helvetica Neue", sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", "Songti SC", serif' },
  { label: 'Georgia', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Monaco', value: 'Monaco, "Courier New", monospace' },
  { label: 'Menlo', value: 'Menlo, Monaco, monospace' },
  { label: 'Courier New', value: '"Courier New", Monaco, monospace' },
];

// 字号配置
export const FONT_SIZES = [
  { label: '默认', value: '' },
  { label: '12px', value: '12px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '18px', value: '18px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '28px', value: '28px' },
  { label: '32px', value: '32px' },
  { label: '36px', value: '36px' },
  { label: '48px', value: '48px' },
  { label: '56px', value: '56px' },
];

// 字体颜色预设
export const FONT_COLORS = [
  '#000000', '#434343', '#666666', '#999999',
  '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef',
  '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00',
  '#00ff00', '#00ffff', '#4a86e8', '#0000ff',
  '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc',
  '#d9ead3', '#d0e0e3', '#c9daf8', '#d9d2e9',
];

// 背景颜色预设（包含透明色用于清除）
export const BG_COLORS = [
  'transparent', '#ffffff', '#f3f3f3', '#efefef',
  '#d9d9d9', '#cccccc', '#b7b7b7', '#999999',
  '#666666', '#434343',
  '#000000', '#980000', '#ff0000', '#ff9900',
  '#ffff00', '#00ff00', '#00ffff', '#4a86e8',
  '#0000ff', '#9900ff',
  '#ff00ff', '#e6b8af', '#f4cccc', '#fce5cd',
  '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8',
];

// 格式类型列表（用于格式刷）
export const MARK_TYPES = ['bold', 'italic', 'underline', 'strike', 'link', 'textStyle', 'highlight'];
