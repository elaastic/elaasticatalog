// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path";

export default defineNuxtConfig({
  alias: {
    "#common": "../../common",
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    [
      "@nuxtjs/i18n",
      {
        i18n: {
          vueI18n: "./i18n.config.ts",
        },
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  runtimeConfig: {
    public: {
      BACK_URL: process.env.NUXT_PUBLIC_BACK_URL,
    },
  },
  ssr: false,
  ui: {
    icons: ["mdi", "heroicons"],
  },
});
