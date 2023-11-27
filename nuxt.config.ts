// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }, 
  modules: ['@sidebase/nuxt-auth'],
  auth: {
   globalAppMiddleware: true
  },
  runtimeConfig:{
    github_client_id: process.env.GITHUB_ID_OAUTH,
    github_key_secret:process.env.GITHUB_SECRET_KEY,
    google_client_id: process.env.GOOGLE_ID_OAUTH,
    google_key_secret:process.env.GOOGLE_SECRET_KEY,
    conexao:process.env.CONEXAO_MONGODB,
    oauth_secret:process.env.OAUTH_SECRET
  }
})
