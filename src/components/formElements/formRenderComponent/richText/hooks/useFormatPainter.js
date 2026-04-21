import { useState, useCallback, useRef, useEffect } from 'react';
import { MARK_TYPES } from '../constants';

const useFormatPainter = (editor) => {
  const [formatPainterActive, setFormatPainterActive] = useState(false);
  const capturedMarks = useRef(null);
  const timerRef = useRef(null);
  const mouseupHandlerRef = useRef(null);

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

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

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

  const toggleFormatPainter = useCallback(() => {
    if (formatPainterActive) {
      cleanup();
      return;
    }

    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) return;

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

    if (editor.isActive('heading')) {
      captured._heading = editor.getAttributes('heading').level;
    }

    capturedMarks.current = captured;
    setFormatPainterActive(true);

    const handleMouseUp = () => {
      setTimeout(() => {
        applyFormat();
      }, 0);
    };

    mouseupHandlerRef.current = handleMouseUp;
    editor.view.dom.addEventListener('mouseup', handleMouseUp);

    timerRef.current = setTimeout(() => {
      cleanup();
    }, 30000);
  }, [editor, formatPainterActive, cleanup, applyFormat]);

  return { formatPainterActive, toggleFormatPainter };
};

export default useFormatPainter;
