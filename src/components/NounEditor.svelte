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
      text: 'Synonym',
      type: 'synonym',
      action: async () => {
        selectedNouns.forEach(async (noun) => {
          const result = await datamuse.words({rel_syn: noun})
          if (!result.length) return console.log('No synonyms found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'synonym'})
        })
      },
    },
    {
      text: 'Antonym',
      type: 'antonym',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          const result = await datamuse.words({rel_ant: noun})
          if (!result.length) return console.log('No antonyms found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'antonym'})
        })
      },
    },
    {
      text: 'Generalization',
      type: 'generalization',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          // kind of (direct hypernyms)
          const result = await datamuse.words({rel_spc: noun})
          if (!result.length) return console.log('No generalization found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'generalization'})
        })
      },
    },
    {
      text: 'Reverse Definition',
      type: 'reverse_definition',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          // means like 
          const result = await datamuse.words({ml: noun})
          if (!result.length) return console.log('No reverse definition found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'reverse_definition'})
        })
      },
    },
    {
      text: 'More Specific',
      type: 'more_specific',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          // more specific (direct hyponyms)
          const result = await datamuse.words({gen: noun})
          if (!result.length) return console.log('No more specifics found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'more_specific'})
        })
      },
    },
    {
      text: 'Comprised Of',
      type: 'comprised_of',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          // direct holonyms
          const result = await datamuse.words({com: noun})
          if (!result.length) return console.log('No comprised ofs found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'comprised_of',})
        })
      },
    },
    {
      text: 'Part Of',
      type: 'part_of',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          // direct meronyms
          const result = await datamuse.words({par: noun})
          if (!result.length) return console.log('No parts of found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'part_of',})
        })
      },
    },
    {
      text: 'Homophone',
      type: 'homophone',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          const result = await datamuse.words({hom: noun})
          if (!result.length) return console.log('No homophones found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'homophone',})
        })
      },
    },
    {
      text: 'Consonant Match',
      type: 'consonant_match',
      action: () => {
        selectedNouns.forEach(async (noun) => {
          const result = await datamuse.words({cns: noun})
          if (!result.length) return console.log('No consonant matches found for', noun)
          const translated = result[0].word
          addTranslation({noun, translated, type: 'consonant_match',})
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