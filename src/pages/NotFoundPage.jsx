import React from 'react';
import AnimatedHeading from '../components/AnimatedHeading.jsx';
import { ArrowIcon } from '../components/Icons.jsx';

export default function NotFoundPage() {
  return <main className="project-not-found container"><span className="eyebrow">Page not found</span><AnimatedHeading as="h1">This page has moved.</AnimatedHeading><p>Explore the work from the portfolio index.</p><a className="button" href="/projects/">All projects <ArrowIcon /></a></main>;
}
