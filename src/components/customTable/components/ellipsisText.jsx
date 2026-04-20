import { useRef, useState, useEffect } from 'react';
import { Tooltip, Typography } from 'antd';

const tooltipStyles = {
  root: { maxWidth: '30vw' },
};

const tooltipContentStyle = {
  maxHeight: '45vh',
  overflowY: 'auto',
  padding: '4px 8px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
};

const EllipsisText = ({ content, copyable, copyableConfig }) => {
  const [open, setOpen] = useState(false);
  const [isEllipsis, setIsEllipsis] = useState(false);
  const textRef = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      setIsEllipsis(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [content]);

  const onEnter = () => {
    clearTimeout(leaveTimer.current);
    if (isEllipsis) setOpen(true);
  };

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 100);
  };

  const strContent = String(content ?? '');

  const tooltipNode = (
    <div
      className="scrollbar-dark-theme"
      style={tooltipContentStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {strContent}
    </div>
  );

  if (copyable) {
    return (
      <Tooltip open={open} title={tooltipNode} styles={tooltipStyles}>
        <Typography.Text
          copyable={{ text: strContent, tooltips: false, ...copyableConfig }}
          style={{ display: 'inline-flex', maxWidth: '100%' }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <span
            ref={textRef}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 'auto',
              minWidth: 0,
            }}
          >
            {strContent}
          </span>
        </Typography.Text>
      </Tooltip>
    );
  }

  return (
    <Tooltip open={open} title={tooltipNode} styles={tooltipStyles}>
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {strContent}
      </span>
    </Tooltip>
  );
};

export default EllipsisText;
