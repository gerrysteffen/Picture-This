import { UserType } from '../types';

export const setReload = (toggle: Boolean) => ({
  type: 'SET_RELOAD',
  payload: toggle,
});
export const setLoading = (toggle: Boolean) => ({
  type: 'SET_LOADING',
  payload: toggle,
});
export const setAlert = (
  active: Boolean,
  severity: string,
  message: string
) => ({
  type: 'SET_ALERT',
  payload: {
    active: active,
    alertContent: { severity: severity, message: message },
  },
});
export const setAuth = (toggle: Boolean) => ({
  type: 'SET_AUTH',
  payload: toggle,
});
export const setUser = (user: UserType | null) => ({
  type: 'SET_USER',
  payload: user,
});
export const updateUser = (userAttributes: any) => ({
  type: 'UPDATE_USER',
  payload: userAttributes,
});
export const setIsExisting = (toggle: Boolean) => ({
  type: 'SET_EXISTING',
  payload: toggle,
});
