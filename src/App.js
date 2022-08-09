import './App.css';
import * as React from 'react';
import Login from './components/Login';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom';
import Ingredients from './components/Ingredients';
import AboutUs from './components/AboutUs'
import Recipes from './components/Recipes';

import Registration from './components/Registration';

function App() {
  return (
    <div>
    <div className="wrapper">
      
      <Routes>
        <Route exact path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/registration" element={<Registration></Registration>}></Route>
      </Routes>
    </div>
    </div>
  );
}

export default App;
