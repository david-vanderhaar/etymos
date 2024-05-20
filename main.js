import 'quill/dist/quill.bubble.css'
import 'tippy.js/themes/translucent.css';
import './style.css'

import Quill from 'quill'
import 'quill-autoformat'
import tippy from 'tippy.js';
import { STRONGS_DICTIONARY } from './lib/strongs-hebrew-dictionary.js'



  // globals
  let ETYMOLOGY_IFRAME_ENABLED = true;
  let BLUE_LETTER_IFRAME_ENABLED = true;
  let IFRAME_DISPLAY = false;
  preventNavigation();

  function preventNavigation() {
    // prevent page navigation during iframe interaction
    window.onbeforeunload = function(event) {
      event.preventDefault();
      return false;
    };
  }

  function allowNavigation() {
    window.onbeforeunload = null;
  }

  function toggleIframeEnabled() {
    IFRAME_DISPLAY = !IFRAME_DISPLAY;
    setIframeDisplay(IFRAME_DISPLAY);
    // ETYMOLOGY_IFRAME_ENABLED = !ETYMOLOGY_IFRAME_ENABLED;
    // BLUE_LETTER_IFRAME_ENABLED = !BLUE_LETTER_IFRAME_ENABLED;
    // if (ETYMOLOGY_IFRAME_ENABLED || BLUE_LETTER_IFRAME_ENABLED) {
  }

  function setIframeDisplay(show) {
    // root css iframe-display
    const root = document.documentElement;
    if (!show) {
      root.style.setProperty('--iframe-display', 'none');
    } else {
      root.style.setProperty('--iframe-display', 'block');
    }
  }

  function handleClickEtymos() {
    // get element by id iframe-toggle
    const target = document.getElementById("iframe-toggle");
    if (target.classList.contains("highlight-text")) {
      target.classList.remove("highlight-text");
      target.classList.add("accent-text");
    } else {
      target.classList.remove("accent-text");
      target.classList.add("highlight-text");
    }

    toggleIframeEnabled();
  }

  // helper functions
  function uuid() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  function suggetionListElement(id, suggestion) {
    if (!suggestion) return "";
    const word = suggestion.word;
    return `<div class="suggestion" data-suggestion="${word}" data-id="${id}">
        ${word}: ${replacementElements(word, suggestion.replacements)}
        ${blueLetterIframeElement(word)}
        ${etymologyIframeElement(word)}
      </div>`;
  }

  function blueLetterIframeElement(word) {
    if (!BLUE_LETTER_IFRAME_ENABLED) return "";
    const iframe = createBlueLetterIframe(word);
    return iframe.outerHTML;
  }

  function etymologyIframeElement(word) {
    if (!ETYMOLOGY_IFRAME_ENABLED) return "";
    const iframe = createEtymologyOnlineIframe(word);
    return iframe.outerHTML;
  }

  function createBlueLetterIframe(word) {
    return createIframeElementBySource(`https://www.blueletterbible.org/search/search.cfm?Criteria=${word}&t=KJV#s=s_lexiconc`)
  }

  function createEtymologyOnlineIframe(word) {
    return createIframeElementBySource(`https://www.etymonline.com/search?q=${word}`);
  }

  function createIframeElementBySource(source) {
    const iframe = document.createElement("iframe");
    iframe.src = source;
    return iframe;
  }

  function replacementElements(word, replacements) {
    return replacements
      .map((replacement) => replacementElement(word, replacement))
      .join(", ");
  }

  function replacementElement(word, replacement) {
    const onclick = `onSuggestionClick(event, '${word}', '${replacement}')`;
    return `<span class="replacement" onclick="${onclick}">${replacement}</span>`;
  }

  // this should be available in the global scope
  // this is done by adding the function to the window object
  function onSuggestionClick(event, properNoun, replacementString) {
    const id = event.target.parentElement.dataset.id;
    const node = document.getElementById(id);
    if (node) {
      node.innerText = replacementString;
      quill.focus();
    }
  }

  window.onSuggestionClick = onSuggestionClick;

  function findReplacements(properNoun) {
    if (!properNoun) return null;
    if (properNoun.length < 3) return null;

    // You can use an API here to fetch suggestions based on the proper noun.
    // For simplicity, I'll provide a local example.
    const replacements = {
      "David": {
        word: properNoun,
        replacements: ["The beloved", "King of Israel", "Beloved one"]
      }
    };
    return replacements[properNoun] || { word: properNoun, replacements: []}
    // return replacements[properNoun] || null
  }

  function findReplacements_v2(properNoun) {
    if (!properNoun) null;
    if (properNoun.length < 3) return null;

    // Normalize the input proper noun (e.g., convert to lowercase and remove spaces)
    const normalizedProperNoun = properNoun.toLowerCase().replace(/\s/g, '');
    console.log(normalizedProperNoun);
    const suggestions = [];

    // Iterate through the Strong's Concordance data
    for (const strongsNumber in STRONGS_DICTIONARY) {
      const entry = STRONGS_DICTIONARY[strongsNumber];
      const strongsDef = entry.strongs_def?.toLowerCase();
      const normalizedStrongsDef = strongsDef === undefined ? '' : strongsDef;
      const kjvDef = entry.kjv_def?.toLowerCase();
      const normalizedKjvDef = kjvDef === undefined ? '' : kjvDef;

      // Check if the normalized proper noun is found in the strongs_def or kjv_def
      if (normalizedStrongsDef.includes(normalizedProperNoun)) {
        console.log(normalizedStrongsDef);
        suggestions.push(entry.strongsDef);
      }
      if (normalizedKjvDef.includes(normalizedProperNoun)) {
        suggestions.push(entry.kjv_def);
      }
    }

    return { word: properNoun, replacements: suggestions }
  }

  function findReplacements_v3(properNoun) {
    if (!properNoun) null;
    if (properNoun.length < 3) return null;

    // Normalize the input proper noun (e.g., convert to lowercase and remove spaces)
    const normalizedProperNoun = properNoun.toLowerCase().replace(/\s/g, '');
    const suggestions = [];

    // Iterate through the Strong's Concordance data
    // for each entry, check if the normalized proper noun is found at the beginning of the strongs_def or kjv_def
    // if so, search the derivation field for a strongs number (H + any number of digits)
    // if found, search the dictionary for that strongs number
    // if found, add the strongs_def and kjv_def to the suggestions
    for (const strongsNumber in STRONGS_DICTIONARY) {
      const entry = STRONGS_DICTIONARY[strongsNumber];
      const strongsDef = entry.strongs_def?.toLowerCase();
      const normalizedStrongsDef = strongsDef === undefined ? '' : strongsDef;
      const kjvDef = entry.kjv_def?.toLowerCase();
      const normalizedKjvDef = kjvDef === undefined ? '' : kjvDef;
      // Check if the normalized proper noun is found at the beginning of the strongs_def or kjv_def
      if (normalizedStrongsDef.startsWith(normalizedProperNoun)) {
        suggestions.push(entry.strongs_def);
        suggestions.push(entry.kjv_def);
        // Search the derivation field for a strongs number (H + any number of digits)
        const derivationMatch = entry.derivation?.match(/H\d+/);
        if (derivationMatch) {
          const derivedNumber = derivationMatch[0];
          // Search the dictionary for that strongs number
          const derivedEntry = STRONGS_DICTIONARY[derivedNumber];
          if (derivedEntry) {
            suggestions.push(derivedEntry.strongs_def);
            suggestions.push(derivedEntry.kjv_def);
          }
        }
      }
      if (normalizedKjvDef.startsWith(normalizedProperNoun)) {
        suggestions.push(entry.strongs_def);
        suggestions.push(entry.kjv_def);
        // Search the derivation field for a strongs number (H + any number of digits)
        const derivationMatch = entry.derivation?.match(/H\d+/);
        if (derivationMatch) {
          const derivedNumber = derivationMatch[0];
          // Search the dictionary for that strongs number
          const derivedEntry = STRONGS_DICTIONARY[derivedNumber];
          if (derivedEntry) {
            suggestions.push(derivedEntry.strongs_def);
            suggestions.push(derivedEntry.kjv_def);
          }
        }
      }
    }

    // sanitize suggestions
    const uniqueSuggestions = [...new Set(suggestions)];
    // escape single quotes
    const escapedSuggestions = uniqueSuggestions.map((suggestion) => suggestion.replace(/'/g, "\\'"));

    // break suggestions into words by splitting on commas
    const words = escapedSuggestions.map((suggestion) => suggestion.split(","));
    return { word: properNoun, replacements: words.flat().map((word) => word.trim()) }
  }

  // custom quill blot
  const Embed = Quill.import('blots/embed');

  class Propernoun extends Embed {
    static blotName = 'propernoun';
    static className = 'ql-propernoun';
    static tagName = 'SPAN';

    static triggerRegex = /[\s,.;:?!]/;
    static findRegex = /\b[A-Z][a-z]*\b/g;

    static create(value) {
      const node = super.create(value);
      node.setAttribute('id', uuid());
      node.textContent = value;
      Propernoun.createTooltip(node, value);
      return node;
    }

    static value(domNode) {
      return domNode.textContent
    }

    static createTooltip(node, value) {
      const content = suggetionListElement(node.id, findReplacements_v3(value))
      if (content) {
        const tooltip = tippy(node, {
          content: content,
          allowHTML: true,
          interactive: true,
          placement: "bottom",
          // maxWidth: "400px",
          maxWidth: "none",
          theme: "translucent",
          appendTo: () => document.body,
          onCreate: () => {node.classList.add("animate-highlight")},
        });
      }
    }
  }

  Quill.register(Propernoun, true);
  Quill.register({'formats/at': Propernoun});

  // clean formatting handler
  function cleanFormatHandler(value) {
    if (value) {
      quill.format('bold', false);
      quill.format('italic', false);
      quill.format('underline', false);
      quill.format('strike', false);
      quill.format('background', false);
      quill.format('color', 'var(--text-color)');
    }
  }

  const toolbarOptions = {
    container: [
      ['bold', 'italic', 'underline', 'strike', 'clean'],
    ],
    handlers: {
      clean: cleanFormatHandler,
    }
  }

  const quill = new Quill(
    '#editor',
    {
      theme: 'bubble',
      modules: {
        toolbar: toolbarOptions,
        autoformat: {
          // automatically highlight proper nouns
          propernoun: {
            trigger: Propernoun.triggerRegex,
            find: Propernoun.findRegex,
            // format: 'bold',
            insert: 'propernoun',
          },
        },
      },
    }
  );

  quill.focus();

  const iframeToggle = document.getElementById("iframe-toggle");
  iframeToggle.addEventListener("click", handleClickEtymos);