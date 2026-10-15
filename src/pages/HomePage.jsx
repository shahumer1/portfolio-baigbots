import React from 'react';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import IndustryGrid from '../components/IndustryGrid.jsx';
import AnimatedHeading from '../components/AnimatedHeading.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { industries } from '../data/projects.js';

export default function HomePage() {
  return <main><Hero /><Marquee />
    <section className="section industries-section home-industries" id="industries"><div className="container">
      <div className="home-industries__heading">
        <div><span className="eyebrow">Where we've worked</span><AnimatedHeading>Industries we've built for.</AnimatedHeading></div>
        <p>Explore real projects for clinics, brokerages, sales teams, finance, commerce and operations. Each card opens the work for that industry.</p>
      </div>
      <IndustryGrid industries={industries} />
      <div className="home-industries__footer"><span className="mono">06 INDUSTRIES · SOFTWARE / AUTOMATION / AI</span><a className="text-link" href="/projects/">Browse all projects <ArrowIcon /></a></div>
    </div></section>
  </main>;
}
