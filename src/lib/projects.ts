import { getCollection, type CollectionEntry } from 'astro:content';
import type { ProjectCategory } from './site';

export async function getProjectsByCategory(category: ProjectCategory) {
  const all = await getCollection('projects');
  return all
    .filter((p) => p.data.category === category)
    .sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export async function getAllProjects() {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export type ProjectEntry = CollectionEntry<'projects'>;
export type BlogEntry = CollectionEntry<'blog'>;
