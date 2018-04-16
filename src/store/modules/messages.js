import firebaseRef from "../../api/firebase";

const state = {
  messages: []
};

// Mutation types
const MESSAGE_RECEIVED = "messageReceived";

const actions = {
  startListeningForMessages({ commit, state }) {
    firebaseRef.child("messages").on("child_added", snapshot => {
      commit(MESSAGE_RECEIVED, { ...snapshot.val(), id: snapshot.key });
    });
  }
};

const mutations = {
  [MESSAGE_RECEIVED](state, msg) {
    state.messages.push(msg);
  }
};

export default {
  state,
  actions,
  mutations
};
