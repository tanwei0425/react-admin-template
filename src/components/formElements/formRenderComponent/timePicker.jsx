import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const TIME_FORMAT = 'HH:mm:ss';

const commonProps = {
  allowClear: true,
  style: { width: '100%' },
};

// 默认快捷选项（RangePicker 专用）
const defaultPresets = [
  {
    label: '最近24小时',
    value: [dayjs().subtract(24, 'hour'), dayjs()],
  },
  {
    label: '最近12小时',
    value: [dayjs().subtract(12, 'hour'), dayjs()],
  },
  {
    label: '最近6小时',
    value: [dayjs().subtract(6, 'hour'), dayjs()],
  },
  {
    label: '今天',
    value: [dayjs().startOf('day'), dayjs()],
  },
  {
    label: '昨天',
    value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
  },
];

// 🧠 智能时间选择组件
const Index = ({
  range = false,
  value,
  onChange,
  format = TIME_FORMAT,
  presets = defaultPresets,
  ...fieldProps
}) => {
  // 内部解析 value：支持字符串或 Dayjs 对象
  const parsedValue = Array.isArray(value)
    ? value.map((v) => (v && !dayjs.isDayjs(v) ? dayjs(v, format) : v))
    : value && !dayjs.isDayjs(value)
      ? dayjs(value, format)
      : value;

  // 内部统一处理 onChange，输出格式化字符串
  const handleChange = (times) => {
    if (!times) {
      //   onChange?.(range ? [] : null);
      onChange?.(null);
      return;
    }
    if (range) {
      onChange?.(times.map((t) => t.format(format)));
    } else {
      onChange?.(times.format(format));
    }
  };

  if (range) {
    return (
      <TimePicker.RangePicker
        value={parsedValue}
        onChange={handleChange}
        format={format}
        presets={presets}
        placeholder={['开始时间', '结束时间']}
        {...commonProps}
        {...fieldProps}
      />
    );
  }

  return (
    <TimePicker
      value={parsedValue}
      onChange={handleChange}
      format={format}
      placeholder="请选择时间"
      {...commonProps}
      {...fieldProps}
    />
  );
};

export default Index;
