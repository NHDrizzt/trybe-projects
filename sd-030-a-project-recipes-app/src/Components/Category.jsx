import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/appContext';
import fetchDataRecipes from '../services/fetchRecipes';
import AllIcon from '../assets/All.png';
import Beef from '../assets/beef.png';
import Goat from '../assets/goat.png';
import Chicken from '../assets/chicken.png';
import Breakfest from '../assets/breakfast.png';
import Dessert from '../assets/dessert.png';

const maxLength = 5;
const maxResults = 12;
const images = [Beef, Breakfest, Chicken, Dessert, Goat];

export default function Category() {
  // Hooks
  const [categories, setCategories] = useState(null);
  const [valueButton, setValueButton] = useState('');

  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.replace('/', '');
  const { setSearchResults } = useContext(context);

  useEffect(() => {
    const getData = async () => {
      let data = await fetchDataRecipes(type, 'category', '');
      if (data.length > maxLength) {
        data = data.slice(0, maxLength);
      }
      setCategories(data);
    };
    getData();
  }, [pathname]);

  const handleClick = async ({ target }) => {
    setValueButton(target.alt);
    if (target.alt === 'all' || target.alt === valueButton) {
      const data = await fetchDataRecipes(type, 'name', '');
      if (data && data.length > maxResults) {
        setSearchResults(data.slice(0, maxResults));
      } else {
        setSearchResults(data);
      }
    } else {
      const data = await fetchDataRecipes(type, 'filter', target.alt);
      if (data && data.length > maxResults) {
        setSearchResults(data.slice(0, maxResults));
      } else {
        setSearchResults(data);
      }
    }
  };

  return (
    <div className="flex gap-x-3 mx-auto w-80 mb-4">
      <button
        value="all"
        onClick={ handleClick }
        data-testid="All-category-filter"
      >
        <img src={ AllIcon } alt="all" />
      </button>

      {categories
      && categories.map(({ strCategory }, index) => (
        <button
          value={ strCategory }
          onClick={ handleClick }
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
        >
          <img src={ images[index] } alt={ strCategory } />
        </button>
      ))}
    </div>
  );
}
