/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard'
        },
        // =============================================================================
        // Dashboard Routes
        // =============================================================================
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue'),
          meta: {
            rule: 'editor'
          }
        },
        // =============================================================================
        // Classroom Routes
        // =============================================================================
        {
          path: '/classrooms',
          name: 'classroom-index',
          component: () => import('@/views/classroom/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Classroom Lists', active: true }
            ],
            pageTitle: 'Classroom',
            rule: 'editor'
          }
        },
        // =============================================================================
        // User Setting Routes
        // =============================================================================
        {
          path: '/user-settings',
          name: 'user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {

    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser

    // if (
    //     to.path === "/pages/login" ||
    //     to.path === "/pages/forgot-password" ||
    //     to.path === "/pages/error-404" ||
    //     to.path === "/pages/error-500" ||
    //     to.path === "/pages/register" ||
    //     to.path === "/callback" ||
    //     to.path === "/pages/comingsoon" ||
    //     (auth.isAuthenticated() || firebaseCurrentUser)
    // ) {
    //     return next();
    // }

    // If auth required, check login. If login fails redirect to login page
    if (to.meta.authRequired) {
      if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
        router.push({ path: '/pages/login', query: { to: to.path } })
      }
    }

    return next()
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });

  })

})

export default router
