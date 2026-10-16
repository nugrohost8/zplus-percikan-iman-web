// https://nuxt.com/docs/api/configuration/nuxt-config
const sw = process.env.SW === "true"
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  //devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "id",
        translate: "no",
        "data-id": process.env.APP_NAME
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1 shrink-to-fit=no" },
        { "http-equiv": "X-UA-Compatible", content: "ie=edge" },
        { name: "theme-color", content: process.env.MAIN_COLOR },
        { name: "msapplication-TileColor", content: process.env.MAIN_COLOR },
        { name: "description", content: process.env.APP_DESCRIPTION },
        // { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "/sitemap.xml" },
        //{ rel: "preconnect", href: "https://fonts.googleapis.com" },
        //{ id: "google-font", rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;800&display=swap", media: "all" },
        // { id: "font-awesome", rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css", media: "all" }
      ],


    },
    // pageTransition: { name: 'right-to-left', mode: 'out-in' }
  },
  css: ["~/assets/css/bootstrap.min.css", "~/assets/css/style.css", "~/assets/fonts/boxicons.css", "~/assets/fonts/fonts.css"],
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    'vue3-carousel-nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  build: {
    transpile: ['v3-infinite-loading'],
  },
  ssr: true,
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL + "api/",
      storageUrl: process.env.BASE_URL + "storage/",
      baseAppUrl: process.env.BASE_APP_URL,
      dashboardUrl: process.env.DASHBOARD_URL,
      noWa: process.env.NO_WA,
      gtagId: process.env.ANALYTICS_ID,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      facebookPixelID: process.env.FACEBOOK_PIXEL_ID,
      appEnv: process.env.APP_ENV,
      tiktokPixel: process.env.TIKTOK_PIXEL,
      appName: process.env.APP_NAME,
      siteName: process.env.SITE_NAME,
      appDescription: process.env.APP_DESCRIPTION,
      gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
      mainColor: process.env.MAIN_COLOR,
      secondaryColor: process.env.SECONDARY_COLOR,
      facebookUrl: process.env.FACEBOOK_URL,
      instagramUrl: process.env.INSTAGRAM_URL,
      twitterUrl: process.env.TWITTER_URL,
      tiktokUrl: process.env.TIKTOK_URL,
      youtubeUrl: process.env.YOUTUBE_URL,
    },
  },
  site: {
    url: process.env.BASE_URL,
    name: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
  },
})