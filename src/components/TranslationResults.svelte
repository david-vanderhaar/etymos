<script>
  import Box from "./Box.svelte";
  import { getToolIcon } from "../lib/tools.js"
    import { fade } from "svelte/transition";

  export let translations = [];
  export let addTranslation;
  export let removeTranslationResult;

  function handlePointerDown (translationResultId, noun, translated, type) {
    addTranslation({noun, translated, type});
    removeTranslationResult(translationResultId);
  }

</script>

<div id="noun-translation-results">
{#each translations as translation}
  <Box style="margin: 8px; background-color: var(--text-color);">
    <div class="noun_translation_results">
      {#each translation.options as option}
        <div 
          class='translation'
          on:pointerdown={() => handlePointerDown(translation.id, translation.noun, option, translation.type)}
          style="cursor: pointer;"
        >
          <span>{translation.noun}</span>
          <span> -> </span>
          <span>{option}</span>
          <br>
        </div>
      {/each}
      <div 
        class='translation--cancel'
        on:pointerdown={() => removeTranslationResult(translation.id)}
        style="cursor: pointer;"
      >
        <span>cancel</span>
      </div>
    </div>
  </Box>
{/each}
</div>

<style>
  #noun-translation-results {
    position: absolute;
    display: flex;
    width: 692px;
    flex-wrap: wrap;
  }

  .noun_translation_results .translation {
    color: var(--background-color);
    border: 2px solid var(--background-color);
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    margin: 6px 0;
    transition: background-color 0.2s ease-in-out;
  }

  .noun_translation_results .translation:hover, .translation--cancel:hover {
    background-color: var(--highlight-color);
  }

  .translation--cancel {
    color: var(--background-color);
    background-color: var(--highlight-color);
    border: 2px solid var(--background-color);
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    margin: 26px 0 6px 0;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
  }
</style>