import React from 'react';
import LoginForm from '../../pages/LoginForm';
import InputFieldError from '../InputFieldError';
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
});
