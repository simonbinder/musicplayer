import React from 'react';
import RegisterForm from './RegisterForm';
import '../assets/RegisterForm.scss';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <div>
      <div className="c-register-container">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  };
};
