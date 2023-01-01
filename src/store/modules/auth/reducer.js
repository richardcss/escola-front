import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  console.log(action.type);

  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      const newState = { ...initialState };

      return newState;
    }

    default: {
      return state;
    }
  }
};
