import React, { useMemo, useState } from 'react';
import PageIntro from '../components/PageIntro.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { industries, projects } from '../data/projects.js';

function initialFilter() {
  const requested = new URLSearchParams(window.location.search).get('industry');
  return industries.some(industry => industry.id === requested) ? requested : 'all';
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState(initialFilter);
  const visibleProjects = useMemo(() => filter === 'all' ? projects : projects.filter(project => project.industry === filter), [filter]);

  function selectFilter(id) {
    setFilter(id);
    const url = id === 'all' ? '/projects/' : `/projects/?industry=${encodeURIComponent(id)}`;
    window.history.replaceState(null, '', url);
  }

  return <main id="top">
    <PageIntro eyebrow="Project index" title="Explore the full portfolio." description="Filter by industry to see the projects and technologies behind each solution." />
    <section className="section work-section"><div className="container">
      <div className="filter-bar" role="group" aria-label="Filter projects by industry">
        <button type="button" className={filter === 'all' ? 'filter-active' : ''} onClick={() => selectFilter('all')} aria-pressed={filter === 'all'}>All work <sup>{projects.length}</sup></button>
        {industries.map(industry => <button type="button" key={industry.id} className={filter === industry.id ? 'filter-active' : ''} onClick={() => selectFilter(industry.id)} aria-pressed={filter === industry.id}>
          {industry.short} <sup>{projects.filter(project => project.industry === industry.id).length}</sup>
        </button>)}
      </div>
      <p className="result-count" aria-live="polite">SHOWING {visibleProjects.length} PROJECT{visibleProjects.length === 1 ? '' : 'S'}{filter !== 'all' ? ` IN ${industries.find(industry => industry.id === filter)?.name.toUpperCase()}` : ''}</p>
      <div className="project-grid">{visibleProjects.map((project, index) => <Reveal key={project.id} delay={(index % 3) * 75}><ProjectCard project={project} /></Reveal>)}</div>
    </div></section>
  </main>;
}
