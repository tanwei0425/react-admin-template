import { Watermark } from 'antd';
import { useSelector } from 'react-redux';
import { globalConfig } from '@config';
const CustomWatermark = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  const { watermark } = useSelector((state) => state.theme);
  const config = {
    content: watermark ? [globalConfig.watermarkText, user?.username] : '',
    gap: [88, 88],
  };
  return <Watermark {...config}>{children}</Watermark>;
};
export default CustomWatermark;
