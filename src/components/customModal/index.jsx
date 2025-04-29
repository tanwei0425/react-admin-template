import { useState, useRef } from 'react';
import { Modal, Spin } from 'antd';
import Draggable from 'react-draggable';
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
  confirmLoading = false,
  showContentLoading = true,
  children,
  onOk,
  onCancel,
  ...restProps
}) => {
  const { styles, cx } = useStyle();
  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

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

  const handleCancel = () => {
    onCancel?.();
  };

  const handleOnOk = () => {
    onOk?.();
  };
  return (
    <Modal
      wrapClassName={cx(styles.customModal, wrapClassName)}
      maskClosable={false}
      keyboard={false}
      centered={true}
      closable={true}
      destroyOnClose={true}
      okText={'确定并保存'}
      confirmLoading={confirmLoading}
      onOk={handleOnOk}
      onCancel={handleCancel}
      {...restProps}
    >
      <Spin spinning={confirmLoading && showContentLoading}>{children}</Spin>
    </Modal>
  );
};

export default CustomModal;
