import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import tomatoImg from '../assets/tomate.png';
import logoRecipe from '../assets/logo.png';
import LoginCard from '../Components/LoginCard';

function Login() {
  const history = useHistory();
  console.log('hi');
  const [input, setInput] = useState({
    email: '',
    pwd: '',
  });
  const emailMask = (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
  const PWD_LENGTH_MAGIC_NUMBER_HANDLER = 6;

  const onInputChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
  };

  const rInputsFilled = (
    (emailMask.test(input.email))
    && input.pwd.length > PWD_LENGTH_MAGIC_NUMBER_HANDLER
  );

  const onEntryBtn = () => {
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email: input.email }));
  };

  return (
    <div>
      <div className="w-full bg-purple h-50vh" />

      <div className="mt-20">
        <img className="absolute top-14 left-16" src={ logoRecipe } alt="" />
        <img className="absolute max-w-sm w-full top-1/4" src={ tomatoImg } alt="" />
        <div className="flex flex-col mx-auto justify-end w-64">
          <LoginCard onInputChange={ onInputChange } input={ input } />
          <button
            className={ `mt-2 py-2 bg-yellowNew
            rounded-md text-white font-epilogue
            font-bold tracking-wide ${!rInputsFilled ? 'opacity-50' : 'opacity-100'}` }
            data-testid="login-submit-btn"
            type="button"
            disabled={ !rInputsFilled }
            onClick={ onEntryBtn }
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
