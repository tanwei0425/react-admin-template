import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { '1': 'green', '0': 'red' };

const MenuDetail = ({ record, flatList }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const parentName = (() => {
    if (String(record.pid) === '0') return '顶级菜单';
    const parent = (flatList || []).find((item) => String(item.id) === String(record.pid));
    return parent?.name || '-';
  })();

  const isDir = record.menuType === '1';
  const isMenu = record.menuType === '2';
  const isBtn = record.menuType === '3';

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="上级菜单">{parentName}</Descriptions.Item>
      <Descriptions.Item label="菜单类型">{dictLabel('menu_type', record.menuType)}</Descriptions.Item>
      <Descriptions.Item label="菜单名称">{record.name}</Descriptions.Item>
      <Descriptions.Item label="菜单状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('menu_status', record.status)}</Tag>
      </Descriptions.Item>
      {(isDir || isMenu) && (
        <Descriptions.Item label="显示状态">
          <Tag color={record.isShow === '1' ? 'green' : 'red'}>{record.isShow === '1' ? '显示' : '隐藏'}</Tag>
        </Descriptions.Item>
      )}
      {(isDir || isMenu) && <Descriptions.Item label="路由地址">{record.path || '-'}</Descriptions.Item>}
      {isMenu && <Descriptions.Item label="组件路径">{record.cmpPath || '-'}</Descriptions.Item>}
      {(isMenu || isBtn) && <Descriptions.Item label="权限字符">{record.permission || '-'}</Descriptions.Item>}
      <Descriptions.Item label="排序">{record.sort}</Descriptions.Item>
      {(isDir || isMenu) && <Descriptions.Item label="图标">{record.icon || '-'}</Descriptions.Item>}
      <Descriptions.Item label="创建时间" span={2}>{record.createTime}</Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>{record.remark || '-'}</Descriptions.Item>
    </Descriptions>
  );
};

export default MenuDetail;
