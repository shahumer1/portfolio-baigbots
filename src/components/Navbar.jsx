import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import BaigBotsLogo from './BaigBotsLogo.jsx';
import { ThemeIcon } from './Icons.jsx';
import './Navbar.css';

gsap.registerPlugin(ScrambleTextPlugin);

const links = [
  { label: 'Home', href: '/' },
  { label: 'Industry', href: '/industries/' },
  { label: 'All projects', href: '/projects/' },
];

export default function Navbar({ theme, motion, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = window.location.pathname;
  const isCurrent = href => href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrambleText(event, label) {
    if (motion === 'reduced') return;
    const target = event.currentTarget.querySelector('.bb-nav__animated');
    gsap.to(target, {
      duration: .55,
      scrambleText: { text: label, chars: 'upperCase', speed: .9 },
      overwrite: true,
    });
  }

  const close = () => setMenuOpen(false);

  return <header className={`bb-nav${scrolled ? ' is-scrolled' : ''}`}>
    <div className="container bb-nav__inner">
      <BaigBotsLogo onClick={close} />

      <nav className="bb-nav__links" aria-label="Primary navigation">
        {links.map(({ label, href }) => <a key={href} href={href} aria-label={label}
          aria-current={isCurrent(href) ? 'page' : undefined}
          onPointerEnter={event => scrambleText(event, label)}
          onFocus={event => scrambleText(event, label)}>
          <span className="bb-nav__label" aria-hidden="true"><span className="bb-nav__measure">{label}</span><span className="bb-nav__animated">{label}</span></span>
        </a>)}
      </nav>

      <div className="bb-nav__actions">
        <a className="bb-nav__cta" href="https://baigbots.com"><span>Start a project</span><span aria-hidden="true"></span></a>
        <button className="bb-nav__icon" type="button" onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'dark'}>
          <ThemeIcon theme={theme} />
        </button>
        <button className="bb-nav__menu-button" type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="bb-mobile-menu"
          onClick={() => setMenuOpen(open => !open)}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path
            d={menuOpen ? 'M5 5L21 21M21 5L5 21' : 'M4 9H22M4 17H22'}
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
    <nav className={`bb-nav__mobile${menuOpen ? ' is-open' : ''}`} id="bb-mobile-menu" aria-label="Mobile navigation" inert={!menuOpen}>
      {links.map(({ label, href }) => <a key={href} href={href} onClick={close} aria-current={isCurrent(href) ? 'page' : undefined}>{label}<span aria-hidden="true">↗</span></a>)}
      <a className="bb-nav__mobile-cta" href="https://baigbots.com" onClick={close}>Start a project<span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
