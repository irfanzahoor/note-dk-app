import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/note',
    name: 'new-note',
    component: () => import('../views/NoteView.vue'),
    children: [
      {
        path: ':id', // ✅ remove leading slash for nested route
        name: 'note',
        component: () => import('../views/NoteView.vue')
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue')
  }
];

export const router = createRouter({
  history: createWebHashHistory(), // ✅ Use hash history for Electron compatibility
  routes
});

// Optional navigation guard
router.beforeEach(async (to, from) => {
  // logic here if needed
});
