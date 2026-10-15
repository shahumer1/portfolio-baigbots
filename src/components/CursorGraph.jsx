import React, { useEffect, useRef } from 'react';

export default function CursorGraph() {
  const graph = useRef(null);
  useEffect(() => {
    const element = graph.current;
    let frame = 0;
    let position = null;
    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      if (event.target instanceof Element && event.target.closest('.featured-slider')) {
        element.classList.remove('cursor-graph-visible');
        return;
      }
      position = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.setProperty('--cursor-x', `${position.x}px`);
        element.style.setProperty('--cursor-y', `${position.y}px`);
        element.classList.add('cursor-graph-visible');
        frame = 0;
      });
    };
    const hide = () => element.classList.remove('cursor-graph-visible');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);
  return <div className="cursor-graph" ref={graph} aria-hidden="true" />;
}
