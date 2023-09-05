// import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Category from '../Components/Category';
import FoodCard from '../Components/FoodCard';
import context from '../context/appContext';
import fetchDataRecipes from '../services/fetchRecipes';

const maxResults = 12;

function Recipes() {
  const { headerProperties, setHeaderProperties,
    searchResults, setSearchResults } = useContext(context);

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    setHeaderProperties({
      ...headerProperties,
      hasHeader: true,
      hasSearchIcon: true,
      title: pathname === '/meals' ? 'Meals' : 'Drinks',

    });
    // consome a API
    const getData = async () => {
      const type = pathname.replace('/', '');
      const data = await fetchDataRecipes(type, 'name', '');
      if (data && data.length > maxResults) {
        setSearchResults(data.slice(0, maxResults));
      } else {
        setSearchResults(data);
      }
    };

    getData();
  }, [pathname]);

  return (

    <div>
      {searchResults && <Category />}
      <div
        className="Recipes grid grid-cols-2
      place-items-center place mx-auto max-h-48 gap-y-3"
      >

        {searchResults
      && searchResults.map((result, index) => (
        <FoodCard
          key={ index }
          index={ index }
          result={ result }
        />))}
      </div>
    </div>

  );
}

// Recipes.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }),
// }.isRequired;

export default Recipes;
