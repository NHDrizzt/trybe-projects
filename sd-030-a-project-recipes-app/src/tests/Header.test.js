import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../Components/Header';
import Login from '../Pages/Login';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../helpers/renderWithRouter';

// finalizado!

describe('Comportamento Header', () => {
  test('O Header não deve aparecer ná página de login', () => {
    renderWithRouter(<Login />);
    expect(screen.queryByTestId('header-content')).toBeNull();
  });
  describe('Teste de renderizazção do componenete', () => {
    beforeEach(() => {
      renderWithRouter(
        <AppProvider>
          <Header />
        </AppProvider>,
      );
    });

    test('Testa se o título da página é renderizado corretamente', () => {
      const pageTitle = screen.getByTestId('page-title');
      expect(pageTitle.textContent).toBe('');
    });

    test('Testa se o botão do perfil é renderizado corretamente', () => {
      const profileButton = screen.getByTestId('profile-top-btn');
      expect(profileButton.getAttribute('alt')).toBe('Profile Icon');
    });

    test('Testa se o input de pesquisa e os botões de filtros são exibidos ao clicar no botão de pesquisa', () => {
      const searchButton = screen.getByTestId('search-top-btn');
      userEvent.click(searchButton);
      const searchBar = screen.getByTestId('search-input');
      expect(searchBar).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
      expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
      expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    });
    test('Testa se a entrada de pesquisa é ocultada ao clicar novamente no botão de pesquisa', () => {
      const searchButton = screen.getByTestId('search-top-btn');
      userEvent.click(searchButton);
      userEvent.click(searchButton);
      const searchBar = screen.queryByTestId('search-input');
      expect(searchBar).toBeNull();
    });
  });
});
