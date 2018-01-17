const actions = {};

//add the user to the store
actions.storeUser = (store, user) => {
  store.user = user;
  store.notify();
};

actions.storeTracks = (store, tracks) => {
  store.tracks = tracks;
  store.notify();
};

export default actions;
