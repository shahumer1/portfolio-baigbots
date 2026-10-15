import React from 'react';
import PageIntro from '../components/PageIntro.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { projects } from '../data/projects.js';

export default function IndustryPage({ industry }) {
  const industryProjects = projects.filter(project => project.industry === industry.id);

  return <main id="top">
    <PageIntro eyebrow={`Industry / ${industry.number}`} title={industry.name} description={industry.summary}>
      <div className="industry-page__tools">{industry.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
    </PageIntro>
    <section className="section industry-page__work"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">Projects in this industry</span><h2>{industryProjects.length} working builds.</h2></div><p>Open a project to see the problem, solution and platforms behind it.</p></div>
      <div className="project-grid">{industryProjects.map((project, index) => <Reveal key={project.id} delay={(index % 3) * 75}><ProjectCard project={project} /></Reveal>)}</div>
      <a className="text-link industry-page__all" href="/projects/">Browse all projects <ArrowIcon /></a>
    </div></section>
  </main>;
}
