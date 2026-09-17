import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh', 'bilingual']).default('en'),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['apps', 'games', 'web', 'labs']),
    status: z.enum(['shipping', 'experiment', 'archived', 'concept']),
    tags: z.array(z.string()).default([]),
    year: z.number(),
    featured: z.boolean().default(false),
    url: z.string().url().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { blog, projects };
