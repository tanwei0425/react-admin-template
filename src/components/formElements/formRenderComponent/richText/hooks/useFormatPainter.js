/**
 * 格式刷 Hook
 * 实现类似 Word 的格式刷功能：
 * 1. 选中带格式的文本
 * 2. 点击格式刷按钮激活
 * 3. 拖选目标文本，松开鼠标后自动应用格式
 * 4. 应用一次后自动退出格式刷模式
 */
import { useState, useCallback, useRef, useEffect } from 'react';

const MARK_TYPES = ['bold', 'italic', 'underline', 'strike', 'highlight'];
const ATTR_MARK_TYPES = ['textStyle', 'link'];

const useFormatPainter = (editor) => {
  const [formatPainterActive, setFormatPainterActive] = useState(false);
  const capturedMarks = useRef(null);

  const cleanup = useCallback(() => {
    capturedMarks.current = null;
    setFormatPainterActive(false);
  }, []);

  const applyCapturedFormat = useCallback(() => {
    if (!editor || !capturedMarks.current) return;

    const { from, to } = editor.state.selection;
    if (from === to) return;

    const marks = capturedMarks.current;
    const chain = editor.chain().focus();

    chain.unsetAllMarks();

    MARK_TYPES.forEach((markType) => {
      if (marks[markType]) {
        if (typeof marks[markType] === 'object') {
          chain.setMark(markType, marks[markType]);
        } else {
          chain.setMark(markType);
        }
      }
    });

    ATTR_MARK_TYPES.forEach((markType) => {
      if (marks[markType] && typeof marks[markType] === 'object') {
        chain.setMark(markType, marks[markType]);
      }
    });

    if (marks._heading) {
      chain.toggleHeading({ level: marks._heading });
    }

    chain.run();
    cleanup();
  }, [editor, cleanup]);

  useEffect(() => {
    if (!editor || !formatPainterActive) return;

    const editorDom = editor.view.dom;

    const handleMouseUp = () => {
      setTimeout(() => {
        applyCapturedFormat();
      }, 0);
    };

    editorDom.addEventListener('mouseup', handleMouseUp);
    return () => {
      editorDom.removeEventListener('mouseup', handleMouseUp);
    };
  }, [editor, formatPainterActive, applyCapturedFormat]);

  useEffect(() => {
    if (!formatPainterActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        cleanup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [formatPainterActive, cleanup]);

  const toggleFormatPainter = useCallback(() => {
    if (formatPainterActive) {
      cleanup();
      return;
    }

    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) return;

    const captured = {};

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

    ATTR_MARK_TYPES.forEach((markType) => {
      if (editor.isActive(markType)) {
        const attrs = editor.getAttributes(markType);
        if (attrs && Object.keys(attrs).length > 0) {
          captured[markType] = { ...attrs };
        }
      }
    });

    if (editor.isActive('heading')) {
      const headingAttrs = editor.getAttributes('heading');
      if (headingAttrs?.level) {
        captured._heading = headingAttrs.level;
      }
    }

    if (Object.keys(captured).length === 0) return;

    capturedMarks.current = captured;
    setFormatPainterActive(true);
  }, [editor, formatPainterActive, cleanup]);

  return { formatPainterActive, toggleFormatPainter };
};

export default useFormatPainter;
