import Vue from 'vue';
import App from './App.vue';

// router
import router from './router';

//metarial ui vue
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import './assets/style.css';

// bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-loaders/dist/vue-loaders.css';

// plugin
import VueResource from "vue-resource";
import VueMoment from 'vue-moment';
import Vuelidate from 'vuelidate';
import VueMaterial from 'vue-material';
import VueLoaders from 'vue-loaders';

Vue.config.productionTip = false;

Vue.use(VueLoaders);
Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(VueMaterial);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
