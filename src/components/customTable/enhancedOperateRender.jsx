import AuthButton from '@components/AuthButton';
import { Dropdown, Space, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { checkAuth } from '@utils';

/**
 * 表格操作列组件
 */
const EnhancedOperateRender = ({
  data = [],
  visibleCount = 3,
  dropdownText = '更多',
  dropdownProps = {},
}) => {
  const { authButton } = useSelector((state) => state.userInfo);

  // ✅ 权限 + visible 统一过滤（唯一主逻辑）
  const filtered = data.filter((item) => {
    if (item.visible === false) return false;

    return checkAuth({
      dataSource: authButton,
      authKey: item.authKey,
    });
  });

  const showButtons = filtered.slice(0, visibleCount);
  const collapseButtons = filtered.slice(visibleCount);
  const getKey = (item, index, prefix = 'btn') => item.key ?? `${prefix}-${item.text ?? 'item'}-${index}`;
  /**
   * 统一按钮渲染
   */
  const renderButton = (item, index, mode = 'default') => {
    const { text, tipConfig, onClick, render, ...rest } = item;

    const finalKey = getKey(item, index, 'btn');
    const { withTooltip = true, ...tipProps } = tipConfig || {};

    // ✅ 双保险（防止未来误改）
    const safeProps = { ...rest };
    delete safeProps.authKey; // 剥离authKey，防止重复校验
    delete safeProps.key; // 剥离key，避免React警告

    // 👉 render 优先（完全自定义）
    let node = render ? (
      // 约定 render 不再写 authKey
      render({ ...item, authKey: undefined })
    ) : (
      <AuthButton size="small" onClick={mode === 'dropdown' ? undefined : onClick} {...safeProps}>
        {text}
      </AuthButton>
    );

    // 👉 dropdown 内不加 tooltip
    if (mode === 'dropdown') {
      return <span key={finalKey}>{node}</span>;
    }

    return withTooltip ? (
      <Tooltip key={finalKey} title={text} {...tipProps}>
        <span>{node}</span>
      </Tooltip>
    ) : (
      <span key={finalKey}>{node}</span>
    );
  };

  return (
    <Space>
      {/* 主按钮 */}
      {showButtons.map((item, index) => renderButton(item, index, 'default'))}

      {/* 更多 */}
      {collapseButtons.length > 0 && (
        <Dropdown
          menu={{
            items: collapseButtons.map((item, index) => {
              const itemKey = getKey(item, index, 'collapse');
              // 统计设置dropdown的type和danger属性
              delete item.type;
              delete item.danger;
              return {
                key: itemKey,
                label: renderButton(item, index, 'dropdown'),
                disabled: item.disabled,
                // danger: item.danger,
              };
            }),

            // ✅ 统一点击出口
            onClick: ({ key }) => {
              const target = collapseButtons.find((item, i) => getKey(item, i, 'collapse') === key);
              if (target?.disabled) return;
              target?.onClick?.();
            },
          }}
          {...dropdownProps}
        >
          <Tooltip title={dropdownText}>
            <span>
              <AuthButton size="small">{dropdownText}</AuthButton>
            </span>
          </Tooltip>
        </Dropdown>
      )}
    </Space>
  );
};

export default EnhancedOperateRender;
