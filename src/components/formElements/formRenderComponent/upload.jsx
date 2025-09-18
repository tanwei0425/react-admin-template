import { Upload } from 'antd';


const Index = ({ children, ...filedProps }) => {
    return (
        <Upload
            {...filedProps}
        >
            {children}
        </Upload>
    );
};

export default Index;
