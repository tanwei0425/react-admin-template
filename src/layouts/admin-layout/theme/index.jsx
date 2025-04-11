import { useStyle } from './useStyle';
import { ThemeSvg } from '@assets/icons';
const Setting = () => {
  const { styles } = useStyle();
  return <ThemeSvg className={styles.themeSvg} />;
};
export default Setting;
