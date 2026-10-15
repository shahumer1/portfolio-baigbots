import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import './AnimatedHeading.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AnimatedHeading({ as: Tag = 'h2', children, className = '' }) {
  const headingRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const heading = headingRef.current;
    if (!heading) return;

    const onWordHover = event => {
      const word = event.target.closest('.animated-heading__word');
      if (!word || !heading.contains(word) || gsap.isTweening(word)) return;

      gsap.fromTo(word, { y: 0 }, {
        y: -10,
        duration: 0.22,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
    };

    heading.addEventListener('pointerover', onWordHover);
    const context = gsap.context(() => {
      SplitText.create(heading, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'animated-heading__line',
        wordsClass: 'animated-heading__word',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 115,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              heading.querySelectorAll('[class*="-mask"]').forEach(mask => {
                mask.style.overflow = 'visible';
              });
            },
          });
        },
      });
    }, heading);

    return () => {
      heading.removeEventListener('pointerover', onWordHover);
      context.revert();
    };
  }, [reducedMotion]);

  return <Tag ref={headingRef} className={`animated-heading ${className}`.trim()}>{children}</Tag>;
}
