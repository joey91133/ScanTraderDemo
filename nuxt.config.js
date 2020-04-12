require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/vue-lodash'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/moment'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    credentials: true,
    baseURL: '',
    proxy: true
  },
  moment: {
    defaultLocale: 'zh-tw'
  },
  proxy: {
    '/jiashi': {
      target: process.env.MONEY_DJ_HOST,
      changeOrigin: true,
      pathRewrite: {
        '^/jiashi': ''
      },
      onProxyReq(proxyReq, req, res) {
        const { referer, host } = req.headers
        if (!referer && !(referer || '').includes(host)) {
          res.writeHead(400, {
            'Content-Type': 'application/json; charset=UTF-8',
            'Cache-Control': 'No-Store'
          })
          res.write(
            JSON.stringify({
              error: true,
              message: 'You do not have access permission to view this page.'
            })
          )
          res.end()
        }
      },
      onProxyRes(proxyRes, req, res) {
        proxyRes.headers['Cache-Control'] = 'No-Store'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    cache: true,
    hardSource: true,
    parallel: true
  },
  modern: true
}
