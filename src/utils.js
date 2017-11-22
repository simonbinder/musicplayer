const utils = {};

// create a new store
utils.createStore = function() {
  return {
    courses: [],
    addFormOpen: false,
    subscribers: [],
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
