import React from 'react';
import PropTypes from 'prop-types';

function LoginCard({ onInputChange, input }) {
  return (
    <fieldset>
      <legend
        className="font-epilogue
         text-purple text-center italic tracking-widests font-medium"
      >
        LOGIN
      </legend>
      <label htmlFor="email">
        <input
          className="placeholder:font-epilogue
            placeholder:text-purple border-2 border-purple rounded-md py-2 px-4"
          data-testid="email-input"
          type="email"
          id="email"
          name="email"
          value={ input.email }
          onChange={ onInputChange }
          placeholder="Email "
        />
      </label>

      <label htmlFor="pwd">
        <input
          className="placeholder:font-epilogue
             placeholder:text-purple border-2 border-purple rounded-md py-2 px-4 mt-2"
          data-testid="password-input"
          type="password"
          id="pwd"
          name="pwd"
          value={ input.pwd }
          onChange={ onInputChange }
          placeholder="Password "
        />
      </label>
    </fieldset>
  );
}

LoginCard.propTypes = {
  onInputChange: PropTypes.func,
  input: PropTypes.shape({
    email: PropTypes.string,
    pwd: PropTypes.string,
  }),
}.isRequired;

export default LoginCard;
