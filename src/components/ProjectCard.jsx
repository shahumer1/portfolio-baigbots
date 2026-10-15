import React from 'react';
import { industries } from '../data/projects.js';
import { ArrowIcon } from './Icons.jsx';

export default function ProjectCard({ project, featured = false }) {
  const industry = industries.find(item => item.id === project.industry);
  return <a className={`project-card ${featured?'project-card-featured':''}`} href={`/projects/${project.id}/`} aria-label={`View ${project.title} case study`}>
    <div className="project-image"><img src={project.image} alt={`${project.title} project screenshot`} loading="lazy"/><span className="project-image-arrow"><ArrowIcon diagonal/></span></div>
    <div className="project-copy"><div className="project-meta"><span>{industry.short}</span><span>{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-footer"><span>{project.stack.slice(0,3).join('  /  ')}</span><span className="text-link">View case <ArrowIcon size={16}/></span></div></div>
  </a>;
}
