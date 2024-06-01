<script>
  import { onMount } from "svelte";
  import * as StrongsConcordance from '../lib/concordances/strongs/finder';
    import Box from "./Box.svelte";
    import NounEditor from "./NounEditor.svelte";
  
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
  });

  // example of finder code
  console.log(StrongsConcordance.findReplacements_v3('David'))

  function getText() {
    if (!quill) return []
    const regex = /([^\s\n]+)|(\s)|(\n)/g;
    const text = quill.getText(0).split(regex).filter(Boolean);

    return text
  }
  
</script>

<NounEditor words={words} />
<br />
<Box>
  <div bind:this={editor} id="editor"/>
</Box>

<style>
  #editor {
    height: 400px;
  }

  :global(.ql-editor) {
    padding: 0 !important;
  }
</style>