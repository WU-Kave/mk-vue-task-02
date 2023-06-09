import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

//=================================================公共组件引入=================================================
import DialogCommon from '@/components/Dialog/dialog-common.vue'
import BseTableCommon from '@/components/table/base-table-common.vue'
import BaseTableColumnCommon from '@/components/table/base-table-column-common.vue'
import Pagination from '@/components/Pagination'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

//*********************全局注册组件 BEGIN***************************** */
Vue.component('dialog-common', DialogCommon)
Vue.component('base-table-common', BseTableCommon)
Vue.component('base-table-column-common', BaseTableColumnCommon)
Vue.component('Pagination', Pagination)




//*********************全局注册组件 END***************************** */

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
