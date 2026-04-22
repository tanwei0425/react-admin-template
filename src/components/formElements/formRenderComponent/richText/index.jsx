/**
 * 富文本编辑器主组件
 * 基于 Tiptap 实现的企业级富文本编辑器
 * 
 * @param {string} value - 编辑器内容（HTML或JSON格式）
 * @param {function} onChange - 内容变化回调
 * @param {string} mode - 输出模式 'html' | 'json'
 * @param {string} placeholder - 占位文本
 * @param {boolean} disabled - 是否禁用
 * @param {number} maxLength - 最大字符数
 * @param {function} uploadImage - 图片上传函数
 * @param {boolean} showWordCount - 是否显示字数统计
 * @param {number} minHeight - 编辑器最小高度
 */
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import CodeBlock from '@tiptap/extension-code-block';
import { TextStyle } from './extensions/textStyle';
import { ListItem } from './extensions/listItem';
import Toolbar from './components/toolbar';
import styles from './index.module.scss';

/**
 * 计算HTML内容的纯文本字符数
 * 去除HTML标签，转换HTML实体
 */
const getCharacterCount = (html) => {
  if (!html) return 0;
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  return text.length;
};

const RichText = ({
  value,
  onChange,
  mode = 'html',
  placeholder = '请输入内容...',
  disabled = false,
  maxLength,
  uploadImage,
  showWordCount = true,
  minHeight = 200,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorStateKey, setEditorStateKey] = useState(0);
  const editorRef = useRef(null);

  // 编辑器扩展配置
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        codeBlock: false,
        link: false,
        underline: false,
        listItem: false,
      }),
      ListItem,
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
    ],
    [placeholder]
  );

  // 创建编辑器实例
  const editor = useEditor({
    editable: !disabled,
    extensions,
    content: value || '',
    onUpdate({ editor }) {
      const val = mode === 'json' ? editor.getJSON() : editor.getHTML();
      onChange?.(val);
    },
  });

  // 监听选区变化，更新工具栏状态
  useEffect(() => {
    if (!editor) return;
    editorRef.current = editor;
    const handleSelectionUpdate = () => {
      setEditorStateKey((k) => k + 1);
    };
    editor.on('selectionUpdate', handleSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor]);

  // 同步外部value变化
  useEffect(() => {
    if (!editor) return;
    const current = mode === 'json' ? editor.getJSON() : editor.getHTML();
    if (JSON.stringify(current) !== JSON.stringify(value)) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor, mode]);

  // 同步disabled状态
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  // 图片上传处理
  const handleUpload = useCallback(
    async (file) => {
      setIsUploading(true);
      try {
        let url = '';
        if (uploadImage) {
          url = await uploadImage(file);
        } else {
          url = URL.createObjectURL(file);
        }
        editor?.chain().focus().setImage({ src: url }).run();
      } catch (e) {
        console.error('图片上传失败:', e);
      } finally {
        setIsUploading(false);
      }
    },
    [editor, uploadImage]
  );

  const htmlContent = editor?.getHTML() || '';
  const characterCount = getCharacterCount(htmlContent);

  if (!editor) return null;

  const isOverLimit = maxLength && characterCount > maxLength;

  // 全屏模式渲染
  if (isFullscreen) {
    return createPortal(
      <div className={styles.fullscreenWrapper}>
        <Toolbar
          key={editorStateKey}
          editor={editor}
          onUpload={handleUpload}
          isUploading={isUploading}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(false)}
        />
        <div className={styles.fullscreenEditor}>
          <div className={styles.editorContent}>
            <EditorContent editor={editor} />
          </div>
        </div>
        {showWordCount && (
          <div className={styles.fullscreenFooter}>
            <span className={isOverLimit ? styles.overLimit : ''}>
              字数: {characterCount}{maxLength && ` / ${maxLength}`}
            </span>
          </div>
        )}
      </div>,
      document.body
    );
  }

  // 普通模式渲染
  return (
    <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      {!disabled && (
        <Toolbar
          key={editorStateKey}
          editor={editor}
          onUpload={handleUpload}
          isUploading={isUploading}
          isFullscreen={false}
          onToggleFullscreen={() => setIsFullscreen(true)}
        />
      )}

      <div
        className={styles.editor}
        style={{ minHeight }}
      >
        <EditorContent editor={editor} />
      </div>

      {showWordCount && (
        <div className={styles.footer}>
          <span className={isOverLimit ? styles.overLimit : ''}>
            字数: {characterCount}
            {maxLength && ` / ${maxLength}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default RichText;
