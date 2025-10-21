import { writable } from "svelte/store";
import type { Model } from "$lib/types/model";
import { parseMarkdown } from "$lib/utils/parseMarkdown";

const modelFiles = import.meta.glob("/static/content/*.md", {
  query: "?raw",
  import: "default",
});

function createModelsStore() {
  const { subscribe, set } = writable<Model[]>([]);

  async function loadModels() {
    const modelEntries = Object.entries(modelFiles);

    const models = await Promise.all(
      modelEntries.map(async ([path, loader]) => {
        try {
          // Example: Extract slug from path: '/static/content/codellama.md' -> 'codellama'
          const pathParts = path.split("/");
          const slug = pathParts[pathParts.length - 1].replace('.md', '');

          const content = (await loader()) as string;
          const parsed = parseMarkdown(content);

          if (!parsed) return null;

          return {
            ...parsed,
            slug,
          };
        } catch (error) {
          console.warn(`Error loading ${path}:`, error);
          return null;
        }
      }),
    );

    set(models.filter((model): model is Model => model !== null));
  }

  return {
    subscribe,
    load: loadModels,
  };
}

export const modelsStore = createModelsStore();
