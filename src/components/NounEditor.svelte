<script>
  import datamuse from '../lib/datamuse.js';
  import { uuid } from '../lib/helper.js';
  import Box from "./Box.svelte";
  import NounToolbar from "./NounToolbar.svelte";
  import TranslationHistory from './TranslationHistory.svelte';
  import TranslationResults from './TranslationResults.svelte';
  import { translationStore } from '../lib/data_stores/Stores.js';
  import EtyJs from '../lib/ety-js/ety-js';

  export let words = []
  
  let activeNouns = new Set()
  let selectedNouns = new Set()
  let translationResults = []

  async function datamuseToolAction (datamuseApiSubject, type) {
    const promises = Array.from(selectedNouns).map(async (noun) => {
      const result = await datamuse.words({[datamuseApiSubject]: noun});
      if (!result.length) {
        console.log(`No ${type} results found for`, noun);
        return null;
      }

      translationResults = [
        ...translationResults,
        {
          id: uuid(),
          noun,
          options: result.map((res) => res.word),
          type,
        }
      ]
    });

    await Promise.all(promises);
  }

  const tools = [
    {
      text: 'Synonym',
      type: 'synonym',
      loading: false,
      action: async () => await datamuseToolAction('rel_syn', 'synonym'),
    },
    {
      text: 'Antonym',
      type: 'antonym',
      loading: false,
      action: async () => await datamuseToolAction('rel_ant', 'antonym'),
    },
    {
      text: 'Generalization',
      type: 'generalization',
      loading: false,
      action: async () => await datamuseToolAction('rel_spc', 'generalization'),
    },
    {
      text: 'Reverse Definition',
      type: 'reverse_definition',
      loading: false,
      action: async () => await datamuseToolAction('ml', 'reverse_definition'),
    },
    {
      text: 'More Specific',
      type: 'more_specific',
      loading: false,
      action: async () => await datamuseToolAction('gen', 'more_specific'),
    },
    {
      text: 'Comprised Of',
      type: 'comprised_of',
      loading: false,
      action: async () => await datamuseToolAction('com', 'comprised_of'),
    },
    {
      text: 'Part Of',
      type: 'part_of',
      loading: false,
      action: async () => await datamuseToolAction('par', 'part_of'),
    },
    {
      text: 'Homophone',
      type: 'homophone',
      loading: false,
      action: async () => await datamuseToolAction('hom', 'homophone'),
    },
    // {
    //   text: 'Consonant Match',
    //   type: 'consonant_match',
    //   loading: false,
    //   action: async () => await datamuseToolAction('cns', 'consonant_match'),
    // },
    {
      text: 'Etymology',
      type: 'etymology',
      loading: false,
      action: () => {
        Array.from(selectedNouns).map((noun) => {
          const result = EtyJs.origins(noun, 'eng', true);

          if (!result.length) {
            console.log('No etymology results found for', noun);
            return null;
          }

          translationResults = [
            ...translationResults,
            {
              id: uuid(),
              noun,
              options: result.map((res) => res._word),
              type: 'etymology',
            }
          ]
        })
      }
    },
  ]

  function removeTranslationResult(id) {
    translationResults = translationResults.filter((result) => result.id !== id)
  }

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

<div style="display: flex;">
  <Box style="flex: 1; margin-right: 26px;">
    <div id="noun-editor">
      {#each translatedNouns as noun}
        {#if noun.word === ' '}
          &nbsp
        {:else if noun.word === '\n' || noun.word === ' \n'}
          <br>
        {:else}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <span 
            class="noun"
            class:noun__related={noun.related}
            class:noun__selected={noun.selected}
            on:pointerenter={() => addActiveNoun(noun.word)}
            on:pointerleave={() => removeActiveNoun(noun.word)}
            on:pointerdown={() => toggleSelectNoun(noun.word)}
            on:focusin={() => addActiveNoun(noun.word)}
            on:focusout={() => removeActiveNoun(noun.word)}
            on:keydown={(e) => e.code === 'Space' && toggleSelectNoun(noun.word)}
            tabindex="0"
          >{noun.word}</span>
        {/if}
      {/each}
    </div>
  </Box>
  <NounToolbar {tools} />
  <TranslationHistory translations={$translationStore} deleteTranslation={deleteTranslation} />
  <TranslationResults 
    translations={translationResults}
    addTranslation={addTranslation}
    removeTranslationResult={removeTranslationResult}
  />
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

  .noun:focus {
    outline: none;
    color: var(--accent-color);
    animation: blink 1s infinite;
  }

  .noun__selected:focus {
    color: var(--background-color);
  }

  @keyframes blink {
    0%, 100% {
      color: var(--background-color);
    }
    50% {
      color: var(--accent-color);
    }
  }
</style>