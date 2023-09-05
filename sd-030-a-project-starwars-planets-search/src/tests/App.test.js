import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import App from '../App';
import testData from "../../cypress/mocks/testData";
import {act} from "react-dom/test-utils";
import GeneralProvider from "../context/GeneralProvider";
import userEvent from "@testing-library/user-event";
import {PLANET_NAME} from "../../cypress/utils/dataTestIds";

describe('', function () {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });

  it('verifica se api morreo ', async () => {
    global.fetch = jest.fn().mockRejectedValue({

    });
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    console.log(global.fetch)
    expect(global.fetch).toThrowError('Api failed kekw')
  });


  it('verifica se filtra a lista por texto ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    const inputValue = screen.getByRole('textbox');
    userEvent.type(inputValue, 'Tatooine')
    const planeName = screen.getByRole('cell', {
      name: /tatooine/i
    })
    const noPlanet = screen.queryByRole('cell', {
      name: /hoth/i
    })
    expect(planeName).toBeInTheDocument();
    expect(noPlanet).not.toBeInTheDocument();
  });

  it('verifica se api foi chamada uma vez ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

  });

  it('verifica os botoes da tela ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    const searchBar = screen.getByTestId('name-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const number = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');
    const removeAllFilters = screen.getByTestId('button-remove-filters');
    expect(searchBar).toBeDefined();
    expect(column).toBeDefined();
    expect(comparison).toBeDefined();
    expect(number).toBeDefined();
    expect(button).toBeDefined();
    expect(removeAllFilters).toBeDefined();
  });

  it('verifica se sem filtros mostra 10 planetas', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    expect(planetNames).toHaveLength(10);
  });

  it('verifica se com filtros default remove os unknown', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    act(() => userEvent.click(screen.getByTestId('button-filter')));
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    expect(planetNames).toHaveLength(8);
  });

  it('verifica se filtra por populacao maior que 300000', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '300000')
    act(() => userEvent.click(screen.getByTestId('button-filter')));
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    expect(planetNames).toHaveLength(6);
  });

  it('verifica se filtra por populacao menor que 300000', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '300000')
    act(() => userEvent.click(screen.getByTestId('button-filter')));
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    console.log(planetNames);
    expect(planetNames).toHaveLength(2);
  });

  it('verifica se filtra por populacao igual a 200000', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '200000')
    act(() => userEvent.click(screen.getByTestId('button-filter')));
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    expect(planetNames[0]).toBe('Tatooine');
  });

  it('verifica se apos filtrar mostra o filtro novo criado, e depois remove e verifica se foi removido ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '300000')
    act(() => userEvent.click(screen.getByTestId('button-filter')));
    await waitFor(() => {
      expect(screen.queryByText(/`population \-maior que \-300000`/i)).toBeInTheDocument()
    })
    const remove = screen.getByRole('button', {
      name: /remover filtragens/i
    })
    userEvent.click(remove);
    await waitFor(() => {
      expect(screen.queryByText(/`population \-maior que \-300000`/i)).not.toBeInTheDocument()
    })
  });

  it('verifica se api foi chamada uma vez ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '300000')
    act(() => userEvent.click(screen.getByTestId('button-filter')));
    await waitFor(() => {
      expect(screen.queryByText(/`population \-maior que \-300000`/i)).toBeInTheDocument()
    })

    const view = screen.getByText(/`population \-maior que \-300000`/i);

    const removeSingle = within(view).getByRole('button', {
      name: /x/i
    });
    userEvent.click(removeSingle);
    await waitFor(() => {
      expect(screen.queryByText(/`population \-maior que \-300000`/i)).not.toBeInTheDocument()
    })
  });

  it('verifica se filtra por ascendent o population ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
    const radioButton = screen.getByTestId('column-sort-input-asc');
    userEvent.click(radioButton);
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    console.log(planetNames);
    const planetSorted = [
      'Yavin IV', 'Tatooine',
      'Bespin',   'Endor',
      'Kamino',   'Alderaan',
      'Naboo',    'Coruscant',
      'Hoth',     'Dagobah'
    ];
    expect(planetNames).toEqual(planetSorted);
  });

  it('verifica se filtra por descendent o population ', async () => {
    await act(() => render(<GeneralProvider><App /></GeneralProvider>));
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
    const radioButton = screen.getByTestId('column-sort-input-desc');
    userEvent.click(radioButton);
    const planetNames = screen.getAllByTestId('planet-name').map((planeta) => planeta.textContent);
    console.log(planetNames);
    const planetSorted = [
      'Coruscant', 'Naboo',
      'Alderaan',  'Kamino',
      'Endor',     'Bespin',
      'Tatooine',  'Yavin IV',
      'Hoth',      'Dagobah'
    ]
    expect(planetNames).toEqual(planetSorted);
  });

});
