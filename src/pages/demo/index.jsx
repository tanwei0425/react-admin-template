import styles from './index.module.scss';
import FormDemo from './formDemo';
const Index = () => {
  return <div className={styles.scssModuleDemo}>
    <div>demo</div>
    <FormDemo />
    {/* <FormDemo /> */}
  </div>;
};

export default Index;
