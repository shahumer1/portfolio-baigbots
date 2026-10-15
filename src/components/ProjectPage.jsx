import React, { useEffect } from 'react';
import { ArrowIcon } from './Icons.jsx';
import AnimatedHeading from './AnimatedHeading.jsx';
import { industries, projects } from '../data/projects.js';

export default function ProjectPage({ project }) {
  useEffect(() => {
    document.title = project ? `${project.title} — BaigBots case study` : 'Project not found — BaigBots';
    window.scrollTo(0, 0);
    return () => { document.title = 'BaigBots — Industry Portfolio'; };
  }, [project]);

  if (!project) return <main className="project-not-found container"><span className="eyebrow">Project index</span><AnimatedHeading as="h1">Project not found.</AnimatedHeading><p>This case study may have moved.</p><a className="button" href="/projects/">Explore all projects <ArrowIcon /></a></main>;

  const industry = industries.find(item => item.id === project.industry);
  const index = projects.findIndex(item => item.id === project.id);
  const next = projects[(index + 1) % projects.length];

  return <main className="project-page" id="top">
    <section className="case-hero"><div className="container">
      <div className="case-breadcrumb"><a href="/">Home</a><span>/</span><a href="/projects/">Projects</a><span>/</span><span>{project.title}</span></div>
      <div className="case-hero-grid"><div><span className="eyebrow">{industry?.name} / {project.type}</span><AnimatedHeading as="h1">{project.title}</AnimatedHeading><p>{project.description}</p><a className="text-link" href="/projects/">← Back to all projects</a></div><div className="case-hero-image"><img src={project.image} alt={`${project.title} project screenshot`} /></div></div>
    </div></section>
    <section className="case-content section"><div className="container">
      <div className="case-intro"><span className="eyebrow">The case study</span><AnimatedHeading>The work behind the result.</AnimatedHeading></div>
      <div className="case-columns"><div className="case-block"><span className="case-number">01 / CHALLENGE</span><h3>The challenge</h3><p>{project.challenge}</p></div><div className="case-block"><span className="case-number">02 / SOLUTION</span><h3>What we built</h3><p>{project.solution}</p></div></div>
      <div className="case-details"><div className="case-block"><span className="case-number">03 / CAPABILITIES</span><h3>Inside the solution</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div><div className="case-block"><span className="case-number">04 / TECHNOLOGY</span><h3>Tools and platforms</h3><div className="case-stack">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div></div></div>
    </div></section>
    <section className="case-next"><div className="container case-next-inner"><div><span className="eyebrow">Next case study</span><AnimatedHeading>{next.title}</AnimatedHeading><span>{industries.find(item => item.id === next.industry)?.name}</span></div><a className="button" href={`/projects/${next.id}/`}>View project <ArrowIcon /></a></div></section>
    <section className="case-contact"><div className="container"><AnimatedHeading>Have a similar challenge?</AnimatedHeading><p>Tell us about the workflow you want to improve.</p><a className="button" href="https://baigbots.com">Discuss a project <ArrowIcon /></a></div></section>
  </main>;
}
