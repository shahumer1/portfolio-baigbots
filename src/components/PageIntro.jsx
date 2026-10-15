import React from 'react';
import AnimatedHeading from './AnimatedHeading.jsx';

export default function PageIntro({ eyebrow, title, description, children }) {
  return <section className="page-intro">
    <div className="container page-intro__inner">
      <div><span className="eyebrow">{eyebrow}</span><AnimatedHeading as="h1">{title}</AnimatedHeading></div>
      <div className="page-intro__aside"><p>{description}</p>{children}</div>
    </div>
  </section>;
}
