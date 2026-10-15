import React from 'react';
import PageIntro from '../components/PageIntro.jsx';
import IndustryCard from '../components/IndustryCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { industries } from '../data/projects.js';

export default function IndustriesPage() {
  return <main id="top">
    <PageIntro eyebrow="The work, by industry" title="Purpose-built industry solutions." description="Explore how product design, automation and AI come together around each team's day-to-day challenges." />
    <section className="section industries-section"><div className="container industry-grid">
      {industries.map((industry, index) => <Reveal key={industry.id} delay={(index % 3) * 90}><IndustryCard industry={industry} /></Reveal>)}
    </div></section>
  </main>;
}
