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
import Toolbar from './components/toolbar';
import styles from './index.module.scss';

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

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        codeBlock: false,
        link: false,
        underline: false,
      }),
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

  const editor = useEditor({
    editable: !disabled,
    extensions,
    content: value || '',
    onUpdate({ editor }) {
      const val = mode === 'json' ? editor.getJSON() : editor.getHTML();
      onChange?.(val);
    },
  });

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

  useEffect(() => {
    if (!editor) return;
    const current = mode === 'json' ? editor.getJSON() : editor.getHTML();
    if (JSON.stringify(current) !== JSON.stringify(value)) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor, mode]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

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
