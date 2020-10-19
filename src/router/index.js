import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import ConsultantPlan from '../views/ConsultantPlan';
import User from '../views/User';
import Country from '../views/Country';

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

// function guardMyLoginroute(to, from, next) {
//     if (!(localStorage.getItem('userToken') && localStorage.getItem('userName'))) {
//         next({
//             name: "Login"
//         });
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
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;