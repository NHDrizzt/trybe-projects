import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';

function SortFilter() {
  const {
    setSortSelectTagValue,
  } = useContext(GeneralContext);

  const [sortSelectOrder] = useState(['select', 'population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const onChangeSelectSort = ({ target }) => {
    const { name, value } = target;
    setSortSelectTagValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <select
        name="sortFilterColumn"
        data-testid="column-sort"
        onChange={ onChangeSelectSort }
      >
        {sortSelectOrder.map((ele, index) => (
          <option key={ index } value={ ele }>{ele}</option>
        ))}
      </select>
      <label htmlFor="">
        Ascendente
        <input
          name="typeOfSort"
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ onChangeSelectSort }
        />
      </label>
      <label htmlFor="">
        Descendente
        <input
          name="typeOfSort"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ onChangeSelectSort }
        />
      </label>
      <button data-testid="column-sort-button">Ordenar</button>
    </>

  );
}

export default SortFilter;
