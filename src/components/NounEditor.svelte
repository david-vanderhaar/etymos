<script>
  import Box from "./Box.svelte";

  export let words = []
  
  let activeNouns = new Set()
  let selectedNounIndexes = []

  function addActiveNoun(noun) {
    activeNouns.add(noun)
    domUpdateHack()
  }
  
  function removeActiveNoun(noun) {
    activeNouns.delete(noun)
    domUpdateHack()
  }

  // TODO: figure out how to
  // get Set.add/remove to update svelte DOM
  function domUpdateHack() {
    words = words;
  }

  function nounIsRelatedTo(noun) {
    return activeNouns.has(noun)
  }

  function toggleSelectNounIndexes(noun, index) {
    if (selectedNounIndexes.includes(index)) {
      selectedNounIndexes = selectedNounIndexes.filter((item) => item != index)
    } else {
      selectedNounIndexes = [...selectedNounIndexes, index]
    }
    domUpdateHack()
  }

  function nounIsSelected(index) {
    return selectedNounIndexes.includes(index)
  }

  $: nouns = words.map((word, index) => ({ word, related: nounIsRelatedTo(word), selected: nounIsSelected(index)}))
</script>

<Box>
  <div id="noun-editor">
    {#each nouns as noun, index}
      {#if noun.word === ' '}
        &nbsp
      {:else if noun.word === '\n' || noun.word === ' \n'}
        <br>
      {:else}
        <span 
          class="noun"
          class:noun__related={noun.related}
          class:noun__selected={noun.selected}
          on:pointerenter={() => addActiveNoun(noun.word)}
          on:pointerleave={() => removeActiveNoun(noun.word)}
          on:pointerdown={() => toggleSelectNounIndexes(noun.word, index)}
        >
          {noun.word}
        </span>
      {/if}
    {/each}
  </div>
</Box>

<style>
  #noun-editor {
    /* ensure displayed nouns are not selectable/highlightable by normal DOM interactions */
    -webkit-user-select: none; /* Chrome, Safari, Opera */
    -moz-user-select: none;    /* Firefox */
    -ms-user-select: none;     /* Internet Explorer/Edge */
    user-select: none;         /* Non-prefixed version, currently supported by most modern browsers */
  }

  .noun {
    font-size: 32px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .noun__selected {
    background-color: var(--accent-color);
    color: var(--background-color);
  }

  .noun:not(.noun__selected):hover {
    color: var(--accent-color);
  }

  .noun__related {
    border-bottom: 1px dotted var(--accent-color);
  }
</style>