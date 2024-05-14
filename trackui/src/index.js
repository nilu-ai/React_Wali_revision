import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/header.js';
import Map from './Components/map.js';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Authadmin from './Components/auth.js';
import User from './Components/User.js';
import Deliver from './Components/Deliver.js';
const route=createBrowserRouter([{
 path:"",
 element:<App/>,
children:[{
  path:"/send_location",
  element:<Authadmin><Map/></Authadmin>
 },
 {
  path:"/user",
  element:<Authadmin><User/></Authadmin>
 },
 ,
{
  path:"/Deliver",
  element:<Authadmin><Deliver/></Authadmin>
 },
]
  },
  {
    path:"/auth",
    element:<Authadmin><Header/></Authadmin>
   },
   ,
 
   
]);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
