export const prerender = true;

const modelFiles = import.meta.glob("/static/content/*.md", {
  query: "?url",
  import: "default",
});

export function entries() {
  const slugs = Object.keys(modelFiles).map((path) => {
    const pathParts = path.split("/");
    return pathParts[pathParts.length - 1].replace('.md', '');
  });

  return slugs.map((slug) => ({ slug }));
}
