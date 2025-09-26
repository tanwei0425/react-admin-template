import { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Button, Space } from 'antd';

/**
 * 短信验证码输入框 + 倒计时按钮
 */
const SmsCodeInput = ({
  waitTime = 60,
  onClick, // 点击获取验证码的回调：onGetCode(startCountDown, setLoading)
  ...filedProps
}) => {
  const [count, setCount] = useState(waitTime);
  const [loading, setLoading] = useState(false);
  const [cutDown, setCutDown] = useState(false);
  const timerRef = useRef(null);

  // 开始倒计时
  const startCountDown = useCallback(() => {
    setCutDown(true);
    setLoading(true);
    setCount(waitTime);

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCutDown(false);
          setLoading(false);
          return waitTime;
        }
        return prev - 1;
      });
    }, 1000);
  }, [waitTime]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleGetCode = () => {
    onClick(startCountDown, setLoading);
  };

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input {...filedProps} />
      {cutDown ? (
        <Button disabled type="default">
          ({count}s)后重新获取
        </Button>
      ) : (
        <Button loading={loading} type="primary" onClick={handleGetCode}>
          获取验证码
        </Button>
      )}
    </Space.Compact>
  );
};

export default SmsCodeInput;
