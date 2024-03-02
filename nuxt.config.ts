// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-mongoose"],
  mongoose: {
    uri: process.env.MONGODB,
    options: {},
    modelsDir: 'models',
  },
  ssr: false
});
