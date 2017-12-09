const actions = {};

//add the user to the store
actions.storeUser = (store, user) => {
  store.user = user;
  store.notify();
};

export default actions;
