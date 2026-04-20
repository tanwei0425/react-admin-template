import { Button, Space, Divider, Upload } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import styles from '../index.module.scss';

const Toolbar = ({ editor, onUpload }) => {
  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      <Space wrap>
        <Button
          type={editor.isActive('bold') ? 'primary' : 'default'}
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <Button
          type={editor.isActive('italic') ? 'primary' : 'default'}
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <Button
          type={editor.isActive('strike') ? 'primary' : 'default'}
          icon={<StrikethroughOutlined />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <Divider type="vertical" />

        <Button
          type={editor.isActive('bulletList') ? 'primary' : 'default'}
          icon={<UnorderedListOutlined />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />

        <Button
          type={editor.isActive('orderedList') ? 'primary' : 'default'}
          icon={<OrderedListOutlined />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <Divider type="vertical" />

        <Button
          icon={<LinkOutlined />}
          onClick={() => {
            const url = prompt('请输入链接');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        />

        <Upload showUploadList={false} customRequest={({ file }) => onUpload(file)}>
          <Button icon={<PictureOutlined />} />
        </Upload>
      </Space>
    </div>
  );
};

export default Toolbar;
