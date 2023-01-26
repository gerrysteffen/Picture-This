import React from 'react';
import { render, fireEvent, renderWithProviders } from '@testing-library/react';
import NavBar from '../components/UI-Components/NavBar';
import APIs from '../APIServices/index';
import { createStore } from 'redux';
import reducer from '../Redux/reducer';
// import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Redux/actions';

const mockedNavigate = jest.fn()

jest.mock('../APIServices/index', () => ({
  logout: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

// const navigate = jest.fn();

describe('NavBar', () => {
  const store = createStore(reducer);
  store.dispatch(setUser({pendingInvite:[{owner: 'Gerry', _id: '101', albumName: 'Hello'}]}))
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render correctly', () => {
    const { container } = render(
    <Provider store={store}>
      <NavBar />
    </Provider>
    )
    expect(container).toMatchSnapshot();
  });

  it('should go home when clicking on the home icon', () => {
    const { getByTestId } = render(
    <Provider store={store}>
      <NavBar />
    </Provider>
    )
    const homeIcon = getByTestId('home-icon');
    fireEvent.click(homeIcon);
    // Assert that the useNavigate hook is being called with '/'
    expect(mockedNavigate).toBeCalledWith('/');
  });

  it('should log out when clicking on the logout icon', async () => {
    const { getByTestId } = render(
    <Provider store={store}>
      <NavBar />
    </Provider>
    )
    const logoutIcon = getByTestId('logout-icon');
    await fireEvent.click(logoutIcon);
    expect(store.getState().isAuthenticated).toBe(false);
    expect(store.getState().user).toBe(null);
    expect(APIs.logout).toBeCalled();
    expect(mockedNavigate).toBeCalledWith('/');
  });
});
