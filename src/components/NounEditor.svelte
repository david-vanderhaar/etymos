<script>
  import datamuse from '../lib/datamuse.js';
  import MdExposurePlus1 from 'svelte-icons/md/MdExposurePlus1.svelte'
  import MdSwapCalls from 'svelte-icons/md/MdSwapCalls.svelte'
  import MdCallSplit from 'svelte-icons/md/MdCallSplit.svelte'
  import MdTonality from 'svelte-icons/md/MdTonality.svelte'
  import Box from "./Box.svelte";
  import NounToolbar from "./NounToolbar.svelte";
  import TranslationHistory from './TranslationHistory.svelte';
  import { translationStore } from '../lib/data_stores/Stores.js';

  export let words = []
  
  let activeNouns = new Set()
  let selectedNouns = new Set()

  const tools = [
    {
      icon: MdExposurePlus1,
      text: 'N + 1',
      type: 'n_plus_1',
      action: async () => {
        selectedNouns.forEach(async (noun) => {
          // look for translation in local storage first using noun and type
          // if not found, fetch from datamuse and store in local storage
          // if found, add that translation

          const translation = $translationStore.find((t) => t.noun === noun && t.type === 'n_plus_1')
          if (translation) {
            addTranslation(translation)
            return
          }

          const result = await datamuse.words({rel_syn: noun})
          if (!result.length) return console.log('No synonyms found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'n_plus_1'})
        })
      },
    },
    {
      icon: MdSwapCalls,
      text: 'Translate Traversal',
      type: 'translate_traversal',
      action: () => {
        selectedNouns.forEach((noun) => {
          const translated = noun + '-'
          addTranslation({noun, translated, type: 'translate_traversal'})
        })
      },
    },
    {
      icon: MdCallSplit,
      text: 'Etymology Traversal',
      type: 'etymology_traversal',
      action: () => {
        selectedNouns.forEach((noun) => {
          const translated = noun + '~'
          addTranslation({noun, translated, type: 'etymology_traversal'})
        })
      },
    },
    {
      icon: MdTonality,
      text: 'Definition Swap',
      type: 'definition_swap',
      action: () => {
        selectedNouns.forEach((noun) => {
          const translated = noun + '#'
          addTranslation({noun, translated, type: 'definition_swap'})
        })
      },
    },
  ]

  function addTranslation({noun, translated, type}) {
    translationStore.add({noun, translated, type})

    selectedNouns.clear()
    activeNouns.clear()

    domUpdateHack()
  }

  function translateWord(word) {
    return chainTranslateWord(word)
  }

  function chainTranslateWord(word) {
    $translationStore.forEach((translation) => {
      if (translation.noun === word) {
        word = translation.translated
      }
    })

    return word
  }

  function recursiveTranslateWord(word, limit = 10) {
    if (limit <= 0) return word;

    const translation = $translationStore.find((t) => t.noun === word)
    return translation
      ? recursiveTranslateWord(translation.translated, limit - 1)
      : word
  }

  function addActiveNoun(noun) {
    activeNouns.add(noun)
    domUpdateHack()
  }
  
  function removeActiveNoun(noun) {
    activeNouns.delete(noun)
    domUpdateHack()
  }

  function addSelectedNoun(noun) {
    selectedNouns.add(noun)
  }
  
  function removeSelectedNoun(noun) {
    selectedNouns.delete(noun)
  }

  // TODO: figure out how to
  // get Set.add/remove to update svelte DOM
  function domUpdateHack() {
    words = words;
  }

  function nounIsRelatedTo(noun) {
    return activeNouns.has(noun)
  }

  function toggleSelectNoun(noun) {
    if (nounIsSelected(noun)) {
      // remove selected noun
      removeSelectedNoun(noun)
    } else {
      // add selected noun
      addSelectedNoun(noun)
    }
    domUpdateHack()
  }

  function nounIsSelected(noun) {
    return selectedNouns.has(noun)
  }

  function transformWordsToNouns(wordItems) {
    return wordItems.map((word) => createNounObject(word))
  }

  $: translatedWords = words.map(translateWord)
  $: translatedNouns = transformWordsToNouns(translatedWords)

  function createNounObject(word) {
    return { word, related: nounIsRelatedTo(word), selected: nounIsSelected(word)}
  }

  function deleteTranslation(uuid) {
    translationStore.delete(uuid)
    domUpdateHack()
  }
</script>

<div style="display: flex; width: 692px;">
  <Box style="flex: 1; margin-right: 26px;">
    <div id="noun-editor">
      {#each translatedNouns as noun}
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
            on:pointerdown={() => toggleSelectNoun(noun.word)}
          >
            {noun.word}
          </span>
        {/if}
      {/each}
    </div>
  </Box>
  <NounToolbar {tools} />
  <TranslationHistory translations={$translationStore} deleteTranslation={deleteTranslation} />
</div>

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