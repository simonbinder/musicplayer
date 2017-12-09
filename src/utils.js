const utils = {};

// create a new store
utils.createStore = function() {
  return {
    //the user account object
    user: null,
    //search value entered in the searchfield in the header
    searchValue: '',
    //functions
    subscribe: function(s) {
      this.subscribers.push(s);
    },
    notify: function() {
      for (var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](this);
      }
    },
  };
};

export default utils;
