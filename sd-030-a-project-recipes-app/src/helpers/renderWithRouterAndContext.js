import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import AppProvider from '../context/AppProvider';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return {
    ...render(
      <AppProvider>
        <Router history={ history }>
          {component}
        </Router>
      </AppProvider>,
    ),
    history,
  };
};

export default renderWithRouterAndContext;
