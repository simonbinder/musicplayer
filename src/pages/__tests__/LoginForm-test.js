import React from 'react';
import {LoginForm} from '../../pages/LoginForm';
import InputFieldError from '../../components/InputFieldError';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginForm Component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<LoginForm/>).toJSON();
    expect(tree).toMatchSnapshot();
  }),

  test('No error message displayed when no error state set', () => {
    const loginComponent = shallow(<LoginForm />);
    const inputFieldError = (loginComponent.find(InputFieldError).first()).shallow();
    expect(inputFieldError.find('.o-error-active').length).toBe(0);
  }),

  test('Error message displayed when error state set', () => {
    const loginComponent = shallow(<LoginForm />);
    loginComponent.setState({ emailError: 'Please enter a valid Username' });
    const inputFieldError = (loginComponent.find(InputFieldError).first()).shallow();
    expect(inputFieldError.find('.o-error-active').length).toBe(1);
  })

  test('Check if email is valid', () => {
    const loginComponent = shallow(<LoginForm />);
    expect(loginComponent.instance().checkValid('email', '')).toBe('Please enter a valid Username');
  })

  test('Correct email entered', () => {
    const loginComponent = shallow(<LoginForm />);
    expect(loginComponent.instance().checkValid('email', 'test@test.de')).toBe('');
  })

  test('Check if password is valid', () => {
    const loginComponent = shallow(<LoginForm />);
    expect(loginComponent.instance().checkValid('password', '')).toBe('Please enter your password');
  })

  test('Correct password entered', () => {
    const loginComponent = shallow(<LoginForm />);
    expect(loginComponent.instance().checkValid('password', '123adf')).toBe('');
  })
});
