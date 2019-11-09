/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  mode: 'spa', // or 'universal'
  head: {
    title: 'mumei-vue-electron'
  },
  loading: false,
  plugins: [
    {ssr: true, src: '@/plugins/icons.js'},
    
    
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify',
  ],
  auth:{
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/user/afterLogin', method: 'get', propertyName: 'user' },
          logout: false,
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  axios: {
    baseURL: `http://localhost:4000/api/`,
    debug: true
  },
          vuetify: {
            theme: {
              themes: {
                light: {
                  primary: '#1867c0',
                  secondary: '#b0bec5',
                  accent: '#8c9eff',
                  error: '#b71c1c',
                },
              },
            }
          }
};
