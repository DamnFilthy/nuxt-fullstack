export default {
  head: {
    titleTemplate: "%s - nuxt fullstack",
    title: "Nuxt Fullstack",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [],

  plugins: ["~/plugins/api-context.client.js", "~/plugins/api-context.server.js"],

  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const url = require("url")
        req.query = url.parse(req.url, true).query
        req.params = { ...req.query, ...req.body }
        next()
      },
    },
    { path: "/api", handler: "~app-server/serverMiddleware/api-server.js" },
  ],

  // modern mode: создание отдельного бандла для старых браузеров
  // и более легковесного для новых
  modern: true,

  // auto-import components
  components: false,

  // Предзагрузка по ссылкам
  router: {
    prefetchLinks: false,
  },

  buildModules: ["nuxt-compress"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "cookie-universal-nuxt",
    [
      "nuxt-compress",
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    "nuxt-lazy-load",
    "nuxt-webfontloader",
  ],
  webfontloader: {
    google: {
      families: ["Open Sans:300,400,500,600,700"],
    },
  },
  lazyLoad: {
    // These are the default values
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,

    // Default image must be in the public folder
    defaultImage: "./static/v.png",

    // To remove class set value to false
    loadingClass: "isLoading",
    loadedClass: "isLoaded",
    appendClass: "lazyLoad",
  },

  ssr: true,
  target: "server",

  axios: {
    baseURL: process.env.base_axios_url,
  },

  pwa: {
    manifest: {
      lang: "en",
    },
  },

  build: {},

  loading: {
    color: "blue",
    height: "25px",
  },

  // Доступно на клиенте и сервере
  publicRuntimeConfig: {
    clientSecretKey: process.env.SUPER_SECRET_KEY,
  },
  // Только на серверной части
  privateRuntimeConfig: {
    serverSecretKey: process.env.SUPER_SECRET_KEY,
  },

  optimization: {
    splitChunks: {
      maxSize: 300000,
    },
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
}
