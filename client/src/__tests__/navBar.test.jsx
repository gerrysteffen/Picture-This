import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBar from '../components/UI-Components/NavBar';
import APIs from '../APIServices/index'
import { createStore } from 'redux';
import reducer from '../Redux/reducer';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';

jest.mock('../APIServices/index', ()=> {
  return {
    _id: '1'
  }
})
jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  }
});

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const store = createStore(reducer);
    const { container } = render(
      <Provider store={store}>
        <NavBar props={{
          setAuth: ()=>{},
          setUser: ()=>{}
        }} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should go home when clicking on the home icon', () => {
    const store = createStore(reducer);
    const { getByTestId } = render(
      <Provider store={store}>
        <NavBar props={{
          setAuth: ()=>{},
          setUser: ()=>{}
        }} />
      </Provider>
    );
    const homeIcon = getByTestId('home-icon');
    fireEvent.click(homeIcon);
    // Assert that the useNavigate hook is being called with '/'
    expect(useNavigate).toBeCalledWith('/');
  });

  it('should log out when clicking on the logout icon', async () => {
    const store = createStore(reducer);
    const { getByTestId } = render(
      <Provider store={store}>
        <NavBar props={{
          setAuth: ()=>{},
          setUser: ()=>{}
        }} />
      </Provider>
    );
    const logoutIcon = getByTestId('logout-icon');
    fireEvent.click(logoutIcon);
    expect(store.getState().auth).toBe(false);
    expect(store.getState().user).toBe(null);
    expect(APIs.logout).toBeCalled();
    expect(useNavigate).toBeCalledWith('/');
  });
});