import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Game from '@/components/Game'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',

  scrollBehavior () {
    return { x: 0, y: 0 }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/game/:gameId',
      name: 'game',
      component: Game
    },
    {
      name: '404',
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
