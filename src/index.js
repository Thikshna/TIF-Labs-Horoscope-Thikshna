import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";   
import "primeicons/primeicons.css";
import { Provider } from 'react-redux';
import { myStore } from './Redux/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={myStore}>
      <App />
   </Provider>
);

