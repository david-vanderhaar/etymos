<script>
  import { onMount } from "svelte";
  import * as StrongsConcordance from '../lib/concordances/strongs/finder';
  import Box from "./Box.svelte";
  import NounEditor from "./NounEditor.svelte";
  import { GlobalEventBus } from "../lib/events";
  
  let editor;
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
    quill.on('text-change', () => console.log('text change'))
    quill.on('selection-change', () => console.log('selection change'))
  });

  // example of finder code
  console.log(StrongsConcordance.findReplacements_v3('David'))

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
</script>

<div class="editor" class:editor--active={nounEditorActive}>
  <sup>alt + 1</sup>
  <NounEditor words={words} />
</div>
<br />
<div class="editor" class:editor--active={quillEditorActive}>
  <sup>alt + 2</sup>
  <Box><div bind:this={editor} id="editor"/></Box>
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