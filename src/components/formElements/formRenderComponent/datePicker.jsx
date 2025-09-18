import { DatePicker } from 'antd';

const defaultConfig = {
    placeholder: "请选择日期",
};
const defaultConfigRange = {
    placeholder: ['开始日期', '结束日期'],
};

const Index = ({ children, ...filedProps }) => {
    return (
        <DatePicker
            {...defaultConfig}
            {...filedProps}
        >
            {children}
        </DatePicker>
    );
};
const RangePicker = ({ children, ...filedProps }) => {
    return (
        <DatePicker.RangePicker
            {...defaultConfigRange}
            {...filedProps}
        >
            {children}
        </DatePicker.RangePicker>
    );
};
Index.RangePicker = RangePicker;
export default Index;