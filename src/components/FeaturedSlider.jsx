import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowIcon } from './Icons.jsx';
import ProjectCard from './ProjectCard.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export default function FeaturedSlider({ projects }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback((next) => setIndex((next + projects.length) % projects.length), [projects.length]);
  const next = useCallback(() => setIndex((current) => (current + 1) % projects.length), [projects.length]);
  const previous = useCallback(() => setIndex((current) => (current - 1 + projects.length) % projects.length), [projects.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || reducedMotion) return;
    const timer = window.setInterval(next, 6500);
    return () => window.clearInterval(timer);
  }, [paused, inView, reducedMotion, next, index]);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };
  const handlePointerUp = (event) => {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      if (dx < 0) next(); else previous();
      window.setTimeout(() => { suppressClick.current = false; }, 100);
    }
  };

  return <div className="featured-slider" ref={sectionRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="slider-topline"><span className="mono">0{index + 1} <span>/ 0{projects.length}</span></span><div className="slider-controls"><button type="button" onClick={previous} aria-label="Previous featured project"><ArrowIcon size={19}/></button><button type="button" onClick={next} aria-label="Next featured project"><ArrowIcon size={19}/></button></div></div>
    <div className="slider-viewport" aria-label="Featured projects" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }} onClickCapture={(event) => { if (suppressClick.current) { event.stopPropagation(); event.preventDefault(); } }}>
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {projects.map((project, slideIndex) => <div className="slider-slide" key={project.id} aria-hidden={slideIndex !== index} inert={slideIndex !== index}><ProjectCard project={project} featured /></div>)}
      </div>
    </div>
    <div className="slider-bottom"><div className="slider-dots" role="group" aria-label="Choose featured project">{projects.map((project, dotIndex) => <button key={project.id} type="button" className={dotIndex === index ? 'active' : ''} onClick={() => goTo(dotIndex)} aria-label={`Show ${project.title}`} aria-pressed={dotIndex === index}><span /></button>)}</div><span className="slider-hint">DRAG OR USE THE ARROWS</span></div>
  </div>;
}
