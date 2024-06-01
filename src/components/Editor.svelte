<script>
  import { onMount } from "svelte";
  import * as StrongsConcordance from '../lib/concordances/strongs/finder';
  
  let editor;
	
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
	
    const quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "bubble",
    });

    quill.focus();
  });

  // example of finder code
  console.log(StrongsConcordance.findReplacements_v3('David'))
</script>

<div bind:this={editor} class="box" id="editor"></div>

<style>
  @import 'quill/dist/quill.bubble.css';
  @import 'tippy.js/themes/translucent.css';

  #editor {
    height: 400px;
  }

  .box {
    max-width: 600px;
    border: 2px solid var(--highlight-color);
    border-radius: 10px;
    margin: auto;
  }
</style>