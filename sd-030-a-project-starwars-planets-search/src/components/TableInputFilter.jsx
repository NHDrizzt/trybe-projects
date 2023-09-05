import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

function TableInputFilter() {
  const { inputField, setInputField } = useContext(GeneralContext);

  const handleFilterChange = (e) => {
    setInputField(e.target.value);
  };

  return (
    <div>
      <label htmlFor="">
        StarWars
        <input
          data-testid="name-filter"
          type="text"
          name="input-filter"
          value={ inputField }
          onChange={ handleFilterChange }
        />
      </label>

    </div>
  );
}

export default TableInputFilter;
