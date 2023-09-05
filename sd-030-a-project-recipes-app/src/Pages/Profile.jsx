// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import context from '../context/appContext';

import FAV_ICON from '../assets/Pages/Profile/yellow-favorite-icon.svg';
import DONE_ICON from '../assets/Pages/Profile/yellow-done-icon.svg';
import LOGOUT_ICON from '../assets/Pages/Profile/yellow-logout-icon.svg';

function Profile() {
  const history = useHistory();
  // const usrObj = JSON.parse(localStorage.getItem('user'));
  const { headerProperties, setHeaderProperties } = useContext(context);
  const { title } = headerProperties;

  useEffect(() => {
    if (title !== 'Profile') {
      setHeaderProperties({
        ...headerProperties,
        hasHeader: true,
        hasSearchIcon: false,
        title: 'Profile',
      });
    }
  });

  const getEmail = () => {
    const result = JSON.parse(localStorage.getItem('user'));
    if (result) { return result.email; }
    return 'test@test.com';
  };

  return (
    <div className="w-72 mx-auto">
      <h3
        data-testid="profile-email"
        className="text-center mb-12"
      >
        {getEmail()}
      </h3>

      <div className="pl-5 border-b-2 pb-3 mb-4">
        <button
          src={ DONE_ICON }
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="flex items-center gap-x-2"
        >
          <img src={ DONE_ICON } alt="Done recipes icon" />
          Done Recipes
        </button>
      </div>
      <div className="pl-5 border-b-2 pb-3 mb-4">
        <div className="">
          <button
            src={ FAV_ICON }
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            className="flex items-center gap-x-2"
          >
            <img src={ FAV_ICON } alt="Favorite recipes icon" />
            Favorite Recipes
          </button>
        </div>
      </div>

      <div className="pl-5 pb-3">
        <button
          src={ LOGOUT_ICON }
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          className="flex items-center gap-x-2"
        >
          <img src={ LOGOUT_ICON } alt="Log out icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
