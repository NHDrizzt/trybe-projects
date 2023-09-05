import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouter from '../helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';

import Profile from '../Pages/Profile';

const DTID_EMAIL_TEXT = 'profile-email';
const DTID_DONE_BTN = 'profile-done-btn';
const DTID_FAV_RECIPES_BTN = 'profile-favorite-btn';
const DTID_LOGOUT_BTN = 'profile-logout-btn';

describe('Profile ELEMEBTS', () => {
  test('Should "Done Recipes", "Favorite Recipes", "Logout" buttons be in the document', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );

    act(() => { history.push('/profile'); });
    expect(history.location.pathname).toBe('/profile');

    const doneBTN = screen.getByTestId(DTID_DONE_BTN);
    const favBTN = screen.getByTestId(DTID_FAV_RECIPES_BTN);
    const logOutBTN = screen.getByTestId(DTID_LOGOUT_BTN);
    localStorage.setItem('user', JSON.stringify({ email: 'test@tessdasdat.com' }));

    expect(screen.getByTestId(DTID_EMAIL_TEXT)).toBeInTheDocument();
    expect(doneBTN).toBeInTheDocument();
    expect(favBTN).toBeInTheDocument();
    expect(logOutBTN).toBeInTheDocument();
  });
});

describe('Profile BEHAVIOUR', () => {
  test('Should Favorites', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    act(() => { history.push('/profile'); });
    expect(history.location.pathname).toBe('/profile');
    const favBTN = screen.getByTestId(DTID_FAV_RECIPES_BTN);

    userEvent.click(favBTN);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Should Done', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    act(() => { history.push('/profile'); });
    expect(history.location.pathname).toBe('/profile');
    const doneBTN = screen.getByTestId(DTID_DONE_BTN);

    userEvent.click(doneBTN);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Should Logout button perform expected behaviour', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    act(() => { history.push('/profile'); });
    const logOutBTN = screen.getByTestId(DTID_LOGOUT_BTN);
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(logOutBTN);
    expect(history.location.pathname).toBe('/');
    localStorage.clear();
  });
});
