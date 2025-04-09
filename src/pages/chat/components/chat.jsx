import { Bubble, Attachments, Prompts, Sender, Welcome } from "@ant-design/x";
import { Badge, Button, Space } from "antd";
import {
  CloudUploadOutlined,
  EllipsisOutlined,
  PaperClipOutlined,
  ShareAltOutlined,
  CommentOutlined,
  FireOutlined,
  HeartOutlined,
  ReadOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useStyle } from "../useStyle";
const renderTitle = (icon, title) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);
const Chat = ({
  agent,
  content,
  messages,
  attachedFiles,
  headerOpen,
  setHeaderOpen,
  setContent,
  onSubmit,
  handleFileChange,
  onPromptsItemClick,
}) => {
  const { styles } = useStyle();
  const placeholderPromptsItems = [
    {
      key: "1",
      label: renderTitle(
        <FireOutlined
          style={{
            color: "#FF4D4F",
          }}
        />,
        "热门话题"
      ),
      description: "当下最火爆的热门话题是？",
      children: [
        {
          key: "1-1",
          description: `热门话题 1?`,
        },
        {
          key: "1-2",
          description: `热门话题 2?`,
        },
        {
          key: "1-3",
          description: `热门话题 3?`,
        },
      ],
    },
    {
      key: "2",
      label: renderTitle(
        <ReadOutlined
          style={{
            color: "#00b96b",
          }}
        />,
        "猜你喜欢"
      ),
      description: "你对什么感兴趣?",
      children: [
        {
          key: "2-1",
          icon: <HeartOutlined />,
          description: `猜你喜欢 1`,
        },
        {
          key: "2-2",
          icon: <SmileOutlined />,
          description: `猜你喜欢 2`,
        },
        {
          key: "2-3",
          icon: <CommentOutlined />,
          description: `猜你喜欢 3`,
        },
      ],
    },
  ];
  const senderPromptsItems = [
    {
      key: "1",
      description: "热门话题",
      icon: (
        <FireOutlined
          style={{
            color: "#FF4D4F",
          }}
        />
      ),
    },
    {
      key: "2",
      description: "猜你喜欢",
      icon: (
        <ReadOutlined
          style={{
            color: "#00b96b",
          }}
        />
      ),
    },
  ];
  const roles = {
    ai: {
      placement: "start",
      avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
      typing: {
        step: 5,
        interval: 20,
      },
      styles: {
        content: {
          borderRadius: 8,
          marginTop: -6,
          marginBottom: 8,
        },
      },
    },
    local: {
      placement: "end",
      avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
      styles: {
        content: {
          borderRadius: 8,
          marginTop: -6,
          marginBottom: 8,
        },
      },
    },
  };
  const placeholderNode = (
    <Prompts
      title="你想要?"
      items={placeholderPromptsItems}
      styles={{
        list: {
          width: "100%",
        },
        item: {
          flex: 1,
        },
      }}
      onItemClick={onPromptsItemClick}
    />
  );
  const items = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === "loading",
    role: status === "local" ? "local" : "ai",
    content: message,
  }));
  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button
        type="text"
        disabled
        icon={<PaperClipOutlined />}
        onClick={() => setHeaderOpen(!headerOpen)}
      />
    </Badge>
  );
  const senderHeader = (
    <Sender.Header
      title="附件"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === "drop"
            ? {
                title: "将文件拖放到此处",
              }
            : {
                icon: <CloudUploadOutlined />,
                title: "上传文件",
                description: "单击或将文件拖到此区域进行上传",
              }
        }
      />
    </Sender.Header>
  );

  return (
    <div className={styles.chat}>
      {/* 🌟 消息列表 */}
      <Space direction="vertical" size={16} className={styles.placeholder}>
        <Welcome
          variant="borderless"
          icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
          title="你好, 我是 TanWei，很高兴见到你！"
          description="我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~"
          extra={
            <Space>
              <Button disabled icon={<ShareAltOutlined />} />
              <Button disabled icon={<EllipsisOutlined />} />
            </Space>
          }
        />
        <Bubble.List
          items={
            items.length > 0
              ? items
              : [
                  {
                    content: placeholderNode,
                    variant: "borderless",
                  },
                ]
          }
          roles={roles}
          className={items.length > 0 ? styles.messages : styles.messageList}
        />
      </Space>
      {/* 🌟 提示词 */}
      <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} />
      {/* 🌟 输入框 */}
      <Sender
        value={content}
        header={senderHeader}
        onSubmit={onSubmit}
        onChange={setContent}
        prefix={attachmentsNode}
        loading={agent.isRequesting()}
        className={styles.sender}
      />
    </div>
  );
};

export default Chat;
