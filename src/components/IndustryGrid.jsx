import React from 'react';
import IndustryCard from './IndustryCard.jsx';
import Reveal from './Reveal.jsx';

export default function IndustryGrid({ industries }) {
  return <div className="industry-grid">
    {industries.map((industry, index) =>
      <Reveal key={industry.id} delay={(index % 3) * 90}>
        <IndustryCard industry={industry} />
      </Reveal>
    )}
  </div>;
}
