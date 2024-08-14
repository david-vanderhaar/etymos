<script>
  import { onMount } from "svelte";
  import * as StrongsConcordance from '../lib/concordances/strongs/finder';
  import EtyJs from '../lib/ety-js/ety-js';
  import Box from "./Box.svelte";
  import NounEditor from "./NounEditor.svelte";
  import { GlobalEventBus } from "../lib/events";
  import IconButton from './IconButton.svelte';
  import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
  import { toast } from '../actions/titleToTooltip';

  let editor;
  let nounEditor;
  let quill;
  let words = []
	
  onMount(async () => {
		const { default: Quill } = await import("quill");

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
      container: [['bold', 'italic', 'underline', 'strike', 'clean']],
      handlers: {clean: cleanFormatHandler}
    }
	
    quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "bubble",
    });

    quill.focus();
    quill.on('text-change', () => words = getText())
  });

  // example of finder code
  console.log('StrongsConcordance: ', StrongsConcordance.findReplacements_v3('David'))

  // example of ety-js
  console.log('EtyJs: ', EtyJs.origins('flower'))

  window['Ety'] = EtyJs

  function getText() {
    if (!quill) return []
    const regex = /([^\s\n]+)|(\s)|(\n)/g;
    const text = quill.getText(0).split(regex).filter(Boolean);

    return text
  }

  let nounEditorActive = false
  let quillEditorActive = true

  GlobalEventBus.on('activate_noun_editor', () => {
    nounEditorActive = true
    quillEditorActive = false

    // unfocus quill if it's focused
    if (quill.hasFocus()) quill.blur()

    // find first word and tab to it.
    const nouns = document.getElementsByClassName('noun')
    if (nouns.length > 0) {
      nouns[0].focus()
    } else {
      // if no words, then tab to tools
      const toolbarButtons = document.querySelectorAll('#noun-toolbar button')
      toolbarButtons[0].focus()
    }
  })

  GlobalEventBus.on('activate_quill_editor', () => {
    nounEditorActive = false
    quillEditorActive = true

    if (!quill.hasFocus()) quill.focus()
  })

  function copyNounEditorContent() {
    const nounEditorElement = document.getElementById('noun-editor')
    navigator.clipboard.writeText('')
    navigator.clipboard.writeText(nounEditorElement.innerText);
    toast('copied to clipboard', nounEditorElement.parentElement)
  }

  function copyQuillEditorContent() {
    navigator.clipboard.writeText('')
    navigator.clipboard.writeText(quill.getText());
    toast('copied to clipboard', editor)
  }

  GlobalEventBus.on('copy_noun_editor', () => {
    copyNounEditorContent();
  })

  GlobalEventBus.on('copy_quill_editor', () => {
    copyQuillEditorContent();
  })
</script>

<div class="editor" class:editor--active={nounEditorActive}>
  <sup>alt + 1</sup>
  <NounEditor words={words} bind:this={nounEditor} />
  <IconButton icon={MdContentCopy} onClick={copyNounEditorContent} />
  <sup>alt + q</sup>
</div>
<br />
<div class="editor" class:editor--active={quillEditorActive}>
  <sup>alt + 2</sup>
  <Box><div bind:this={editor} id="editor"/></Box>
  <IconButton icon={MdContentCopy} onClick={copyQuillEditorContent} />
  <sup>alt + w</sup>
</div>

<style>
  #editor {
    /* height: 400px; */
  }

  sup {
    margin-top: 8px;
  }

  .editor {
    border-left: 3px dashed var(--highlight-color);
    border-right: 3px dashed var(--highlight-color);
    border-radius: 10px;
    padding: 12px 15px;
    margin: 0 120px;
    transition: all 0.2s ease-in-out;
  }

  .editor--active {
    border-left: 3px dashed var(--accent-color);
    border-right: 3px dashed var(--accent-color);
    padding: 12px 15px;
    margin: 0;
    border-radius: 10px;
  }


  :global(.ql-editor) {
    padding: 0 !important;
  }
</style>