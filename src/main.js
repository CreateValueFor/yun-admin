import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Home from '@/pages/Home'
import Order from '@/pages/Order'
import Calendar from '@/pages/Calendar'
import AddProduct from '@/pages/AddProduct'
import ViewProduct from '@/pages/ViewProduct'

import store from './store'

import '@/assets/css/tailwind.css'


Vue.config.productionTip = false

Vue.use(Router)

const routes = [

  {
    path: '/', component: Dashboard, children: [
      { path: '/', redirect: { name: 'Home' } },
      { path: 'home', name: 'Home', component: Home },
      { path: 'order', name: 'Order', component: Order },
      { path: 'calendar', name: 'Calendar', component: Calendar },
      { path: 'addProduct', name: 'AddProduct', component: AddProduct },
      { path: 'manageProduct', name: 'ManageProduct', component: ViewProduct }
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

