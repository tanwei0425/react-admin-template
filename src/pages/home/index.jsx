import { Button } from 'antd';
const Index = () => {
  return (
    <div>
      <Button type="primary">antd primary</Button>
      <span className="tw:text-red-200">tailwind primary</span>
      <span className="tw:text-primary tw:pl-[30px] tw:text-3xl">
        tailwind primary1
      </span>
      <span className="tw:pl-[30px] tw:text-2xl">tailwind primary2</span>
    </div>
  );
};

export default Index;
