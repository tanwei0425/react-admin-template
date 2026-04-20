import { useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { message } from 'antd';
import Toolbar from './components/toolbar';
import styles from './index.module.scss';

const RichText = ({
  value,
  onChange,
  mode = 'json', // html | json
  placeholder = '请输入内容...',
  disabled = false,
  uploadImage,
}) => {
  const extensions = useMemo(() => {
    return [StarterKit, Image, Link, Placeholder.configure({ placeholder })];
  }, [placeholder]);

  const editor = useEditor({
    editable: !disabled,
    extensions,
    content: value || '',
    onUpdate({ editor }) {
      const val = mode === 'json' ? editor.getJSON() : editor.getHTML();
      onChange?.(val);
    },
  });

  // 外部 value 同步
  useEffect(() => {
    if (!editor) return;

    const current = mode === 'json' ? editor.getJSON() : editor.getHTML();

    if (JSON.stringify(current) !== JSON.stringify(value)) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor, mode]);

  // 图片上传
  const handleUpload = async (file) => {
    try {
      let url = '';

      if (uploadImage) {
        url = await uploadImage(file);
      } else {
        url = URL.createObjectURL(file);
      }

      editor.chain().focus().setImage({ src: url }).run();
    } catch (e) {
      message.error(e, '图片上传失败');
    }
  };

  if (!editor) return null;

  return (
    <div className={styles.wrapper}>
      {!disabled && <Toolbar editor={editor} onUpload={handleUpload} />}

      <div className={`${styles.editor} ${disabled ? styles.disabled : ''}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichText;
