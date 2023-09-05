import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import { localStorageMock } from '../utils/LocalStorageMock';

const DONE_RECIPE = 'done-recipes';
const FILTER_BY_DRINK = 'filter-by-drink-btn';

// const doneRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('', () => {
  // beforeEach(() => {
  //   localStorageMock.setItem('doneRecipes', doneRecipes);
  // });

  it('should have filter buttons', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const all = screen.getByTestId('filter-by-all-btn');
    expect(all).toBeInTheDocument();
    const meal = screen.getByTestId('filter-by-meal-btn');
    expect(meal).toBeInTheDocument();
    const drink = screen.getByTestId(FILTER_BY_DRINK);
    expect(drink).toBeInTheDocument();
  });

  it('should load card recipes content ', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const img1 = screen.getByTestId('0-horizontal-image');
    const img2 = screen.getByTestId('1-horizontal-image');
    expect(img1).toBeInTheDocument();
    expect(img1.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(img2).toBeInTheDocument();
    expect(img2.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const title1 = screen.getByTestId('0-horizontal-name').textContent;
    expect(title1).toBe('Spicy Arrabiata Penne');
    const title2 = screen.getByTestId('1-horizontal-name').textContent;
    expect(title2).toBe('Aquamarine');
    const tag1 = screen.getByTestId('0-Pasta-horizontal-tag').textContent;
    const tag2 = screen.getByTestId('0-Curry-horizontal-tag').textContent;
    expect(tag1).toBe('Pasta');
    expect(tag2).toBe('Curry');
  });

  it('should filter by meals ', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const meal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(meal);
    const title = screen.queryByText(/aquamarine/i);
    expect(title).not.toBeInTheDocument();
  });
  it('should filter by drinks ', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const drink = screen.getByTestId(FILTER_BY_DRINK);
    userEvent.click(drink);
    const title = screen.queryByText(/spicy arrabiata penne/i);
    expect(title).not.toBeInTheDocument();
  });
  it('should filter by all ', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const drink = screen.getByTestId(FILTER_BY_DRINK);
    userEvent.click(drink);
    const title1 = screen.queryByText(/spicy arrabiata penne/i);
    expect(title1).not.toBeInTheDocument();
    const all = screen.getByTestId('filter-by-all-btn');
    userEvent.click(all);
    const titletest = screen.getByText(/spicy arrabiata penne/i);
    const title2 = screen.getByText(/aquamarine/i);
    expect(title2).toBeInTheDocument();
    expect(titletest).toBeInTheDocument();
  });

  it('should have link copied shown on the screen when the user clicks on share', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    navigator.clipboard.writeText.mockResolvedValue('http://localhost:3000/meals/52771');
    const shareButton1 = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton1.textContent).toBe('Share');
    userEvent.click(shareButton1);
    expect(shareButton1.textContent).toBe('Link copied!');
  });
  it('should redirect to recipe details when clicked on the image', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const img = screen.getByTestId('0-horizontal-image');
    userEvent.click(img);
    expect(history.location.pathname).toBe('/meals/52771');
  });
  it('should redirect to recipe details when clicked on the title', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(DONE_RECIPE);
    });
    const title = screen.getByTestId('0-horizontal-name');
    console.log(title.textContent);
    userEvent.click(title);
    screen.debug();
    expect(history.location.pathname).toBe('/meals/52771');
  });
});
