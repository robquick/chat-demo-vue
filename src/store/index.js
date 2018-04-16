import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import messages from "./modules/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    messages
  },
  strict: process.env.NODE_ENV !== "production"
});
