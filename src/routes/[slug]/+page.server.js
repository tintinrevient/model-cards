export async function entries() {
  // List of available model slugs (should match the files in static/content)
  const modules = import.meta.glob('/static/content/*.md', { eager: false, query: '?url' });
  const modelSlugs = Object.keys(modules).map(path =>
    path.split('/').pop().replace('.md', '')
  );

  return modelSlugs.map(slug => ({ slug }));
}