import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import VCalendar from 'v-calendar'


//customer
import Dashboard from '@/components/Dashboard'
import Customer from '@/components/customer/Customer'


// admin
import Home from '@/pages/Home'
import Order from '@/pages/Order'
import Calendar from '@/pages/Calendar'
import AddProduct from '@/pages/AddProduct'
// import ViewProduct from '@/pages/ViewProduct'
import ManageProduct from '@/pages/ManageProduct'
import OrderList from "@/pages/OrderList"
import DeliveryList from '@/pages/DeliveryList'

import store from './store'

//customer page
import Login from "@/pages/customer/Login"
import Delivery from '@/pages/customer/Delivery'
import Info from '@/pages/customer/Info'
import CustomerCalendar from '@/pages/customer/Calendar'

import '@/assets/css/tailwind.css'
import "@/assets/css/main.scss"

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VCalendar)


const routes = [
  {
    path: "/", component: Customer, children: [
      { path: "login", component: Login, name: "Login" },
      { path: "calendar", component: CustomerCalendar, name: "CustomerCalendar" },
      { path: "info", component: Info, name: "Info" },
      { path: "delivery", component: Delivery, name: "Delivery" },
    ]
  },

  {
    path: '/545f7b3a-asdjf123-51234', component: Dashboard, children: [
      { path: '/', redirect: { name: 'Home' } },
      { path: 'home', name: 'Home', component: Home },
      { path: 'order', name: 'Order', component: Order },
      { path: 'order-list', name: 'OrderList', component: OrderList },
      { path: 'delivery-list', name: 'DeliveryList', component: DeliveryList },

      { path: 'calendar', name: 'Calendar', component: Calendar },
      { path: 'addProduct', name: 'AddProduct', component: AddProduct },
      { path: 'manageProduct', name: 'ManageProduct', component: ManageProduct }
    ]
  },
  {
    path: "*",
    redirect: "/"
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

