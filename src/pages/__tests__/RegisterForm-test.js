import React from 'react';
import {RegisterForm} from '../../pages/RegisterForm';
import InputFieldError from '../../components/InputFieldError';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('RegisterForm Component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<RegisterForm/>).toJSON();
    expect(tree).toMatchSnapshot();
  }),

  test('No error message displayed when no error state set', () => {
    const loginComponent = shallow(<RegisterForm />);
    const inputFieldError = (loginComponent.find(InputFieldError).first()).shallow();
    expect(inputFieldError.find('.o-error-active').length).toBe(0);
  }),

  test('Error message displayed when error state set', () => {
    const loginComponent = shallow(<RegisterForm />);
    loginComponent.setState({ emailError: 'Please enter a valid Username' });
    const inputFieldError = (loginComponent.find(InputFieldError).first()).shallow();
    expect(inputFieldError.find('.o-error-active').length).toBe(1);
  })

  test('No url in email', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('email', 'asdf')).toBe('Email is not valid');
  })

  test('Country domain in email missing', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('email', 'asdf@asd')).toBe('Email is not valid');
  })

  test('Correct email entered', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('email', 'test@test.de')).toBe('');
  })

  test('password too short', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', '1as')).toBe('Password must be between 4 and 8 digits long and include at least one numeric digit.');
  })

  test('Digit in password missing', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', 'asdfas')).toBe('Password must be between 4 and 8 digits long and include at least one numeric digit.');
  })

  test('Password too long', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', 'asdffdsasdfas1')).toBe('Password must be between 4 and 8 digits long and include at least one numeric digit.');
  })

  test('Correct password entered', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', '123adf')).toBe('');
  })
});
