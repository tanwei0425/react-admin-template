import { useState, useEffect } from 'react';
import { Button } from 'antd';
const Index = () => {
  useEffect(() => {}, []);

  const [first, setfirst] = useState(0);
  return (
    <div>
      <div style={{ height: '200vh' }}>
        <Button
          type="primary"
          onClick={() => {
            setfirst(first + 1);
          }}
        >
          antd primary
        </Button>
        {first}
        <span className="tw:text-red-200">tailwind primary</span>
        <span className="tw:text-primary tw:pl-[30px] tw:text-3xl">tailwind primary1</span>
        <span className="tw:pl-[30px] tw:text-2xl">tailwind primary2</span>
      </div>
      123
    </div>
  );
};

export default Index;
