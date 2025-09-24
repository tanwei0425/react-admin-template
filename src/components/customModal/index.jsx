/**
 * modal
 */
import { useState, useRef } from 'react';
import { Modal, Spin } from 'antd';
import Draggable from 'react-draggable';
import AuthButton from '@components/authButton';
import { useStyle } from './useStyle';
/**
 *
 * @param {*} props
 * draggable:是否支持拖动
 * modalRender:自定义渲染对话框
 * @returns
 */
const CustomModal = ({
  wrapClassName,
  draggable,
  confirmLoading = false, // 确定按钮是否loading
  showContentLoading = true, // 内容是否loading
  children,
  onOk,
  onCancel,
  okText = '确定并保存' /** 自定义确认按钮文案 */,
  cancelText = '取消' /** 自定义取消按钮文案 */,
  okButtonProps /** 确认按钮额外属性 */,
  cancelButtonProps /** 取消按钮额外属性 */,
  showOkButton = true /** 是否展示默认 footer 的确定按钮，传 false 可隐藏 */,
  showCancelButton = true /** 是否展示默认 footer 的取消按钮，传 false 可隐藏 */,
  showFooter = true /** 是否展示默认 footer，传 false 可隐藏 */,
  extraFooter = null /** 额外的操作按钮 */,
  ...restProps
}) => {
  const { styles, cx } = useStyle();
  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const handleOnOk = () => {
    onOk?.();
  };
  const handleCancel = () => {
    onCancel?.();
  };

  if (draggable) {
    restProps.title = (
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
        onMouseOver={() => {
          if (disabled) {
            setDisabled(false);
          }
        }}
        onMouseOut={() => {
          setDisabled(true);
        }}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        {restProps.title}
      </div>
    );
    const onStart = (_event, uiData) => {
      var _a;
      const { clientWidth, clientHeight } = window.document.documentElement;
      const targetRect =
        (_a = draggleRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
      if (!targetRect) {
        return;
      }
      setBounds({
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      });
    };
    // 增加拖动功能
    restProps.modalRender = (modal) => (
      <Draggable
        disabled={disabled}
        bounds={bounds}
        nodeRef={draggleRef}
        onStart={(event, uiData) => onStart(event, uiData)}
      >
        <div ref={draggleRef}>{modal}</div>
      </Draggable>
    );
  }

  const defaultFooter = showFooter && (
    <div className={'tw:w-full tw:bg-white tw:text-right'}>
      {showCancelButton && (
        <AuthButton className="tw:mx-1.5" {...cancelButtonProps} onClick={handleCancel}>
          {cancelText}
        </AuthButton>
      )}
      {extraFooter}
      {showOkButton && (
        <AuthButton type="primary" className="tw:mx-1.5" {...okButtonProps} loading={confirmLoading} onClick={handleOnOk}>
          {okText}
        </AuthButton>
      )}
    </div>
  );

  return (
    <Modal
      wrapClassName={cx(styles.customModal, wrapClassName)}
      maskClosable={false}
      keyboard={false}
      centered={true}
      closable={true}
      destroyOnClose={true}
      cancelText={'取消'}
      okText={'确定并保存'}
      confirmLoading={confirmLoading}
      onOk={handleOnOk}
      onCancel={handleCancel}
      footer={defaultFooter}
      {...restProps}
    >
      <Spin spinning={confirmLoading && showContentLoading}>{children}</Spin>
    </Modal>
  );
};

export default CustomModal;
