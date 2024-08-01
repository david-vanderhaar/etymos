<script>
  import { getToolIcon } from "../lib/tools";
  import { GlobalEventBus } from "../lib/events";
  import { onMount } from 'svelte';

  export let tools = []

  async function handleClickTool(tool) {
    console.log('handle tool: ', tool);
    tool.loading = true
    tools = [...tools]
    await tool.action()
    tool.loading = false
    tools = [...tools]
  }

  // only want this to happen once so we don't fire multiple global events
  onMount(async () => {
    Array(9).fill('').forEach(
      (_, index) => {
        GlobalEventBus.on(
          `activate_tool_${index}`,
          () => {
            handleClickTool(tools.at(index))
          }
        )
      }
    )
  })
</script>

<div id="noun-toolbar">
  {#each tools as tool, index}
    <sup>{index + 1}</sup>
    <button 
      title="{tool.text}"
      on:click={() => handleClickTool(tool)}
      disabled={tool.loading}
      class:icon__loading={tool.loading}
    >
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

  #noun-toolbar sup {
    position: relative;
    top: 10px;
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

  #noun-toolbar button:disabled {
    background-color: var(--highlight-color);
    color: var(--background-color);
    cursor: wait;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .icon__loading {
    animation: slow-shake 0.4s linear infinite;
  }

  @keyframes slow-shake {
    0% {
      transform: translateX(0px);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(0px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>