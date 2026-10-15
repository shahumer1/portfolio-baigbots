import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import './BaigBotsLogo.css';

export function BaigBotsLogoMark({ className = '' }) {
  return <span className={`bb-logo-mark ${className}`} aria-hidden="true">
    <i className="bb-logo-silver" />
    <i className="bb-logo-silver-shading" />
    <i className="bb-logo-red" />
    <i className="bb-logo-red-shading" />
    <i className="bb-logo-shine" />
  </span>;
}

export default function BaigBotsLogo({ href = '/', onClick }) {
  const brandRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const brand = brandRef.current;
    const mark = brand?.querySelector('.bb-logo-mark');
    const shine = mark?.querySelector('.bb-logo-shine');
    if (!mark || !shine || reducedMotion) return;

    const entrance = gsap.from(mark, {
      scale: 0.55,
      opacity: 0,
      rotate: -8,
      duration: 1.1,
      ease: 'back.out(1.7)',
    });

    function sweep() {
      if (gsap.isTweening(shine)) return;
      gsap.fromTo(shine,
        { backgroundPosition: '120% 0%', opacity: 1 },
        { backgroundPosition: '-20% 0%', duration: 1.15, ease: 'power2.inOut', onComplete: () => gsap.set(shine, { opacity: 0 }) }
      );
    }

    const firstSweep = gsap.delayedCall(0.8, sweep);
    const interval = window.setInterval(sweep, 7000);
    brand.addEventListener('pointerenter', sweep);

    return () => {
      firstSweep.kill();
      window.clearInterval(interval);
      brand.removeEventListener('pointerenter', sweep);
      entrance.kill();
      gsap.killTweensOf([mark, shine]);
      gsap.set(mark, { clearProps: 'transform,opacity' });
      gsap.set(shine, { clearProps: 'backgroundPosition,opacity' });
    };
  }, [reducedMotion]);

  return <a className="bb-brand" href={href} ref={brandRef} onClick={onClick} aria-label="Baig Bots home">
    <BaigBotsLogoMark />
    <span className="bb-brand-text"><strong>Baig Bots</strong><small>Digital Solutions</small></span>
  </a>;
}
