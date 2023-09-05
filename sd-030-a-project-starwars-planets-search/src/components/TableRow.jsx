import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

function TableRow() {
  const {
    planets,
    inputField,
    allSelectedTagValues,
    sortSelectTagValue,
  } = useContext(GeneralContext);

  const filterPlanets = (planet) => {
    const planetName = planet.name.toLowerCase();
    const isNameMatch = planetName.includes(inputField.toLowerCase());
    const isDataMatch = allSelectedTagValues.every((filter) => {
      const { column, comparison, valueFilter } = filter;
      const planetValue = Number(planet[column]) || planet[column].toUpperCase();
      switch (comparison) {
      case 'maior que':
        return planetValue > Number(valueFilter);
      case 'menor que':
        return planetValue < Number(valueFilter);
      case 'igual a':
        return String(planetValue) === valueFilter.toUpperCase();
      default:
        return true;
      }
    });

    return isNameMatch && isDataMatch;
  };

  const sortFilterArray = (planetA, planetB) => {
    const { sortFilterColumn, typeOfSort } = sortSelectTagValue;
    const columnValueA = planetA[sortFilterColumn];
    const columnValueB = planetB[sortFilterColumn];
    const MAGIC = -1;
    if (typeOfSort === 'ASC') {
      if (columnValueA === 'unknown') return 1;
      if (columnValueB === 'unknown') return MAGIC;
      return columnValueA - columnValueB;
    } if (typeOfSort === 'DESC') {
      if (columnValueA === 'unknown') return 1;
      if (columnValueB === 'unknown') return MAGIC;
      return columnValueB - columnValueA;
    }
    return 0;
  };

  return (
    <>
      {planets
        .filter(filterPlanets)
        .sort(sortFilterArray)
        .map((planet, index) => (
          <tr key={ index }>
            {Object.values(planet).map((element, i) => (
              <td key={ i } data-testid={ i === 0 ? 'planet-name' : undefined }>
                {element}
              </td>))}
          </tr>
        ))}
    </>
  );
}

export default TableRow;
