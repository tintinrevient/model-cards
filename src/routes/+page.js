export async function load() {
  // Import all markdown files from a directory
  const modelFiles = import.meta.glob('./content/*.md', { as: 'raw' });
  
  const models = await Promise.all(
    Object.entries(modelFiles).map(async ([path, resolver]) => {
      const content = await resolver();
      const parsed = parseMarkdown(content);
      return {
        ...parsed,
        slug: path.split('/').pop().replace('.md', '')
      };
    })
  );
  
  return { models };
}

function parseMarkdown(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatter = {};
  const yamlContent = match[1];
  const markdownContent = match[2];
  
  yamlContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim());
      }
      frontmatter[key.trim()] = value;
    }
  });
  
  return { frontmatter, content: markdownContent };
}