import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);

const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const commonProps = {
  allowClear: true,
  style: { width: '100%' },
};

// 默认快捷选项
const defaultPresets = [
  {
    label: '过去30天',
    value: [dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    label: '过去14天',
    value: [dayjs().subtract(14, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    label: '过去7天',
    value: [dayjs().subtract(7, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    label: '今天',
    value: [dayjs().startOf('day'), dayjs().endOf('day')],
  },
  {
    label: '昨天',
    value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
  },
  {
    label: '本周',
    value: [dayjs().startOf('isoWeek'), dayjs().endOf('isoWeek')],
  },
  {
    label: '本月',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: '本季度',
    value: [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
  },
  {
    label: '今年',
    value: [dayjs().startOf('year'), dayjs().endOf('year')],
  },
];

const Index = ({
  range = false,
  showTime = false,
  value,
  onChange,
  presets = defaultPresets,
  ...fieldProps
}) => {
  const format = showTime ? DATETIME_FORMAT : DATE_FORMAT;
  // 内部解析 value：支持字符串或 Dayjs 对象
  const parsedValue = Array.isArray(value)
    ? value.map((v) => (v && !dayjs.isDayjs(v) ? dayjs(v, format) : v))
    : value && !dayjs.isDayjs(value)
      ? dayjs(value, format)
      : value;

  // 内部统一处理 onChange，输出格式化字符串
  const handleChange = (dates) => {
    if (!dates) {
      //   onChange?.(range ? [] : null);
      onChange?.(null);
      return;
    }
    if (range) {
      onChange?.(dates.map((d) => d.format(format)));
    } else {
      onChange?.(dates.format(format));
    }
  };

  if (range) {
    return (
      <DatePicker.RangePicker
        value={parsedValue}
        onChange={handleChange}
        showTime={showTime}
        presets={presets}
        format={format}
        placeholder={showTime ? ['开始时间', '结束时间'] : ['开始日期', '结束日期']}
        {...commonProps}
        {...fieldProps}
      />
    );
  }
  return (
    <DatePicker
      value={parsedValue}
      onChange={handleChange}
      showTime={showTime}
      format={format}
      placeholder={showTime ? '请选择日期时间' : '请选择日期'}
      {...commonProps}
      {...fieldProps}
    />
  );
};
export default Index;
