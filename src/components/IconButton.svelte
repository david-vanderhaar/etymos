<script>
  export let icon;
  export let onClick;
</script>

<button class="icon" on:click={onClick}>
  <svelte:component this={icon} />
</button>

<style>
  .icon {
    width: 32px;
    height: 32px;
    background-color: var(--background-color);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    margin: 6px 0;
    transition: background-color 0.2s ease-in-out;
  }

  .icon:hover {
    background-color: var(--highlight-color);
  }
</style>
