/**
 * drawer
 */
import { Drawer } from 'antd';
import AuthButton from '@/components/authButton';
const CustomDrawer = ({
  children,
  loading = false, // 确定按钮是否loading
  onClose /** 取消按钮的回调 */,
  onOk /** 确认按钮点击回调 */,
  okText = '确定并保存' /** 自定义确认按钮文案 */,
  cancelText = '取消' /** 自定义取消按钮文案 */,
  okButtonProps /** 确认按钮额外属性 */,
  cancelButtonProps /** 取消按钮额外属性 */,
  showCancelButton = true /** 是否展示默认 footer 的取消按钮，传 false 可隐藏 */,
  showOkButton = true /** 是否展示默认 footer 的确定按钮，传 false 可隐藏 */,
  showFooter = true /** 是否展示默认 footer，传 false 可隐藏 */,
  extraFooter = null /** 额外的操作按钮 */,
  // 其余 Drawer 原生属性
  ...rest
}) => {
  const handleCancel = () => {
    onClose?.();
  };

  const handleOnOk = () => {
    onOk?.();
  };

  const defaultFooter = showFooter && (
    <div className={'tw:w-full tw:bg-white tw:text-right'}>
      {showCancelButton && (
        <AuthButton className="tw:mx-1.5" {...cancelButtonProps} onClick={handleCancel}>
          {cancelText}
        </AuthButton>
      )}
      {extraFooter}
      {showOkButton && (
        <AuthButton type="primary" className="tw:mx-1.5" {...okButtonProps} loading={loading} onClick={handleOnOk}>
          {okText}
        </AuthButton>
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
      onClose={handleCancel}
      loading={loading}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
