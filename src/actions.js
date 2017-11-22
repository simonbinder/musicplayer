const actions = {};

actions.loadCourses = function(store) {
  fetch('http://mwa.pages.mi.hdm-stuttgart.de/examples/simple/courses.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(courses) {
      store.courses = courses;
      store.notify();
    });
};

actions.toggleAddForm = function(store) {
  store.addFormOpen = !store.addFormOpen;
  store.notify();
};

actions.addCourse = function(course, store) {
  store.courses.push(course);
  actions.toggleAddForm(store);
  store.notify();
};

actions.removeCourse = function(index, store) {
  store.courses.splice(index, 1);
  store.notify();
};

export default actions;
