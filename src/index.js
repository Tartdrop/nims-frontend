import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
//import { render } from '@testing-library/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};
renderApp();

reportWebVitals();