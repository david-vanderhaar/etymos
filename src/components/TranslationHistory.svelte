<script>
  import Box from "./Box.svelte";
  import { getToolIcon } from "../lib/tools.js"
  import { GlobalEventBus } from '../lib/events';
  import MdUndo from 'svelte-icons/md/MdUndo.svelte'
  import IconButton from './IconButton.svelte';

  export let translations = [];
  export let deleteTranslation;

  function deleteLastTranslation() {
    if (!translations.length) return;

    deleteTranslation(translations.at(-1).uuid)
  }

  GlobalEventBus.on('remove_translation', deleteLastTranslation)

</script>

<Box style="flex: 1; margin-left: 26px;">
  <div id="noun-translations">
    {#if translations.length === 0}
      <p>No translations yet</p>
    {:else}
      {#each translations as translation}
        <div class='translation' on:pointerdown={() => deleteTranslation(translation.uuid)} style="cursor: pointer;">
          <div class="translation-icon">
            <svelte:component this={getToolIcon(translation.type)} />
          </div>
          <span>{translation.noun}</span>
          <span> -> </span>
          <span>{translation.translated}</span>
          <br>
        </div>
      {/each}
      <div class="actions">
        <IconButton icon={MdUndo} onClick={deleteLastTranslation} />
        <sup>alt + z</sup>
      </div>
    {/if}
  </div>
</Box>

<style>
  #noun-translations .translation {
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

  #noun-translations .translation:hover {
    /* background-color: var(--background-color); */
    background-color: var(--highlight-color);
  }

  .translation-icon {
    width: 12px;
    height: 12px;
    display: inline-block;
  }

  #noun-translations .actions {
    float: right;
  }
</style>