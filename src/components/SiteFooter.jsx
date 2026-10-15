import React from 'react';

export default function SiteFooter() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-brand">BAIG<span>BOTS</span><small>SOFTWARE · AUTOMATION · AI</small></div>
      <div><span>EXPLORE</span><a href="/">Home</a><a href="/industries/">Industry</a><a href="/projects/">All projects</a><a href="https://baigbots.com">Contact</a></div>
      <div><span>CONTACT</span><a href="mailto:info@baigbots.com">info@baigbots.com</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} BaigBots</span><a href="/">Back to home ↑</a></div>
  </footer>;
}
