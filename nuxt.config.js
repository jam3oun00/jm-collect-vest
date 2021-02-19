export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    baseUrl: process.env.baseResourceUrl
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.baseURL
    }
  },
  axios: {
    baseURL: process.env.baseURL // Used as fallback if no runtime config is provided
  },

  head: {
    title: "CollectVest",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
      },
      // {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'},
      { src: "https://use.fontawesome.com/49a30ef678.js" },
      // {src: '/js/jquery-1.11.1.min.js'},
      { src: "/js/move-top.js" },
      { src: "/js/jquery.sticky.js" },
      { src: "/js/easing.js" },
      { src: "/font-awesome-4.7.0/css/font-awesome.min.css" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/bootstrap.css",
    "@/assets/css/style.css",
    "@/assets/scss/custom.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/bootstrap",
    "~/plugins/axios",
    "~/plugins/mixins",
    "~plugins/filters",
    "~/plugins/vac",
    "~/plugins/tel"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: ["~components/shared/"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build"
  ],
  auth: {
    redirect: {
      login: "/signup",
      logout: "/",
      callback: "/login",
      home: "/"
    },
    strategies: {
      local: {
        user: {
          property: false, // <--- Default "user"
          autoFetch: true
        },
        endpoints: {
          login: {
            url: "/users/login",
            method: "post",
            propertyName: "token"
          },
          logout: {
            url: "/users/logout",
            method: "delete"
          },
          user: {
            url: "/users/profiles",
            method: "get",
            propertyName: false // <--- Default "user"
          }
        }
      }
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "bootstrap-vue/nuxt"
  ],
  // specify module rules for css and scss
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  // use these settings to use custom css
  bootstrapVue: {
    bootstrapCSS: false,
    icons: true
  },
  router: {
    middleware: ["auth"]
  },
  compilerOptions: {
    types: ["@nuxtjs/auth-next"]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
