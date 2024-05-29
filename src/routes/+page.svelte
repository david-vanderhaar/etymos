<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { base } from '$app/paths';
  import Editor from '../components/Editor.svelte';

  const PRODUCTION_MODE = process.env.NODE_ENV === 'production';
  // const PRODUCTION_MODE = true
  const FADE_DELAY = 1000;

  const dispatch = createEventDispatcher();

  let rootDocument;
  let rootWindow;
  let mounted = false;

  onMount(async () => {
    rootDocument = document.documentElement;
    rootWindow = window;
    // awaits go here
    mounted = true;
  });


  $: if (mounted) dispatch('pageLoaded', { mounted });
</script>

{#if mounted}
  <div transition:fade={{delay: FADE_DELAY}}>
    <Editor />
  </div>
{:else}
  <div id="loading-indicator" transition:fade={{delay: FADE_DELAY / 2}}>
    ◒
  </div>
{/if}

<style>
  #loading-indicator {
    font-size: 10rem;
    position: sticky;
    margin: auto;
    width: 50%;
    text-align: center;
  }
</style>