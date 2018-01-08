import credentialsReducer from '../credentialsReducer'
import {SAVE_SPOTIFY_ACCESS_TOKEN, SAVE_USER, RESET_CREDENTIALS} from '../../consts/credentialsConsts';

describe('credentials reducer', () => {
  it('should return the initial state', () => {
    expect(credentialsReducer(undefined, {})).toMatchSnapshot();
  })

  it('save spotify access token', () => {
    expect(credentialsReducer({}, {
      type: SAVE_SPOTIFY_ACCESS_TOKEN,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('save user', () => {
    expect(credentialsReducer({}, {
      type: SAVE_USER,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('reset credentials', () => {
    expect(credentialsReducer({}, {
      type: RESET_CREDENTIALS
    })).toMatchSnapshot();
  })

})
