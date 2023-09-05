import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GeneralProvider from './context/GeneralProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <GeneralProvider>
      <App />
    </GeneralProvider>,
  );
