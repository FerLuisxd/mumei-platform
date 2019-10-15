import('roboto-fontface/css/roboto/roboto-fontface.css');
import('roboto-fontface/fonts/roboto/Roboto-Thin.woff2') //100
import('roboto-fontface/fonts/roboto/Roboto-Light.woff2') //300
import('roboto-fontface/fonts/roboto/Roboto-Regular.woff2') //400
import('roboto-fontface/fonts/roboto/Roboto-Medium.woff2') //500
import('roboto-fontface/fonts/roboto/Roboto-Bold.woff2') //700
import('roboto-fontface/fonts/roboto/Roboto-Black.woff2') //900

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)