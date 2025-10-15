import { parseMarkdown } from '$lib/parseMarkdown.js';
import { base } from '$app/paths';

export async function load({ fetch }) {
  // Dynamically get list of markdown files using glob import
  const modules = import.meta.glob('/static/content/*.md', { eager: false, query: '?url' });
  const modelSlugs = Object.keys(modules).map(path =>
    path.split('/').pop().replace('.md', '')
  );

  const models = await Promise.all(
    modelSlugs.map(async (slug) => {
      try {
        const response = await fetch(`${base}/content/${slug}.md`);
        if (!response.ok) {
          console.warn(`Failed to fetch ${slug}.md`);
          return null;
        }
        const content = await response.text();
        const parsed = parseMarkdown(content);
        return {
          ...parsed,
          slug
        };
      } catch (error) {
        console.warn(`Error loading ${slug}.md:`, error);
        return null;
      }
    })
  );

  return { models: models.filter(Boolean) };
}

