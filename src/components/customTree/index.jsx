import { Tree, Spin } from 'antd';

/**
 * 通用 Tree 组件
 */
const CustomTree = ({
  treeData = [],
  loading = false,
  loadData,
  onRightClick,
  titleRender,
  ...restProps
}) => {
  return (
    <Spin spinning={loading}>
      <Tree
        showLine={true}
        showIcon={false}
        treeData={treeData}
        loadData={loadData}
        onRightClick={onRightClick}
        titleRender={titleRender}
        {...restProps}
      />
    </Spin>
  );
};

export default CustomTree;
