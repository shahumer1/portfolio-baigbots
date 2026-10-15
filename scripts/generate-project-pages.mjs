import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = await readFile(resolve('src/data/projects.js'), 'utf8');
const industryBlock = source.split('export const industries = [')[1]?.split('];')[0];
const projectBlock = source.split('export const projects = [')[1]?.split('];')[0];
if (!industryBlock || !projectBlock) throw new Error('Could not find portfolio data');
const industryIds = [...industryBlock.matchAll(/\{\s*id:\s*'([^']+)'/g)].map(match => match[1]);
const projectIds = [...projectBlock.matchAll(/\{\s*id:\s*'([^']+)'/g)].map(match => match[1]);
if (!industryIds.length || !projectIds.length) throw new Error('No industry or project IDs found');

const routes = [
  'industries',
  'projects',
  'contact',
  ...industryIds.map(id => `industries/${id}`),
  ...projectIds.map(id => `projects/${id}`),
];

for (const route of routes) {
  const directory = resolve('dist', route);
  await mkdir(directory, { recursive: true });
  await copyFile(resolve('dist/index.html'), resolve(directory, 'index.html'));
}
console.log(`Generated ${routes.length} direct portfolio routes`);
