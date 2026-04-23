/**
 * 富文本编辑器工具栏组件
 * 提供完整的富文本编辑功能：
 * - 标题、字体、字号选择
 * - 粗体、斜体、下划线、删除线
 * - 字体颜色、背景色
 * - 对齐方式
 * - 有序/无序列表、引用、代码块
 * - 表格、分割线、链接、图片
 * - 撤销/重做、格式刷、清除格式
 * - 复制HTML、预览、全屏
 */
import { useState, useCallback, useMemo } from 'react';
import { Button, Space, Divider, Upload, Dropdown, Modal, Input, InputNumber } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  UndoOutlined,
  RedoOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  TableOutlined,
  LineOutlined,
  CodeOutlined,
  MenuOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  ClearOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CopyOutlined,
  CheckOutlined,
  FormatPainterOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { HEADINGS, FONT_COLORS, BG_COLORS, FONTS, FONT_SIZES } from '../constants';
import useFormatPainter from '../hooks/useFormatPainter';
import MenuButton from './MenuButton';
import ColorPickerContent from './ColorPickerContent';
import styles from '../index.module.scss';

const Toolbar = ({ editor, onUpload, isUploading, isFullscreen, onToggleFullscreen }) => {
  // 弹窗状态
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [previewOpen, setPreviewOpen] = useState(false);

  // 格式刷
  const { formatPainterActive, toggleFormatPainter } = useFormatPainter(editor);

  // 当前颜色状态 - 从 editor 获取
  const currentFontColor = editor.getAttributes('textStyle').color || null;
  const currentBgColor = editor.getAttributes('highlight').color || null;

  // 标题下拉菜单
  const headingItems = useMemo(
    () =>
      HEADINGS.map((item) => ({
        key: item.value,
        label: item.label,
        onClick: () => {
          if (item.value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: item.value }).run();
          }
        },
      })),
    [editor]
  );

  const currentHeading = useMemo(() => {
    const found = HEADINGS.find((h) => {
      if (h.value === 'paragraph') return editor.isActive('paragraph');
      return editor.isActive('heading', { level: h.value });
    });
    return found?.label || '正文';
  }, [editor]);

  // 字体下拉菜单
  const fontItems = useMemo(
    () =>
      FONTS.map((item) => ({
        key: item.value,
        label: <span style={{ fontFamily: item.value || 'inherit' }}>{item.label}</span>,
        onClick: () => {
          const chain = editor.chain().focus();
          if (item.value) {
            chain.setMark('textStyle', { fontFamily: item.value });
          } else {
            chain.unsetMark('textStyle').removeEmptyTextStyle();
          }
          const { from, to } = editor.state.selection;
          if (from !== to) {
            editor.state.doc.nodesBetween(from, to, (node) => {
              if (node.type.name === 'listItem') {
                if (item.value) {
                  chain.updateAttributes('listItem', { fontFamily: item.value });
                } else {
                  chain.resetAttributes('listItem', 'fontFamily');
                }
              }
            });
          }
          chain.run();
        },
      })),
    [editor]
  );

  const currentFont = useMemo(() => {
    const textStyleAttrs = editor.getAttributes('textStyle');
    const listItemAttrs = editor.getAttributes('listItem');
    const fontFamily = textStyleAttrs.fontFamily || listItemAttrs.fontFamily;
    const found = FONTS.find((f) => fontFamily === f.value);
    return found?.label || '字体';
  }, [editor]);

  // 字号下拉菜单
  const fontSizeItems = useMemo(
    () =>
      FONT_SIZES.map((item) => ({
        key: item.value,
        label: <span style={{ fontSize: item.value || 'inherit' }}>{item.label}</span>,
        onClick: () => {
          const chain = editor.chain().focus();
          if (item.value) {
            chain.setMark('textStyle', { fontSize: item.value });
          } else {
            chain.unsetMark('textStyle').removeEmptyTextStyle();
          }
          const { from, to } = editor.state.selection;
          if (from !== to) {
            editor.state.doc.nodesBetween(from, to, (node) => {
              if (node.type.name === 'listItem') {
                if (item.value) {
                  chain.updateAttributes('listItem', { fontSize: item.value });
                } else {
                  chain.resetAttributes('listItem', 'fontSize');
                }
              }
            });
          }
          chain.run();
        },
      })),
    [editor]
  );

  const currentFontSize = useMemo(() => {
    const textStyleAttrs = editor.getAttributes('textStyle');
    const listItemAttrs = editor.getAttributes('listItem');
    const fontSize = textStyleAttrs.fontSize || listItemAttrs.fontSize;
    const found = FONT_SIZES.find((f) => fontSize === f.value);
    return found?.label || '字号';
  }, [editor]);

  // 链接处理
  const handleLink = useCallback(() => {
    setLinkUrl(editor.getAttributes('link').href || '');
    setLinkModalOpen(true);
  }, [editor]);

  const confirmLink = useCallback(() => {
    const chain = editor.chain().focus();
    linkUrl ? chain.setLink({ href: linkUrl }) : chain.unsetLink();
    chain.run();
    setLinkModalOpen(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setLinkModalOpen(false);
    setLinkUrl('');
  }, [editor]);

  // 字体颜色处理
  const handleFontColorChange = useCallback(
    (color) => {
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );

  const clearFontColor = useCallback(() => {
    editor.chain().focus().unsetColor().run();
  }, [editor]);

  // 背景色处理
  const handleBgColorChange = useCallback(
    (color) => {
      if (color === 'transparent') {
        editor.chain().focus().unsetHighlight().run();
      } else {
        editor.chain().focus().toggleHighlight({ color }).run();
      }
    },
    [editor]
  );

  const clearBgColor = useCallback(() => {
    editor.chain().focus().unsetHighlight().run();
  }, [editor]);

  // 表格插入
  const confirmInsertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run();
    setTableModalOpen(false);
    setTableRows(3);
    setTableCols(3);
  }, [editor, tableRows, tableCols]);

  // 复制HTML
  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(editor.getHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [editor]);

  // 清除格式
  const clearFormat = useCallback(() => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={`${styles.toolbar} ${isFullscreen ? styles.fullscreenToolbar : ''}`}>
      <Space wrap size={2}>
        {/* 标题选择 */}
        <Dropdown menu={{ items: headingItems }} trigger={['click']}>
          <Button size="small" style={{ minWidth: 70 }}>{currentHeading}</Button>
        </Dropdown>

        {/* 字体选择 */}
        <Dropdown menu={{ items: fontItems }} trigger={['click']}>
          <Button size="small" style={{ minWidth: 80 }}>{currentFont}</Button>
        </Dropdown>

        {/* 字号选择 */}
        <Dropdown menu={{ items: fontSizeItems }} trigger={['click']}>
          <Button size="small" style={{ minWidth: 60 }}>{currentFontSize}</Button>
        </Dropdown>

        <Divider vertical />

        {/* 文本格式 */}
        <MenuButton icon={<BoldOutlined />} title="粗体 (Ctrl+B)" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <MenuButton icon={<ItalicOutlined />} title="斜体 (Ctrl+I)" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <MenuButton icon={<UnderlineOutlined />} title="下划线 (Ctrl+U)" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <MenuButton icon={<StrikethroughOutlined />} title="删除线" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />

        <Divider vertical />

        {/* 字体颜色 */}
        <ColorPickerContent
          colors={FONT_COLORS}
          value={currentFontColor}
          onSelect={handleFontColorChange}
          onClear={clearFontColor}
        >
          <MenuButton icon={<FontColorsOutlined />} title="字体颜色" active={!!currentFontColor} />
        </ColorPickerContent>

        {/* 背景色 */}
        <ColorPickerContent
          colors={BG_COLORS}
          value={currentBgColor}
          onSelect={handleBgColorChange}
          onClear={clearBgColor}
        >
          <MenuButton icon={<BgColorsOutlined />} title="背景色" active={!!currentBgColor} />
        </ColorPickerContent>

        <Divider vertical />

        {/* 对齐方式 */}
        <MenuButton icon={<AlignLeftOutlined />} title="左对齐" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} />
        <MenuButton icon={<AlignCenterOutlined />} title="居中" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} />
        <MenuButton icon={<AlignRightOutlined />} title="右对齐" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} />

        <Divider vertical />

        {/* 列表和引用 */}
        <MenuButton icon={<UnorderedListOutlined />} title="无序列表" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <MenuButton icon={<OrderedListOutlined />} title="有序列表" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <MenuButton icon={<MenuOutlined />} title="引用" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <MenuButton icon={<CodeOutlined />} title="代码块" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />

        <Divider vertical />

        {/* 表格和分割线 */}
        <MenuButton icon={<TableOutlined />} title="插入表格" onClick={() => setTableModalOpen(true)} />
        <MenuButton icon={<LineOutlined />} title="分割线" onClick={() => editor.chain().focus().setHorizontalRule().run()} />

        <Divider vertical />

        {/* 链接和图片 */}
        <MenuButton icon={<LinkOutlined />} title="链接" active={editor.isActive('link')} onClick={handleLink} />
        <Upload showUploadList={false} accept="image/*" customRequest={({ file }) => onUpload(file)}>
          <MenuButton icon={<PictureOutlined />} title="上传图片" loading={isUploading} />
        </Upload>

        <Divider vertical />

        {/* 撤销重做 */}
        <MenuButton icon={<UndoOutlined />} title="撤销 (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
        <MenuButton icon={<RedoOutlined />} title="重做 (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />

        <Divider vertical />

        {/* 工具按钮 */}
        <MenuButton icon={<FormatPainterOutlined />} title={formatPainterActive ? '格式刷已激活(选中文本应用格式)' : '格式刷(先选中带格式文本再点击)'} active={formatPainterActive} onClick={toggleFormatPainter} />
        <MenuButton icon={<ClearOutlined />} title="清除格式" onClick={clearFormat} />
        <MenuButton icon={copied ? <CheckOutlined /> : <CopyOutlined />} title={copied ? '已复制' : '复制 HTML'} onClick={copyHtml} />
        <MenuButton icon={<EyeOutlined />} title="预览" onClick={() => setPreviewOpen(true)} />
        <MenuButton icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} title={isFullscreen ? '退出全屏' : '全屏编辑'} onClick={onToggleFullscreen} />
      </Space>

      {/* 链接弹窗 */}
      <Modal title="插入链接" open={linkModalOpen} onOk={confirmLink} onCancel={() => setLinkModalOpen(false)} footer={[<Button key="remove" danger onClick={removeLink}>移除链接</Button>, <Button key="cancel" onClick={() => setLinkModalOpen(false)}>取消</Button>, <Button key="submit" type="primary" onClick={confirmLink}>确定</Button>]}>
        <Input placeholder="请输入链接地址" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onPressEnter={confirmLink} />
      </Modal>

      {/* 表格弹窗 */}
      <Modal title="插入表格" open={tableModalOpen} onOk={confirmInsertTable} onCancel={() => setTableModalOpen(false)} okText="确定" cancelText="取消">
        <Space>
          <span>行数:</span>
          <InputNumber min={1} max={20} value={tableRows} onChange={setTableRows} />
          <span>列数:</span>
          <InputNumber min={1} max={20} value={tableCols} onChange={setTableCols} />
        </Space>
      </Modal>

      {/* 预览弹窗 */}
      <Modal title="内容预览" open={previewOpen} onCancel={() => setPreviewOpen(false)} footer={null} width={800}>
        <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
      </Modal>
    </div>
  );
};

export default Toolbar;
