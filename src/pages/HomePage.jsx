import React from 'react';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import { ArrowIcon } from '../components/Icons.jsx';

const destinations = [
  { number: '01', title: 'Explore industries', description: 'See solutions organized around the teams and workflows they serve.', href: '/industries/' },
  { number: '02', title: 'All projects', description: 'Browse every build, technology stack and case study in the portfolio.', href: '/projects/' },
  { number: '03', title: 'Start a project', description: 'Tell us where your team gets stuck and what you want to improve.', href: '/contact/' },
];

export default function HomePage() {
  return <main><Hero /><Marquee />
    <section className="home-destinations section"><div className="container">
      <span className="eyebrow">Explore BaigBots</span>
      <div className="home-destinations__grid">{destinations.map(item => <a key={item.href} href={item.href} className="home-destination">
        <span className="mono">{item.number} / 03</span><h2>{item.title}</h2><p>{item.description}</p><span className="home-destination__action">Open page <ArrowIcon diagonal size={18} /></span>
      </a>)}</div>
    </div></section>
  </main>;
}
