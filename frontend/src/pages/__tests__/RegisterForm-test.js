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
    expect(inputFieldError.find('.o-error-active').length).toMatchSnapshot();
  }),

  test('Error message displayed when error state set', () => {
    const loginComponent = shallow(<RegisterForm />);
    loginComponent.setState({ emailError: 'Please enter a valid Username' });
    const inputFieldError = (loginComponent.find(InputFieldError).first()).shallow();
    expect(inputFieldError.find('.o-error-active').length).toMatchSnapshot();
  })

  test('No url in email', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('email', 'asdf')).toMatchSnapshot();
  })

  test('Country domain in email missing', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('email', 'asdf@asd')).toMatchSnapshot();
  })

  test('Correct email entered', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('email', 'test@test.de')).toMatchSnapshot();
  })

  test('password too short', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', '1as')).toMatchSnapshot();
  })

  test('Digit in password missing', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', 'asdfas')).toMatchSnapshot();
  })

  test('Password too long', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', 'asdffdsasdfas1')).toMatchSnapshot();
  })

  test('Correct password entered', () => {
    const loginComponent = shallow(<RegisterForm />);
    expect(loginComponent.instance().checkValid('password', '123adf')).toMatchSnapshot();
  })
});
