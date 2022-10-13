import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../pages/Login.vue'
import UserMain from '../pages/User.vue'
import UserDashboard from '../pages/User/dashboard.vue'

// admin 
import AdminMain from '../pages/Admin.vue'
import AdminDashboard from '../pages/Admin/dashboard.vue'


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

router.beforeEach(async(to, from, next) => {
    localStorage.setItem('from', from.fullPath)

    const user = localStorage.getItem('token')

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const user_type = to.matched.length > 1 ? to.matched[0].meta.user_type : ''

    if (!requiresAuth && user) {
        console.log('not require auth but there is user')
        if (localStorage.getItem("user_type") == "admin") {
            console.log("admin")
            next("/dashboard")
        } else {
            console.log("user")
            next("/user/dashboard")
        }
    } else if (requiresAuth && !user) {
        console.log('require auth there is no user')
        next('/login');
    } else if (user_type && !user_type.includes(localStorage.getItem("user_type"))) {
        if (localStorage.getItem("user_type") == "admin") {
            console.log("admin")
            next("/dashboard")
        } else if(localStorage.getItem("user_type") == "user") {
            console.log("user")
            next("/user/dashboard")
        }
    } else {
        
        console.log('next')
        next();
    }

})

export default router;