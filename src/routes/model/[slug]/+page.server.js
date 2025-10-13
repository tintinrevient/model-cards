export async function entries() {
  // List of available model slugs (should match the files in static/content)
  const modelSlugs = ['gpt4-vision', 'llama2', 'stable-diffusion-xl'];

  return modelSlugs.map(slug => ({ slug }));
}