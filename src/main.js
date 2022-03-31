import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Customer from '@/components/customer/Customer'
import Home from '@/pages/Home'
import Order from '@/pages/Order'
import Calendar from '@/pages/Calendar'
import AddProduct from '@/pages/AddProduct'
import ViewProduct from '@/pages/ViewProduct'
import OrderList from "@/pages/OrderList"
import DeliveryList from '@/pages/DeliveryList'

import store from './store'

//customer page
import Login from "@/pages/customer/Login"

import '@/assets/css/tailwind.css'


Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  {
    path: "/customer", component: Customer, children: [
      { path: "login", component: Login, name: "Login" },

    ]
  },

  {
    path: '/', component: Dashboard, children: [
      { path: '/', redirect: { name: 'Home' } },
      { path: 'home', name: 'Home', component: Home },
      { path: 'order', name: 'Order', component: Order },
      { path: 'order-list', name: 'OrderList', component: OrderList },
      { path: 'delivery-list', name: 'DeliveryList', component: DeliveryList },

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

