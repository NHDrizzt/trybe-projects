import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import context from '../context/appContext';
import fechDataRecipes from '../services/fetchRecipes';

const maxResults = 12;

function SearchBar() {
  const { setSearchResults, headerProperties } = useContext(context);
  const history = useHistory();
  const [option, setOptions] = useState('ingredient');
  const [input, setInput] = useState('');

  const handleClick = async () => {
    if (option === 'firstLetter' && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const type = headerProperties.title.toLowerCase();
    const data = await fechDataRecipes(type, option, input);

    if (!data) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (data.length > maxResults) {
      setSearchResults(data.slice(0, maxResults));
    } else {
      setSearchResults(data);
    }

    if (data.length === 1) {
      const { idDrink, idMeal } = data[0];
      history.push(`/${type}/${idMeal || idDrink}`);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setInput(value);
  };

  return (
    <div className="flex flex-col w-80 mb-3">
      <div className="">
        <input
          className="w-full
          border-2 rounded-md p-2 placeholder:px-3
           focus:outline-none"
          data-testid="search-input"
          name="input"
          type="text"
          value={ input }
          placeholder="Search"
          onChange={ handleInputChange }
        />
      </div>
      <div
        className="flex flex-col
      items-center gap-x-2 bg-purple text-white
      rounded-b-lg py-2"
      >
        <div className="flex space-x-2 justify-between w-52 gap-x-2 text-[9px] ">
          <label className="">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              onChange={ () => setOptions('ingredient') }
              checked={ option === 'ingredient' }
            />
            { ' ' }
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              name="name"
              data-testid="name-search-radio"
              onChange={ () => setOptions('name') }
              checked={ option === 'name' }
            />
            { ' ' }
            Name
          </label>
          <label>
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              onChange={ () => setOptions('firstLetter') }
              checked={ option === 'firstLetter' }
            />
            { ' ' }
            First Letter
          </label>
        </div>
        <div className="w-52">
          <button
            className={ `w-full mt-2 py-0.5 bg-yellowNew
            rounded-md text-white font-epilogue
            font-bold tracking-wide ` }
            type="button"
            data-testid="exec-search-btn"
            disabled={ !input }
            onClick={ handleClick }
          >
            Search
          </button>
        </div>
      </div>

    </div>
  );
}

export default SearchBar;
