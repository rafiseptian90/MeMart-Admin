/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/dashboard',
    name: 'Dashboard',
    slug: 'dashboard',
    i18n: 'Dashboard',
    icon: 'HomeIcon'
  },
  {
    url: '/classrooms',
    slug: 'classroom',
    name: 'Classroom',
    icon: 'HomeIcon',
    i18n: 'Classroom'
  },
  {
    url: '/parent-incomes',
    slug: 'parent-income',
    name: 'Parent Income',
    icon: 'DollarSignIcon',
    i18n: 'ParentIncome'
  },
  {
    url: '/parent-completnesses',
    slug: 'parent-completnesses',
    name: 'Parent Completnesses',
    icon: 'UsersIcon',
    i18n: 'ParentCompletnesses'
  },
  {
    url: '/other-criterias',
    slug: 'other-criterias',
    name: 'Other Criteria',
    icon: 'UsersIcon',
    i18n: 'OtherCriteria'
  },
  {
    url: '/user-settings',
    slug: 'user-settings',
    name: 'User Settings',
    icon: 'SettingsIcon',
    i18n: 'UserSettings'
  },
]

