import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import ConsultantPlan from '../views/ConsultantPlan';
import User from '../views/User';
import Country from '../views/Country';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/users',
    name: 'User',
    component: User,
  },
  {
    path: '/countries',
    name: 'Countries',
    component: Country,
  },
  {
    path: '/consultant_plan',
    name: 'consultant_plan',
    component: ConsultantPlan,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
