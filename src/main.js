import Vue from "vue";
import App from "./App.vue";
import Maska from "maska";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(Maska);
Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
