import Vue from 'vue'
import App from './App.vue'
//importation des composants
import VueRouter from 'vue-router'
import Create from './components/AddPost.vue'
import Edit from './components/EditPost.vue'
import PostList from './components/PostList.vue'
import Login from './components/LoginUser.vue'
import Signup from './components/SignupUser.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

// Création des routes frontend en leur assignant leur composant
const routes = [
  {
    name: 'Create',
    path: '/create',
    component: Create
  },
  {
    name: 'Edit',
    path: '/edit/:id',
    component: Edit
  },
  {
    name: 'Login',
    path: '/',
    component: Login
  },
  {
    name: 'Signup',
    path: '/signup',
    component: Signup
  },
  {
    name: 'PostList',
    path: '/home',
    component: PostList
  },
];

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  // initialisation de router
  router,
  render: h => h(App),
}).$mount('#app')
