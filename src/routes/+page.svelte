<script>
  export let data;
  $: models = data.models;
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
  <!-- Header -->
  <div class="bg-white border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <h1 class="text-4xl font-bold text-slate-900 mb-2">Models</h1>
      <p class="text-slate-600">Discover and explore machine learning models</p>
    </div>
  </div>

  <!-- Models Grid -->
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each models as model}
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-200">
          <!-- Card Header -->
          <div class="p-6 border-b border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 mb-1">
              {model.frontmatter.name}
            </h2>
            <p class="text-sm text-slate-500">
              by {model.frontmatter.author}
            </p>
          </div>

          <!-- Card Body -->
          <div class="p-6">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each model.frontmatter.tags as tag}
                <span class="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  {tag}
                </span>
              {/each}
            </div>

            <!-- Description -->
            <p class="text-slate-600 text-sm line-clamp-3 mb-4">
              {model.content.split('\n').find(line => line.trim() && !line.startsWith('#'))}
            </p>

            <!-- Stats -->
            <div class="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                {model.frontmatter.downloads}
              </div>
              <span class="px-2 py-1 bg-slate-100 rounded text-slate-600">
                {model.frontmatter.license}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>