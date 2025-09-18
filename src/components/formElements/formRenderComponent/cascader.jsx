import { Cascader } from 'antd';

const defaultConfig = {
    placeholder: "请选择",
};
const Index = ({ options, onChange, ...filedProps }) => {
    return (
        <Cascader  {...defaultConfig} options={options} onChange={onChange} {...filedProps} />
    );
};


export default Index;