import { useState, useEffect } from 'react';
import AuthButton from '@components/authButton';
const Index = () => {
  useEffect(() => {}, []);
  const [first, setfirst] = useState(0);
  return (
    <div>
      <div style={{ height: '200vh' }}>
        <AuthButton
          authKey="test-a"
          type="primary"
          onClick={() => {
            setfirst(first + 1);
          }}
        >
          有按钮权限
        </AuthButton>
        <AuthButton
          authKey="test-d"
          type="primary"
          onClick={() => {
            setfirst(first + 1);
          }}
        >
          没有按钮权限
        </AuthButton>
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
