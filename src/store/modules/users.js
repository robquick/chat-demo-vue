import firebaseRef from "../../api/firebase";

const state = {
  currentUser: null,
  users: []
};

// Mutation types
const SET_CURRENT_USER = "setCurrentUser";
const USER_ADDED = "userAdded";
const USER_REMOVED = "userRemoved";

const actions = {
  async signInUser({ commit, state }, name) {
    const newUserRef = firebaseRef.child("users").push();
    await newUserRef.set({ name });
    commit(SET_CURRENT_USER, { id: newUserRef.key, name });
  },
  startListeningForUsers({ commit, state }) {
    const usersRef = firebaseRef.child("users");
    usersRef.on("child_added", snapshot => {
      commit(USER_ADDED, { ...snapshot.val(), id: snapshot.key });
    });
    usersRef.on("child_removed", snapshot => {
      commit(USER_REMOVED, snapshot.val().id);
    });
  }
};

const mutations = {
  [SET_CURRENT_USER](state, user) {
    state.currentUser = user;
  },
  [USER_ADDED](state, user) {
    state.users.push(user);
  },
  [USER_REMOVED](state, id) {
    state.users = state.users.filter(u => u.id !== id);
  }
};

export default {
  state,
  actions,
  mutations
};
