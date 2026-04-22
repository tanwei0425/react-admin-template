import { useState, useCallback, useMemo } from 'react';
import { Button, Space, Divider, Upload, Dropdown, Modal, Input, InputNumber, Popover } from 'antd';
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
import { HEADINGS, FONT_COLORS, BG_COLORS, FONTS } from '../constants';
import useFormatPainter from '../hooks/useFormatPainter';
import MenuButton from './MenuButton';
import ColorPickerContent from './ColorPickerContent';
import styles from '../index.module.scss';

const Toolbar = ({ editor, onUpload, isUploading, isFullscreen, onToggleFullscreen }) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontColorOpen, setFontColorOpen] = useState(false);
  const [bgColorOpen, setBgColorOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { formatPainterActive, toggleFormatPainter } = useFormatPainter(editor);

  const currentFontColor = editor.getAttributes('textStyle').color || null;
  const currentBgColor = editor.getAttributes('highlight').color || null;

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

  const fontItems = useMemo(
    () =>
      FONTS.map((item) => ({
        key: item.value,
        label: <span style={{ fontFamily: item.value || 'inherit' }}>{item.label}</span>,
        onClick: () => {
          if (item.value) {
            editor.chain().focus().setMark('textStyle', { fontFamily: item.value }).run();
          } else {
            editor.chain().focus().unsetMark('textStyle').removeEmptyTextStyle().run();
          }
        },
      })),
    [editor]
  );

  const currentFont = useMemo(() => {
    const attrs = editor.getAttributes('textStyle');
    const found = FONTS.find((f) => attrs.fontFamily === f.value);
    return found?.label || '字体';
  }, [editor]);

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

  const setFontColor = useCallback(
    (color) => {
      editor.chain().focus().setColor(color).run();
      setFontColorOpen(false);
    },
    [editor]
  );

  const setHighlight = useCallback(
    (color) => {
      const chain = editor.chain().focus();
      color === 'transparent' ? chain.unsetHighlight() : chain.toggleHighlight({ color });
      chain.run();
      setBgColorOpen(false);
    },
    [editor]
  );

  const confirmInsertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run();
    setTableModalOpen(false);
    setTableRows(3);
    setTableCols(3);
  }, [editor, tableRows, tableCols]);

  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(editor.getHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [editor]);

  const clearFormat = useCallback(() => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={`${styles.toolbar} ${isFullscreen ? styles.fullscreenToolbar : ''}`}>
      <Space wrap size={2}>
        <Dropdown menu={{ items: headingItems }} trigger={['click']}>
          <Button size="small" style={{ minWidth: 70 }}>{currentHeading}</Button>
        </Dropdown>

        <Dropdown menu={{ items: fontItems }} trigger={['click']}>
          <Button size="small" style={{ minWidth: 80 }}>{currentFont}</Button>
        </Dropdown>

        <Divider vertical />

        <MenuButton icon={<BoldOutlined />} title="粗体 (Ctrl+B)" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <MenuButton icon={<ItalicOutlined />} title="斜体 (Ctrl+I)" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <MenuButton icon={<UnderlineOutlined />} title="下划线 (Ctrl+U)" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <MenuButton icon={<StrikethroughOutlined />} title="删除线" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />

        <Divider vertical />

        <Popover open={fontColorOpen} onOpenChange={setFontColorOpen} content={<ColorPickerContent colors={FONT_COLORS} onSelect={setFontColor} value={currentFontColor} />} trigger="click" placement="bottom" styles={{ root: { zIndex: 1050 } }}>
          <span><MenuButton icon={<FontColorsOutlined />} title="字体颜色" active={!!currentFontColor} /></span>
        </Popover>

        <Popover open={bgColorOpen} onOpenChange={setBgColorOpen} content={<ColorPickerContent colors={BG_COLORS} onSelect={setHighlight} value={currentBgColor} />} trigger="click" placement="bottom" styles={{ root: { zIndex: 1050 } }}>
          <span><MenuButton icon={<BgColorsOutlined />} title="背景色" active={!!currentBgColor} /></span>
        </Popover>

        <Divider vertical />

        <MenuButton icon={<AlignLeftOutlined />} title="左对齐" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} />
        <MenuButton icon={<AlignCenterOutlined />} title="居中" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} />
        <MenuButton icon={<AlignRightOutlined />} title="右对齐" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} />

        <Divider vertical />

        <MenuButton icon={<UnorderedListOutlined />} title="无序列表" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <MenuButton icon={<OrderedListOutlined />} title="有序列表" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <MenuButton icon={<MenuOutlined />} title="引用" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <MenuButton icon={<CodeOutlined />} title="代码块" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />

        <Divider vertical />

        <MenuButton icon={<TableOutlined />} title="插入表格" onClick={() => setTableModalOpen(true)} />
        <MenuButton icon={<LineOutlined />} title="分割线" onClick={() => editor.chain().focus().setHorizontalRule().run()} />

        <Divider vertical />

        <MenuButton icon={<LinkOutlined />} title="链接" active={editor.isActive('link')} onClick={handleLink} />
        <Upload showUploadList={false} accept="image/*" customRequest={({ file }) => onUpload(file)}>
          <MenuButton icon={<PictureOutlined />} title="上传图片" loading={isUploading} />
        </Upload>

        <Divider vertical />

        <MenuButton icon={<UndoOutlined />} title="撤销 (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
        <MenuButton icon={<RedoOutlined />} title="重做 (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />

        <Divider vertical />

        <MenuButton icon={<FormatPainterOutlined />} title={formatPainterActive ? '格式刷已激活(选中文本应用格式)' : '格式刷(先选中带格式文本再点击)'} active={formatPainterActive} onClick={toggleFormatPainter} />
        <MenuButton icon={<ClearOutlined />} title="清除格式" onClick={clearFormat} />
        <MenuButton icon={copied ? <CheckOutlined /> : <CopyOutlined />} title={copied ? '已复制' : '复制 HTML'} onClick={copyHtml} />
        <MenuButton icon={<EyeOutlined />} title="预览" onClick={() => setPreviewOpen(true)} />
        <MenuButton icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} title={isFullscreen ? '退出全屏' : '全屏编辑'} onClick={onToggleFullscreen} />
      </Space>

      <Modal title="插入链接" open={linkModalOpen} onOk={confirmLink} onCancel={() => setLinkModalOpen(false)} footer={[<Button key="remove" danger onClick={removeLink}>移除链接</Button>, <Button key="cancel" onClick={() => setLinkModalOpen(false)}>取消</Button>, <Button key="submit" type="primary" onClick={confirmLink}>确定</Button>]}>
        <Input placeholder="请输入链接地址" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onPressEnter={confirmLink} />
      </Modal>

      <Modal title="插入表格" open={tableModalOpen} onOk={confirmInsertTable} onCancel={() => setTableModalOpen(false)} okText="确定" cancelText="取消">
        <Space>
          <span>行数:</span>
          <InputNumber min={1} max={20} value={tableRows} onChange={setTableRows} />
          <span>列数:</span>
          <InputNumber min={1} max={20} value={tableCols} onChange={setTableCols} />
        </Space>
      </Modal>

      <Modal title="内容预览" open={previewOpen} onCancel={() => setPreviewOpen(false)} footer={null} width={800}>
        <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
      </Modal>
    </div>
  );
};

export default Toolbar;
