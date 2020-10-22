import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import ConsultantPlan from '../views/ConsultantPlan';
import User from '../views/User';
import Country from '../views/Country';
import Branch from '../views/Branch';

import PageNotFound from '../components/PageNotFound'
import ResetPassword from '../components/ResetPassword'

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
    if (localStorage.getItem('userToken') && localStorage.getItem('userName')) {
        next();
    } else {
        next({
            name: "Login"
        });
    }
}

// function guardMyLoginRoute(to, from, next) {
//     if (localStorage.getItem('userToken') && localStorage.getItem('userName')) {
//         console.log(to, from,)
//         // next({
//         //     name: "Login"
//         // });
//     } else {
//         next();
//     }
// }

const routes = [{
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/users',
        name: 'User',
        component: User,
        beforeEnter: guardMyroute,
    },
    {
        path: '/countries',
        name: 'Countries',
        component: Country,
        beforeEnter: guardMyroute,
    },
    {
        path: '/consultant_plan',
        name: 'consultant_plan',
        component: ConsultantPlan,
        beforeEnter: guardMyroute,
    },
    {
        path: '/branch',
        name: 'branch',
        component: Branch,
        beforeEnter: guardMyroute,
    },
    {
        path: '/forget-password',
        name: 'reset-password',
        component: ResetPassword,
        props: (route) => ({ param: route.query })
    },
    { path: '*', component: PageNotFound }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;