<script>
  import { getToolIcon } from "$lib/tools";

  export let tools = []
</script>

<div id="noun-toolbar">
  {#each tools as tool}
    <button title="{tool.text}" on:click={tool.action}>
      <div class="icon">
        <svelte:component this={getToolIcon(tool.type)} />
      </div>
    </button>
  {/each}
</div>

<style>
  #noun-toolbar {
    display: flex;
    flex-direction: column;
    padding: 12px 15px;
    border: 2px solid var(--highlight-color);
    border-radius: 10px;
  }

  #noun-toolbar button {
    /* background-color: var(--highlight-color); */
    background-color: var(--background-color);
    color: var(--text-color);
    /* border: 2px solid var(--highlight-color); */
    border: none;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    margin: 6px 0;
    transition: background-color 0.2s ease-in-out;
  }

  #noun-toolbar button:hover {
    /* background-color: var(--background-color); */
    background-color: var(--highlight-color);
  }

  .icon {
    width: 24px;
    height: 24px;
  }
</style>