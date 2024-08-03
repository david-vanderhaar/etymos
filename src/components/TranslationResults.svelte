<script>
  import { GlobalEventBus } from "../lib/events";
  import TranslationResultSet from "./TranslationResultSet.svelte";


  export let translations = [];
  export let addTranslation;
  export let removeTranslationResult;

  GlobalEventBus.on('escape', () => {
    translations.forEach((translation) => {
      removeTranslationResult(translation.id)
    })
  })

</script>

<div id="noun-translation-results">
{#each translations as translation}
  <TranslationResultSet {translation} {addTranslation} {removeTranslationResult} />
{/each}
</div>

<style>
  #noun-translation-results {
    position: absolute;
    display: flex;
    width: 692px;
    flex-wrap: wrap;
  }
</style>