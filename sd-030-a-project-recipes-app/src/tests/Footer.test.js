import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Footer from '../Pages/Footer';
import AppProvider from '../context/AppProvider';

const MEALS_BUTTON = 'meals-bottom-btn';
const DRINKS_BUTTON = 'drinks-bottom-btn';

describe('Comportamento Footer', () => {
//   test('verifica se existe o icone de meals na tela de meals', () => {
//     renderWithRouter(
//       <AppProvider>
//         <Meals />
//         <Footer />
//       </AppProvider>,
//     );
//     const mealButton = getByRole('img', { name: /meal-icon/i });
//     console.log(mealButton);
//     expect(mealButton).toBeInTheDocument();
//   });
//   test('verifica se existe o icone de drinks na tela de drinks', () => {
//     renderWithRouter(
//       <AppProvider>
//         <Drinks />
//         <Footer />
//       </AppProvider>,
//     );
//     const drinkButton = getByRole('img', { name: /drink-icon/i });
//     expect(drinkButton).toBeInTheDocument();
//   });
  test('verifica se existe o icone de meals no footer', () => {
    renderWithRouter(<Footer />);
    expect(screen.queryByTestId(MEALS_BUTTON)).toBeInTheDocument();
  });
  test('verifica se existe o icone de drinks no footer', () => {
    renderWithRouter(<Footer />);
    expect(screen.queryByTestId(DRINKS_BUTTON)).toBeInTheDocument();
  });
  test('clica no icone de drinks e deve ser redirecionado para /drinks', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Footer />
      </AppProvider>,
    );
    const drinksButton = screen.queryByTestId(DRINKS_BUTTON);
    userEvent.click(drinksButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  test('clica no icone de meals e deve ser redirecionado para /meals', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Footer />
      </AppProvider>,
    );
    const mealsButton = screen.queryByTestId(MEALS_BUTTON);
    userEvent.click(mealsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
