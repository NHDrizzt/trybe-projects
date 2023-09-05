import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Login from '../Pages/Login';

const DTID_EMAIL_INPUT = 'email-input';
const DTID_PASSWORD_INPUT = 'password-input';
const DTID_LOGIN_BTN = 'login-submit-btn';

describe('Login ELEMENTS', () => {
  it('Should email, password inputs and button be in the document', () => {
    renderWithRouter(<Login />);
    expect(screen.queryByTestId(DTID_EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.queryByTestId(DTID_PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.queryByTestId(DTID_LOGIN_BTN)).toBeInTheDocument();
  });
});
describe('Login BEHAVIOUR', () => {
  test('Login button enables after enter the data needed', () => {
    const { history } = renderWithRouter(<Login />);

    const loginBTN = screen.queryByTestId(DTID_LOGIN_BTN);
    expect(loginBTN).toBeDisabled();

    expect(screen.queryByTestId(DTID_PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.queryByTestId(DTID_LOGIN_BTN)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(DTID_EMAIL_INPUT), 'sdasd@kjsadjkas.com');
    userEvent.type(screen.getByTestId(DTID_PASSWORD_INPUT), 'sjkldjkasdljka');
    expect(loginBTN).toBeEnabled();
    userEvent.click(loginBTN);
    expect(history.location.pathname).toBe('/meals');
  });
});
