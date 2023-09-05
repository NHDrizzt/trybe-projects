import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import context from '../context/appContext';
import SearchBar from './SearchBar';
import iconeRecipe from '../assets/iconeRecipe.png';
import searchIcon from '../assets/searchIcon.png';
import profileIcon from '../assets/icone-perfil.png';
import mealIcons from '../assets/icone-prato.png';
import drinkIcon from '../assets/drink.png';
import profiles from '../assets/Perfil.png';

function Header() {
  const location = useLocation();
  const [currentIcon, setCurrentIcon] = useState(mealIcons);

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/meals') {
      setCurrentIcon(mealIcons);
    } else if (location.pathname === '/drinks') {
      setCurrentIcon(drinkIcon);
    } else if (location.pathname === '/profile') {
      setCurrentIcon(profiles);
    }
  }, [location]);

  const {
    setHeaderProperties,
    headerProperties,
  } = useContext(context);

  const {
    title,
    hasSearchIcon,
    showSearchInput,
  } = headerProperties;

  const handleClick = () => {
    setHeaderProperties({
      ...headerProperties,
      showSearchInput: !showSearchInput,
    });
  };

  return (
    <>
      <div
        className="flex
      items-center px-2 bg-yellowClean"
        data-testid="header-content"
      >
        <div className="flex gap-x-6 items-center justify-center">
          <img className="ml-5" src={ iconeRecipe } alt="" />
          <p
            className="font-epilogue
         text-purple text-center italic tracking-widests font-medium mt-3"
          >
            RECIPES
            <span className="font-bold pl-1">app</span>
          </p>
        </div>

        <div className="flex gap-x-3 ml-auto mr-2">
          {
            hasSearchIcon && (
              <button
                onClick={ handleClick }
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="Search Icon"
                />
              </button>
            )
          }
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </Link>
        </div>

      </div>
      <div className="flex flex-col items-center w-80 mt-12 gap-y-3 mx-auto">
        <img className="w-12" src={ currentIcon } alt="" />
        <h1
          className="text-purple
           uppercase
           font-xl
           font-bold font-epilogue tracking-widestss text-center"
          data-testid="page-title"
        >
          {title}
        </h1>
        <div>
          {
            showSearchInput && (<SearchBar />)
          }
        </div>
      </div>

    </>

  );
}

export default Header;
