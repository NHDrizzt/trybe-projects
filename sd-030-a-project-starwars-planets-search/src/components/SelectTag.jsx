import React from 'react';
import PropTypes from 'prop-types';

function SelectTag({ name, testId, typeArray, onChangeSelect }) {
  return (
    <select name={ name } data-testid={ testId } onChange={ onChangeSelect }>
      {typeArray.map((ele, index) => (
        <option key={ index } value={ ele }>{ele}</option>
      ))}
    </select>
  );
}

SelectTag.propTypes = {
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  typeArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeSelect: PropTypes.func.isRequired,
};

export default SelectTag;
