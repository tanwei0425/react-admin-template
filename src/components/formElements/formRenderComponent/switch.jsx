import { Switch } from 'antd';

const defaultConfig = {
    defaultChecked: true
};
const Index = (filedProps) => {
    return (
        <Switch
            {...defaultConfig}
            {...filedProps}
        />
    );
};

export default Index;
