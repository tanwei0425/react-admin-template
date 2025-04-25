import { Drawer, Button } from 'antd';

const CustomDrawer = ({
  children,
  onClose /** 取消按钮的回调 */,
  onConfirm /** 确认按钮点击回调 */,
  confirmText = '确定' /** 自定义确认按钮文案 */,
  cancelText = '取消' /** 自定义取消按钮文案 */,
  confirmButtonProps /** 确认按钮额外属性 */,
  cancelButtonProps /** 取消按钮额外属性 */,
  showConfirmButton = true /** 是否展示默认 footer 的确定按钮，传 false 可隐藏 */,
  showFooter = true /** 是否展示默认 footer，传 false 可隐藏 */,
  // 其余 Drawer 原生属性
  ...rest
}) => {
  const handleCancel = () => {
    onClose?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  const defaultFooter = showFooter && (
    <div className={'tw:w-full tw:bg-white tw:text-right'}>
      <Button {...cancelButtonProps} onClick={handleCancel}>
        {cancelText}
      </Button>
      {showConfirmButton && (
        <Button type="primary" {...confirmButtonProps} className="tw:ml-3" onClick={handleConfirm}>
          {confirmText}
        </Button>
      )}
    </div>
  );

  return (
    <Drawer
      className="customDrawer"
      keyboard={false}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      footer={defaultFooter}
      onClose={onClose}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
