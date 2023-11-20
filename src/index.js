import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import Forum from './Forum';
import Header from './Header';
import Requests from './Requests';
import reportWebVitals from './reportWebVitals';
import BLAdmin from './BLAdmin';
import BLUser from './BLUser';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Forum/> */}
    {/* <Home/> */}
    {/* <Header/> */}
    {/* <Requests/> */}
    {/* <BLAdmin/> */}
    <BLUser/>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
