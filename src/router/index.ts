import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/ProductsList.vue'),
    },
    {
        path: '/products/new',
        name: 'new-product',
        component: () => import('../views/AddProduct.vue'),
    },
    {
        path: '/products/edit',
        name: 'edit-product',
        component: () => import('../views/AddProduct.vue'),
    },
    {
        path: '/reports',
        name: 'reports',
        component: () => import('../views/Reports.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
