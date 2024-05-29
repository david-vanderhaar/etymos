// vite.config.js
// import { defineConfig } from 'vite'

// export default defineConfig({
//   base: './',
// })

import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
};

export default config;