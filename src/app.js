import Actions from './actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: props.store,
    };

    props.store.subscribe(s => this.setState({ store: s }));
  }

  render() {
    return (
      <div>
        <Navigation store={this.state.store} />
        <AddCourseForm store={this.state.store} />
        <Courses store={this.state.store} courses={this.state.store.courses} />
      </div>
    );
  }
}

const Navigation = function(props) {
  const style = {
    container: {
      height: '50px',
      background: 'linear-gradient(#00bcd4, #03a9f4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      paddingLeft: '1em',
      paddingRight: '1em',
    },
    button: {
      color: 'white',
      textDecoration: 'none',
      paddingLeft: '1em',
      paddingRight: '1em',
      border: 'solid 1px white',
      borderRadius: '15px',
      height: '30px',
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '1em',
    },
  };

  return (
    <nav style={style.container}>
      <h2>Courses: React</h2>
      <div>
        <a
          href="#"
          onClick={() => Actions.loadCourses(props.store)}
          style={style.button}>
          Reload
        </a>
        <a
          href="#"
          onClick={() => Actions.toggleAddForm(props.store)}
          style={style.button}>
          Add
        </a>
      </div>
    </nav>
  );
};

// Courses component creates an array of course components
const Courses = function(props) {
  const style = {
    collection: {
      marginTop: '2em',
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  if (props.courses.length == 0) {
    return (
      <div>
        <h1>No Courses</h1>
        <p>No courses loaded yet</p>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {props.courses.length} Courses
      </h1>
      <div style={style.collection}>
        {props.courses.map((c, i) =>
          <Course key={i} index={i} course={c} store={props.store} />,
        )}
      </div>
    </div>
  );
};

// Course component renders a course
const Course = function(props) {
  const style = {
    panel: {
      borderRadius: '15px',
      padding: '1em',
      textAlign: 'center',
      background: '#fafafa',
      border: '5px solid white',
      width: '300px',
      cursor: 'pointer',
    },
  };

  return (
    <div
      style={style.panel}
      onClick={() => Actions.removeCourse(props.index, props.store)}>
      <p>
        {props.course.id}
      </p>
      <h2>
        {props.course.course}
      </h2>
      {props.course.staff.map((s, i) =>
        <div key={i}>
          {s}
        </div>,
      )}
      <p>
        {props.course.location}
      </p>
    </div>
  );
};

class AddCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: props.store,
      id: '',
      name: '',
      staff: '',
      location: '',
      style: {
        input: {
          margin: '1em',
          padding: '1em',
          fontSize: '1em',
          width: '400px',
          border: 'none',
          borderBottom: '1px solid #eaeaea',
        },
        button: {
          margin: '1em',
          padding: '1em',
          fontSize: '1em',
          width: '400px',
          border: 'none',
          background: 'linear-gradient(#00bcd4, #03a9f4)',
          color: 'white',
          borderRadius: '15px',
        },
      },
    };
  }

  render() {
    if (!this.state.store.addFormOpen) {
      return null;
    }

    return (
      <div>
        <h1>Add Course</h1>
        <form>
          <input
            type="text"
            value={this.state.id}
            onChange={e => this.setState({ id: e.target.value })}
            placeholder="ID"
            style={this.state.style.input}
          />
          <br />
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            style={this.state.style.input}
          />
          <br />
          <input
            type="text"
            value={this.state.staff}
            onChange={e => this.setState({ staff: e.target.value })}
            placeholder="Staff"
            style={this.state.style.input}
          />
          <br />
          <input
            type="text"
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
            placeholder="Location"
            style={this.state.style.input}
          />
          <br />
          <input
            type="button"
            value="Add"
            style={this.state.style.button}
            onClick={() => {
              Actions.addCourse(
                {
                  id: this.state.id,
                  course: this.state.name,
                  staff: [this.state.staff],
                  location: this.state.location,
                },
                this.state.store,
              );
            }}
          />
        </form>
      </div>
    );
  }
}
