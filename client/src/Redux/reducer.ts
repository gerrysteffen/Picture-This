import { StateType } from '../types';

const initialState: StateType = {
  user: null,
  reloadRequired: true,
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
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'SET_EXISTING':
      return {
        ...state,
        isExistingUser: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'SET_ALERT':
      return {
        ...state,
        activeAlert: action.payload.active,
        alertContent: action.payload.alertContent
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_RELOAD':
      return {
        ...state,
        reloadRequired: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
