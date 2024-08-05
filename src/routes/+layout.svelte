<script>
  import "@fontsource-variable/cormorant";
  import { base } from "$app/paths";
  import { fade } from "svelte/transition";
  import Page from "./+page.svelte";
  
  const FADE_DELAY = 600;
  const year = new Date().getFullYear();
  let pageFadeInReady = false;
</script>

<svelte:head>
  <title>Etymos</title>
  <meta name="description" content="a simple text editor, inspired by the mundanity of names and places" />
  <link rel="icon" href="{base}/favicon/favicon.ico" />
</svelte:head>

<header>
  <h1 class="title">Etym<span id="iframe-toggle" class="highlight-text">o</span>s</h1>
  <p class="subtitle highlight-text">a simple text editor, inspired by the mundanity of names and places.</p>
</header>
<main>
  <Page on:pageLoaded={() => pageFadeInReady = true} />
</main>
{#if pageFadeInReady}
  <footer transition:fade={{delay: FADE_DELAY}}>
    <div>David Vanderhaar - {year}</div>
  </footer>
{/if}
<style>
  @import 'quill/dist/quill.bubble.css';
  @import 'tippy.js/themes/translucent.css';
  @import 'tippy.js/animations/shift-away.css';


  :global(:root) {
    --text-color: rgb(194 193 255);
    --background-color: #53568e;
    --highlight-color: rgb(142, 140, 236);
    --accent-color: rgb(255, 201, 53);
  }

  :global(html) {
    font-family: 'Cormorant Variable', serif;
    height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  :global(button:focus-visible, button:focus) {
    outline-width: 3px;
    outline-color: var(--accent-color);
    outline-style: dashed;
  }

  :global(.tippy-box) {
    color: var(--accent-color);
    background-color: var(--background-color);
    padding: 8px;
  }

  :global(sup) {
    color: var(--accent-color);
  }

  footer > div {
    margin-top: 40px;
  }

  header {
    /* font-family: 'Cormorant Variable', serif; */
    margin-bottom: 2rem;
  }

  header, footer {
    text-align: center;
  }

  .title, .subtitle {
    text-align: center;
  }

  .title {
    margin-bottom: 6px;
  }

  .subtitle {
    margin-top: 0;
    margin-bottom: 40px;
  }

  .highlight {
    background-color: var(--highlight-color);
  }

  .highlight-text {
    color: var(--highlight-color);
  }

  .accent-text {
    color: var(--accent-color);
  }
</style>
