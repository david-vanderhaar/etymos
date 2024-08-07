<script>
  import { onMount } from "svelte";
  import Box from "./Box.svelte";

  export let translation;
  export let addTranslation;
  export let removeTranslationResult;

  // onMount(() => {
  //   focusFirstResult()
  // })

  // function focusFirstResult() {
  //   const buttons = document.querySelectorAll('.noun_translation_results > button.translation')
  //   buttons[0].focus()
  // }

  function focusFirstResult(node) {
    const buttons = node.querySelectorAll('.noun_translation_results > button.translation')
    
    if (buttons.length) buttons[0].focus()
  }

  function handlePointerDown (translationResultId, noun, translated, type) {
    addTranslation({noun, translated, type});
    removeTranslationResult(translationResultId);
  }

  
  function focusResultIfExists(node) {
    focusFirstResult(node)
    return  {
      destroy() {
        focusFirstResult(document)
      }
    }
  }
</script>

<div use:focusResultIfExists >
<Box style="margin: 8px; background-color: var(--text-color);">
  <div 
    class='translation--cancel'
    on:pointerdown={() => removeTranslationResult(translation.id)}
    style="cursor: pointer;"
  >
    <span>Esc</span>
  </div>
  <div class="noun_translation_results">
    {#each translation.options as option}
      <button 
        class='translation'
        on:click={() => handlePointerDown(translation.id, translation.noun, option, translation.type)}
        style="cursor: pointer;"
      >
        <span>{translation.noun}</span>
        <span> -> </span>
        <span>{option}</span>
        <br>
      </button>
    {/each}
  </div>
</Box>
</div>
<style>
  .noun_translation_results .translation {
    color: var(--background-color);
    background-color: var(--text-color);
    display: block;
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
    color: var(--text-color);
    background-color: var(--background-color);
    border: 2px solid var(--background-color);
    border-radius: 5px;
    /* padding: 4px; */
    width: 44px;
    cursor: pointer;
    /* margin: 26px 0 6px 0; */
    transition: background-color 0.2s ease-in-out;
    text-align: center;
  }
</style>