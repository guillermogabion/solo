import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../pages/Login.vue'
import UserMain from '../pages/User.vue'
import UserDashboard from '../pages/User/dashboard.vue'

// admin 
import AdminMain from '../pages/Admin.vue'
import AdminDashboard from '../pages/Admin/dashboard.vue'
import { Self } from '../repositories/user.api'
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active-route',
    routes: [
        {
            path: '',
            name: 'admin_main',
            component: AdminMain,
            meta: {
                requiresAuth: true,
                user_type : ['admin'],
            },
            children: [{
                    path: '/admin/dashboard',
                    name: 'admin_dashboard',
                    component: AdminDashboard,
                },
            ]
        },
        {
            path: '/user/',
            name: 'user_main',
            component: UserMain,
            meta: {
                requiresAuth: true,
                user_type : ['user'],
            },
            children: [
               
                {
                    path: '/user/dashboard',
                    name: 'user_dashboard',
                    component: UserDashboard,
                },
            ]
        },

        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAuth: false
            },
        },
    ]
});

function guardRoutes(to, next) {
    const guest_routes = [
        'login'
    ]
    if ((guest_routes.includes(to.name)) && localStorage.getItem('token') === '') {
        next()
    } else if (localStorage.getItem('token') === '') {
        next({ name: 'login' })
    } else if (guest_routes.includes(to.name)) {
        next({ name: 'admin_dashboard' })
    } else {
        next()
    }
}

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token')) {
        Self().then(({ data }) => {
            store.commit('login', data)
            localStorage.setItem('token', data.access_token)
            guardRoutes(to, next)
        }).catch(err => {
            localStorage.removeItem('token')
            console.log(err)
        })
    } else {
        guardRoutes(to, next)
    }
})

export default router