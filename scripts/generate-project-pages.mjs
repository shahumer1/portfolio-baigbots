import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = await readFile(resolve('src/data/projects.js'), 'utf8');
const projectBlock = source.split('export const projects = [')[1]?.split('];')[0];
if (!projectBlock) throw new Error('Could not find project data');
const ids = [...projectBlock.matchAll(/\{\s*id:'([^']+)'/g)].map(match => match[1]);
if (!ids.length) throw new Error('No project IDs found');

for (const id of ids) {
  const directory = resolve('dist', 'projects', id);
  await mkdir(directory, { recursive: true });
  await copyFile(resolve('dist/index.html'), resolve(directory, 'index.html'));
}
console.log(`Generated ${ids.length} direct project routes`);
