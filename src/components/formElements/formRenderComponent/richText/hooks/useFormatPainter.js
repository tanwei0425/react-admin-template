/**
 * 格式刷 Hook
 * 实现类似 Word 的格式刷功能：
 * 1. 选中带格式的文本
 * 2. 点击格式刷按钮激活
 * 3. 选中其他文本应用格式
 */
import { useState, useCallback, useRef, useEffect } from 'react';

// 格式类型列表
const MARK_TYPES = ['bold', 'italic', 'underline', 'strike', 'highlight'];

// 需要属性的 mark 类型
const ATTR_MARK_TYPES = ['textStyle', 'link'];

const useFormatPainter = (editor) => {
  const [formatPainterActive, setFormatPainterActive] = useState(false);
  const capturedMarks = useRef(null);
  const timerRef = useRef(null);
  const mouseupHandlerRef = useRef(null);

  // 清理格式刷状态
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (mouseupHandlerRef.current && editor?.view?.dom) {
      editor.view.dom.removeEventListener('mouseup', mouseupHandlerRef.current);
      mouseupHandlerRef.current = null;
    }
    capturedMarks.current = null;
    setFormatPainterActive(false);
  }, [editor]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // 应用捕获的格式到选中文本
  const applyFormat = useCallback(() => {
    if (!editor || !capturedMarks.current) return;

    const marks = capturedMarks.current;

    // 使用 setTimeout 确保选区已更新
    setTimeout(() => {
      const { from, to } = editor.state.selection;
      if (from === to) return;

      const chain = editor.chain().focus();

      // 先清除所有格式
      chain.unsetAllMarks();

      // 应用简单的开关类型 marks
      MARK_TYPES.forEach((markType) => {
        if (marks[markType]) {
          if (typeof marks[markType] === 'object') {
            chain.setMark(markType, marks[markType]);
          } else {
            chain.setMark(markType);
          }
        }
      });

      // 应用带属性的 marks
      ATTR_MARK_TYPES.forEach((markType) => {
        if (marks[markType] && typeof marks[markType] === 'object') {
          chain.setMark(markType, marks[markType]);
        }
      });

      // 应用标题级别
      if (marks._heading) {
        chain.toggleHeading({ level: marks._heading });
      }

      chain.run();
      cleanup();
    }, 10);
  }, [editor, cleanup]);

  // 切换格式刷状态
  const toggleFormatPainter = useCallback(() => {
    // 已激活则取消
    if (formatPainterActive) {
      cleanup();
      return;
    }

    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) return;

    // 捕获当前选中文本的格式
    const captured = {};

    // 捕获简单开关类型 marks
    MARK_TYPES.forEach((markType) => {
      if (editor.isActive(markType)) {
        const attrs = editor.getAttributes(markType);
        if (attrs && Object.keys(attrs).length > 0) {
          captured[markType] = { ...attrs };
        } else {
          captured[markType] = true;
        }
      }
    });

    // 捕获带属性的 marks
    ATTR_MARK_TYPES.forEach((markType) => {
      if (editor.isActive(markType)) {
        const attrs = editor.getAttributes(markType);
        if (attrs && Object.keys(attrs).length > 0) {
          captured[markType] = { ...attrs };
        }
      }
    });

    // 捕获标题级别
    if (editor.isActive('heading')) {
      const headingAttrs = editor.getAttributes('heading');
      if (headingAttrs?.level) {
        captured._heading = headingAttrs.level;
      }
    }

    // 如果没有捕获到任何格式，不激活
    if (Object.keys(captured).length === 0) return;

    capturedMarks.current = captured;
    setFormatPainterActive(true);

    // 监听鼠标抬起事件，应用格式
    const handleMouseUp = () => {
      applyFormat();
    };

    mouseupHandlerRef.current = handleMouseUp;
    editor.view.dom.addEventListener('mouseup', handleMouseUp);

    // 30秒后自动取消
    timerRef.current = setTimeout(() => {
      cleanup();
    }, 30000);
  }, [editor, formatPainterActive, cleanup, applyFormat]);

  return { formatPainterActive, toggleFormatPainter };
};

export default useFormatPainter;
