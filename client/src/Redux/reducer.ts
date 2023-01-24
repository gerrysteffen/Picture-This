import { StateType } from '../types';

const initialState: StateType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isExistingUser: true,
  activeAlert: false,
  alertContent: {
    severity: 'error',
    message: 'Something went wrong.',
  },
};

const reducer = (
  state: StateType = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'ALERT_ON':
      return {
        ...state,
        activeAlert: true,
        alertContent: {
          ...state.alertContent,
          ...action.payload
        }
      };
    case 'ALERT_OFF':
      return {
        ...state,
        activeAlert: false,
        alertContent: {
          severity: 'error',
          message: 'Something went wrong.',
        }
      };
    case 'LOADING_OFF':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer