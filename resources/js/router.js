import Welcome from './views/Welcome';
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
    path: '/',
    name: 'welcome',
    component: Welcome
    },
    {
        path: '/categories',
        name: 'categorie',
        component: () => import('./views/Categories.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/LoginPage.vue')
    },
    {
        path: '/kanban',
        name: 'kanban',
        component: () => import('./views/KanBan.vue')
    }
];

const router = new VueRouter({
    routes: routes,
    linkActiveClass: 'active'
});

export default router;