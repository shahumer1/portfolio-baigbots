import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import CursorGraph from './components/CursorGraph.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import IndustriesPage from './pages/IndustriesPage.jsx';
import IndustryPage from './pages/IndustryPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { industries, projects } from './data/projects.js';
import { useTheme } from './hooks/useTheme.js';
import { useMotion } from './hooks/useMotion.js';

function routeFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { title: 'Industry Solutions & Work', page: <HomePage /> };
  if (path === '/industries') return { title: 'Industries', page: <IndustriesPage /> };
  if (path === '/projects') return { title: 'All Projects', page: <ProjectsPage /> };
  if (path === '/contact') return { title: 'Contact', page: <ContactPage /> };

  const industryId = path.match(/^\/industries\/([^/]+)$/)?.[1];
  if (industryId) {
    const industry = industries.find(item => item.id === industryId);
    return industry
      ? { title: industry.name, page: <IndustryPage industry={industry} /> }
      : { title: 'Page not found', page: <NotFoundPage /> };
  }

  const projectId = path.match(/^\/projects\/([^/]+)$/)?.[1];
  if (projectId) {
    const project = projects.find(item => item.id === projectId);
    return { title: project?.title || 'Project not found', page: <ProjectPage project={project} /> };
  }

  return { title: 'Page not found', page: <NotFoundPage /> };
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [motion, toggleMotion] = useMotion();
  const route = routeFor(window.location.pathname);

  useEffect(() => {
    document.title = `${route.title} | BaigBots`;
  }, [route.title]);

  return <>
    <CursorGraph />
    <Navbar theme={theme} motion={motion} onToggleTheme={toggleTheme} onToggleMotion={toggleMotion} />
    {route.page}
    <SiteFooter />
  </>;
}
