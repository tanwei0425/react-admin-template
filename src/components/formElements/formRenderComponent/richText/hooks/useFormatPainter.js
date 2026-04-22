/**
 * 格式刷 Hook
 * 实现类似 Word 的格式刷功能：
 * 1. 选中带格式的文本
 * 2. 点击格式刷按钮激活
 * 3. 选中其他文本应用格式
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { MARK_TYPES } from '../constants';

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

    const { from, to } = editor.state.selection;
    if (from === to) return;

    const marks = capturedMarks.current;
    const chain = editor.chain().focus();

    chain.unsetAllMarks();

    MARK_TYPES.forEach((markType) => {
      if (marks[markType] !== undefined) {
        chain.setMark(markType, marks[markType]);
      }
    });

    if (marks._heading) {
      chain.toggleHeading({ level: marks._heading });
    }

    chain.run();
    cleanup();
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
    const $from = editor.state.doc.resolve(from);
    const $to = editor.state.doc.resolve(to);
    const marksInSelection = $from.marksAcross($to) || $from.marks() || [];
    const captured = {};

    MARK_TYPES.forEach((markType) => {
      if (editor.isActive(markType)) {
        const mark = marksInSelection.find((m) => m.type.name === markType);
        if (mark) {
          captured[markType] = { ...mark.attrs };
        }
      }
    });

    // 捕获标题级别
    if (editor.isActive('heading')) {
      captured._heading = editor.getAttributes('heading').level;
    }

    capturedMarks.current = captured;
    setFormatPainterActive(true);

    // 监听鼠标抬起事件，应用格式
    const handleMouseUp = () => {
      setTimeout(() => {
        applyFormat();
      }, 0);
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
