import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

const DTID_INGREDIENT_RADIO = 'ingredient-search-radio';
const searchInput = 'search-input';
const execButton = 'exec-search-btn';

afterEach(() => {
  jest.restoreAllMocks();
});
describe('Testando o componente SearchBar', () => {
  test('Testa o comportamento dos elementos do formulário', () => {
    renderWithRouterAndContext(<App />, '/meals');
    const searchIcon = screen.getByRole('img', { name: /search icon/i });

    userEvent.click(searchIcon);

    const input = screen.getByTestId(searchInput);
    expect(input.value).toBe('');

    userEvent.type(input, 'Lentils');
    expect(input.value).toBe('Lentils');

    const ingredientOption = screen.getByTestId(DTID_INGREDIENT_RADIO);
    expect(ingredientOption).toBeChecked();

    userEvent.click(screen.getByTestId('name-search-radio'));
    const nameOption = screen.getByTestId('name-search-radio');
    expect(nameOption).toBeChecked();

    const searchButton = screen.getByTestId(execButton);
    expect(searchButton).toBeEnabled();

    userEvent.click(searchButton);
  });

  test('Testa o comportamento geral do component SearchBar', async () => {
    renderWithRouterAndContext(<App />, '/meals');
    const searchIcon = screen.getByRole('img', { name: /search icon/i });

    userEvent.click(searchIcon);
    const inputBar = screen.getByTestId(searchInput);
    userEvent.click(inputBar);
    userEvent.type(inputBar, 'Lentils');

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/corba/i));
    }, { timeout: 2000 });

    userEvent.click(searchIcon);
    const firstLetterButton = screen.getByTestId('first-letter-search-radio');

    userEvent.click(inputBar);
    userEvent.type(inputBar, 'P');
    userEvent.click(firstLetterButton);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/Burek/i));
    }, 3000);

    userEvent.click(searchIcon);
    const ingredientButton = screen.getByTestId(DTID_INGREDIENT_RADIO);

    userEvent.click(inputBar);
    userEvent.click(ingredientButton);
    userEvent.type(inputBar, 'Lentils');

    userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/corba/i));
    });
  });

  test('Testa se ao trocar as rotas entre meals e drinks a requisção é feita novamente para os novos recipes', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    const footerDrinksButton = screen.getByRole('img', { name: /drinks-icon/i });

    act(() => {
      userEvent.click(footerDrinksButton);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
      const ordinaryDrinkButton = screen.getByRole('button', { name: /ordinary drink/i });
      expect(ordinaryDrinkButton).toBeInTheDocument();
      expect(screen.queryAllByTestId(/-recipe-card/i)).toHaveLength(12);
    }, { timeout: 3000 });
  });

  test('Teste linha 29', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const footerDrinksButton = screen.getByRole('img', { name: /drinks-icon/i });

    act(() => {
      userEvent.click(footerDrinksButton);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(12);
    });

    const ordinaryDrinkButton = await screen.findByRole('button', { name: /cocoa/i });
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(12);

    userEvent.click(ordinaryDrinkButton);

    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(9);
    }, { timeout: 3000 });
  });

  test('Teste novo fetch', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });
    renderWithRouterAndContext(<App />, '/meals');

    const searchIcon = screen.getByRole('img', { name: /search icon/i });

    userEvent.click(searchIcon);
    const inputBar = screen.getByTestId(searchInput);
    userEvent.click(inputBar);

    act(() => {
      userEvent.type(inputBar, 'salmon');
      const searchButton = screen.getByTestId(execButton);
      userEvent.click(searchButton);
    });
    await waitFor(() => {
      expect(screen.queryAllByTestId(/-recipe-card/i)).toHaveLength(10);
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=salmon');
    });
  });

  test('Testa o comportamento geral do componente SearchBar com um único resultado', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    const { history } = renderWithRouterAndContext(<App />, '/meals');

    const searchIcon = await screen.findByRole('img', { name: /search icon/i });

    userEvent.click(searchIcon);
    const inputBar = screen.getByTestId(searchInput);
    userEvent.click(inputBar);
    userEvent.type(inputBar, 'penne rigate');

    const searchButton = screen.getByTestId(execButton);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    }, { timeout: 2000 });
  });
});

describe('Testa o disparo dos alerts', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Testa o disparo do alert ao usar os botões de filtro', async () => {
    renderWithRouterAndContext(<App />, '/meals');
    const searchIcon = screen.getByRole('img', { name: /search icon/i });

    act(() => {
      userEvent.click(searchIcon);
    });

    const inputBar = screen.getByTestId('search-input');
    userEvent.click(inputBar);
    userEvent.type(inputBar, 'Potato');

    const searchButton = screen.getByTestId(execButton);
    const firstLetterButton = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterButton);

    act(() => {
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(String('Your search must have only 1 (one) character'));
    }, { timeout: 3000 });

    userEvent.click(inputBar);
    userEvent.type(inputBar, 'yagdyagsd');
    const ingredientButton = screen.getByTestId(DTID_INGREDIENT_RADIO);
    userEvent.click(ingredientButton);

    act(() => {
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(String('Sorry, we haven\'t found any recipes for these filters.'));
    }, { timeout: 3000 });
  });
});

describe('Testa a condicional da função fetchRecipes para formatar o numero de recipes exibidos', () => {
  test('Testa entre 2 a 11 recipes', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealCategories),
      });
    renderWithRouterAndContext(<App />, '/meals');

    const searchIcon = screen.getByRole('img', { name: /search icon/i });

    userEvent.click(searchIcon);
    const inputBar = screen.getByTestId(searchInput);
    userEvent.click(inputBar);

    act(() => {
      userEvent.type(inputBar, 'egg');
      const searchButton = screen.getByTestId(execButton);
      userEvent.click(searchButton);
    });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=egg');
      const allRecipes = screen.queryAllByTestId(/-recipe-card/i);
      // console.log(allRecipes);
      expect(allRecipes).toHaveLength(12);
    });
  });
});
