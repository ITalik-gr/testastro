import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false
  }), react()],
  image: {
    domains: ["firebasestorage.googleapis.com"],
  },
  output: "server",
  adapter: vercel()
});