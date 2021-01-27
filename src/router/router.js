import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        redirect: '/Dashboard'
    },
    {
        name: 'appContainer',
        path: '/Dashboard',
        component: () => import('../pages/AppContainer.vue'),
        children: [
            {
                path: "",
                name: 'Dashboard',
                component: () => import('../pages/Dashboard.vue')
            },
            {
                name: 'Heroes',
                path: '/Heroes',
                component: () => import('../pages/Heroes.vue')
            },
            {
                name: 'HeroProfil',
                path: '/Hero/:name',
                component: () => import('../pages/heroProfil.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: 'localhost:8080',
    routes
})

export default router;