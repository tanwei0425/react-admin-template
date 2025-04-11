import { Conversations } from '@ant-design/x';
import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { useStyle } from '../useStyle';
const Menu = ({ activeKey, onAddConversation, onConversationClick, conversationsItems }) => {
  const { styles } = useStyle();

  return (
    <div className={styles.menu}>
      {/* 🌟 Logo */}
      <div className={styles.logo}>
        <img
          src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
          draggable={false}
          alt="logo"
        />
        <span>TanWei</span>
      </div>
      {/* 🌟 添加会话 */}
      <Button onClick={onAddConversation} type="primary" className={styles.addBtn} icon={<CommentOutlined />}>
        开启新对话
      </Button>
      {/* 🌟 会话管理 */}
      <Conversations
        className={styles.conversations}
        activeKey={activeKey}
        items={conversationsItems}
        onActiveChange={onConversationClick}
      />
    </div>
  );
};

export default Menu;
