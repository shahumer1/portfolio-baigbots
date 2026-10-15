import React from 'react';
import { ArrowIcon } from './Icons.jsx';

export default function IndustryCard({ industry }) {
  return <a className="industry-card" href={`/industries/${industry.id}/`} aria-label={`Explore ${industry.name} projects`}>
    <div className="industry-image"><img src={industry.image} alt="" loading="lazy"/><span className="industry-count">{industry.number} / 06</span></div>
    <div className="industry-body"><div className="industry-topline"><span className="eyebrow">Industry solution</span><ArrowIcon diagonal size={21}/></div><h3>{industry.name}</h3><p>{industry.summary}</p><div className="industry-stack">{industry.tools.map(tool=><span key={tool}>{tool}</span>)}</div><span className="industry-explore">Explore work <ArrowIcon size={16}/></span></div>
  </a>;
}
