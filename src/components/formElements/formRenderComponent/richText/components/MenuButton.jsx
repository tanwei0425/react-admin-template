/**
 * 工具栏按钮组件
 * 封装带 Tooltip 的工具栏按钮
 * 当作为 ColorPicker 的 children 时，onClick 应为 undefined
 */
import { Tooltip, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const MenuButton = ({ icon, title, active, disabled, onClick, loading }) => (
  <Tooltip title={title}>
    <Button
      type={active ? 'primary' : 'text'}
      size="small"
      icon={loading ? <LoadingOutlined /> : icon}
      disabled={disabled}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    />
  </Tooltip>
);

export default MenuButton;
