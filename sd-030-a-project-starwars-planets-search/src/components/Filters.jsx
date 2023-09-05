import React, { useContext, useState } from 'react';
import SelectTag from './SelectTag';
import { GeneralContext } from '../context/GeneralContext';
import SortFilter from './SortFilter';

function Filters() {
  const {
    allSelectedTagValues,
    setAllSelectedTagValues,
  } = useContext(GeneralContext);

  const [columnSelect, setColumnSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [selectTagValues, setSelectTagValues] = useState({
    column: 'population',
    comparison: 'maior que',
    valueFilter: '0',
  });
  const [comparisonSelect] = useState(['maior que',
    'menor que', 'igual a']);

  const handleRemoveTagSelected = (filter) => {
    const newAllTags = allSelectedTagValues.filter((ele) => ele.column !== filter.column);
    setAllSelectedTagValues(newAllTags);
    setColumnSelect((prev) => [
      ...prev,
      filter.column,
    ]);
  };

  const handleSelectTagsFilter = () => {
    const { column, comparison, valueFilter } = selectTagValues;
    const newSelectedTagValues = {
      column,
      comparison,
      valueFilter,
    };
    const newColumnSelect = columnSelect.filter((tr) => tr !== column);
    setAllSelectedTagValues((prevSelectedTagValues) => [
      ...prevSelectedTagValues,
      newSelectedTagValues,
    ]);
    setColumnSelect(newColumnSelect);
  };

  const onChangeSelectTags = (event) => {
    const { target: { name, value } } = event;
    setSelectTagValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <SelectTag
        name="column"
        testId="column-filter"
        typeArray={ columnSelect }
        onChangeSelect={ onChangeSelectTags }
      />
      <SelectTag
        name="comparison"
        testId="comparison-filter"
        typeArray={ comparisonSelect }
        onChangeSelect={ onChangeSelectTags }
      />
      <label htmlFor="valueFilter">
        <input
          name="valueFilter"
          id="valueFilter"
          type="number"
          data-testid="value-filter"
          value={ selectTagValues.valueFilter }
          onChange={ onChangeSelectTags }
        />
      </label>
      <button
        onClick={ () => handleSelectTagsFilter() }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          setAllSelectedTagValues([]);
          setColumnSelect(['population',
            'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
        } }
      >
        Remover Filtragens
      </button>
      <SortFilter />
      {
        allSelectedTagValues.map((filter) => (
          <div data-testid="filter" key={ filter.column }>
            `
            {filter.column}
            {' '}
            -
            {filter.comparison}
            {' '}
            -
            {filter.valueFilter}
            `
            {' '}
            <button
              onClick={ () => handleRemoveTagSelected(filter) }
            >
              X
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default Filters;
