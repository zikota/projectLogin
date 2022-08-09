import './App.css';
import * as React from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';

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
