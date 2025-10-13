export async function load({ params, fetch }) {
  try {
    const response = await fetch(`/content/${params.slug}.md`);

    if (!response.ok) {
      throw new Error(`Model ${params.slug} not found`);
    }

    const content = await response.text();
    const parsed = parseMarkdown(content);

    return {
      model: {
        ...parsed,
        slug: params.slug
      }
    };
  } catch (error) {
    throw new Error(`Model ${params.slug} not found`);
  }
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