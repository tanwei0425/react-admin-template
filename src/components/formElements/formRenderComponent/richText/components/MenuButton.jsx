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
    />
  </Tooltip>
);

export default MenuButton;
