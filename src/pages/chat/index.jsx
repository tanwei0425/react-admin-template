import { useEffect, useState } from 'react';
import { useXAgent, useXChat } from '@ant-design/x';
import { Button, App } from 'antd';
import useApiRequest from '@hooks/useApiRequest';
import { useStyle } from './useStyle';
import Menu from './components/menu';
import Chat from './components/chat';

const Independent = () => {
  const { styles } = useStyle();
  const { notification } = App.useApp();
  const [headerOpen, setHeaderOpen] = useState(false);
  const [content, setContent] = useState('');
  const [conversationsItems, setConversationsItems] = useState([
    {
      key: '0',
      label: '测试对话栏目 1',
    },
  ]);
  const [activeKey, setActiveKey] = useState(conversationsItems[0].key);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const { run } = useApiRequest(
    {
      url: '/captchaImage', // 请求地址
      method: 'GET', // 请求方法
      // 如果需要传参，可添加 params: {}
    },
    {
      manual: true, // 手动触发请求，点击按钮时调用 run
    }
  );
  const demo = () => {
    run();
    notification.info({
      message: 'Notification topLeft',
      description: 'Hello, Ant Design!!',
    });
  };
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess }) => {
      onSuccess(`模拟成功返回，你输入的是: ${message}`);
    },
  });
  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });
  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey, setMessages]);

  const onSubmit = (nextContent) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent('');
  };
  const onPromptsItemClick = (info) => {
    onRequest(info.data.description);
  };
  const onAddConversation = () => {
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `测试对话栏目 ${conversationsItems.length + 1}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };
  const onConversationClick = (key) => setActiveKey(key);
  const handleFileChange = (info) => setAttachedFiles(info.fileList);
  return (
    <div className={styles.layout}>
      <Button onClick={() => demo()}>测试请求库</Button>
      <Menu
        activeKey={activeKey}
        conversationsItems={conversationsItems}
        onAddConversation={onAddConversation}
        onConversationClick={onConversationClick}
      />
      <Chat
        agent={agent}
        content={content}
        messages={messages}
        headerOpen={headerOpen}
        attachedFiles={attachedFiles}
        setHeaderOpen={setHeaderOpen}
        setContent={setContent}
        onSubmit={onSubmit}
        handleFileChange={handleFileChange}
        onPromptsItemClick={onPromptsItemClick}
      />
    </div>
  );
};
export default Independent;
