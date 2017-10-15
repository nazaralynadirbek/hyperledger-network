import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

// Components
import Main from './components/Main.vue';
import Dashboard from './components/Dashboard.vue';
import Products from './components/Products.vue';
import Profile from './components/Profile.vue';
import Add from './components/Add.vue';

// Router
const routes = [
    { path: '/', component: Main },
    { path: '/dashboard',
      component: Dashboard,
      children: [{
          path: 'products',
          component: Products
      }, {
          path: 'profile',
          component: Profile
      }, {
          path: 'add',
          component: Add
      }]},
]
const router = new VueRouter({ routes })

Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router
})
