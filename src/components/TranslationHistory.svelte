<script>
  import Box from "./Box.svelte";

  export let translations = [];
</script>

<Box style="flex: 1; margin-left: 26px;">
  <div id="noun-translations">
    {#each translations as translation}
      <div>
        <span>{translation.noun}</span>
        <span> -> </span>
        <span>{translation.translated}</span>

        {#if translation.type === 'n_plus_1'}
          <span> (N + 1)</span>
        {/if}

        <br>
      </div>
    {/each}

    {#if translations.length === 0}
      <p>No translations yet</p>
    {/if}
  </div>
</Box>