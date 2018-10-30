import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/index'
import newList from '@/components/new_list'
import songPlay from '@/components/song_play'
import album from '@/components/album'
import mvPlay from '@/components/mv_play'
import playList from '@/components/play_list'
import bangdan from '@/components/bangdan'
import search from '@/components/search'
import gedan from '@/components/gedan'

Vue.use(Router)
export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/newList/:type/:page',
      name: 'newList',
      component: newList
    },
    {
      path: '/songPlay/:id',
      name: 'songPlay',
      component: songPlay
    },
    {
      path: '/album/:id',
      name: 'album',
      component: album
    },
    {
      path: '/gedan/:id',
      name: 'gedan',
      component: gedan
    },
    {
      path: '/mvPlay/:id',
      name: 'mvPlay',
      component: mvPlay
    },
    {
      path: '/playList',
      name: 'playList',
      component: playList
    },
    {
      path: '/bangdan',
      name: 'bangdan',
      component: bangdan
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: search
    }
  ]
})
