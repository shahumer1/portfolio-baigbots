import React from 'react';
import { ArrowIcon } from './Icons.jsx';
import CountUp from './CountUp.jsx';
import HeroFolder from './HeroFolder.jsx';
import AnimatedHeading from './AnimatedHeading.jsx';

function Circuit() { return <svg className="hero-circuit" viewBox="0 0 640 500" fill="none" aria-hidden="true"><path d="M640 52H513l-50 50H334l-80 80H96M640 165H555l-70 70H345l-84 84H0M640 365H514l-42-42H366l-89 89H92M590 500V430l-46-46H430" stroke="currentColor" strokeWidth="1.5"/><path className="circuit-pulse" d="M640 165H555l-70 70H345l-84 84H0" strokeWidth="2.5" strokeDasharray="18 800"/><circle cx="334" cy="102" r="4" fill="currentColor"/><circle cx="345" cy="235" r="4" fill="currentColor"/><circle cx="472" cy="323" r="4" fill="currentColor"/></svg>; }

export default function Hero() {
  return <section className="hero" id="top"><Circuit/><div className="container hero-grid">
    <div className="hero-copy"><span className="eyebrow">BaigBots / Selected work</span><AnimatedHeading as="h1">Built for the way <em>your industry</em> works.</AnimatedHeading><p>Software, AI agents and automation shaped around the real work of clinics, brokerages, sales teams and operations.</p><div className="hero-actions"><a className="button" href="#industries">Explore industries <ArrowIcon/></a><a className="text-link" href="#all-work">View all projects <ArrowIcon/></a></div><div className="hero-proof"><div><CountUp value={5}/><span>Product UIs</span></div><div><CountUp value={84}/><span>Real screens</span></div><div><CountUp value={12}/><span>Platforms</span></div></div></div>
    <HeroFolder />
  </div><div className="hero-bottom container"><span>SCROLL TO EXPLORE THE WORK</span><span>01 — 06 INDUSTRIES</span></div></section>;
}
