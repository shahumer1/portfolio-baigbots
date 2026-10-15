import React, { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from './Icons.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { BaigBotsLogoMark } from './BaigBotsLogo.jsx';

const folderProjects = [
  { id: 'careclinic', title: 'CareClinic', category: 'Healthcare', image: '/images/careclinic.webp' },
  { id: 'estatepro', title: 'EstatePro', category: 'Real estate', image: '/images/estatepro.webp' },
  { id: 'gohighlevel', title: 'Travel agency funnel', category: 'Sales & CRM', image: '/images/gohighlevel.webp' },
];

export default function HeroFolder() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [offsets, setOffsets] = useState(() => folderProjects.map(() => ({ x: 0, y: 0 })));
  const interacted = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) { setOpen(true); return; }
    const timer = window.setTimeout(() => { if (!interacted.current) setOpen(true); }, 950);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const movePaper = (event, index) => {
    if (!open || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-12, Math.min(12, (event.clientX - rect.left - rect.width / 2) * .12));
    const y = Math.max(-12, Math.min(12, (event.clientY - rect.top - rect.height / 2) * .12));
    setOffsets(previous => previous.map((offset, position) => position === index ? { x, y } : offset));
  };

  const resetPaper = index => setOffsets(previous => previous.map((offset, position) => position === index ? { x: 0, y: 0 } : offset));
  const toggle = () => { interacted.current = true; setOpen(value => !value); };

  return <div className="hero-folder-stage" aria-label="Explore featured BaigBots projects">
    <div className="folder-stage-grid" aria-hidden="true" />
    <div className="folder-stage-label"><span>SELECTED WORK / 01—03</span><span>{open ? 'CHOOSE A CASE STUDY' : 'CLICK TO OPEN'}</span></div>
    <div className={`hero-folder${open ? ' is-open' : ''}${hovered ? ' is-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="folder-back" aria-hidden="true"><span className="folder-tab" /></div>
      {folderProjects.map((project, index) => <a key={project.id}
        className={`folder-paper folder-paper-${index + 1}`}
        href={`/projects/${project.id}/`}
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        style={{ '--magnet-x': `${offsets[index].x}px`, '--magnet-y': `${offsets[index].y}px` }}
        onPointerMove={event => movePaper(event, index)}
        onPointerLeave={() => resetPaper(index)}>
        <img src={project.image} alt="" loading="eager" />
        <span className="folder-paper-caption"><span><b>{project.title}</b><small>{project.category}</small></span><ArrowIcon diagonal size={17} /></span>
      </a>)}
      <div className="folder-front folder-front-left" aria-hidden="true" />
      <div className="folder-front folder-front-right" aria-hidden="true" />
      <button className="folder-toggle" type="button" onClick={toggle} aria-expanded={open}
        aria-label={open ? 'Close featured projects folder' : 'Open featured projects folder'}>
        <span className="folder-toggle-title"><BaigBotsLogoMark className="folder-logo-mark" /><span className="folder-logo-wordmark">BAIG<span>BOTS</span></span></span>
        <span className="folder-toggle-bottom"><span>PROJECT ARCHIVE<br />VOL. 01 — 2026</span><span>{open ? '−' : '+'}</span></span>
      </button>
    </div>
    <span className="folder-stage-footnote">SOFTWARE / AUTOMATION / AI</span>
  </div>;
}
