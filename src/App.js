import './App.css';
import * as React from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminPage } from './components/AdminPage';
import { AuthContextProvider } from "./contexts/auth";

import Registration from './components/Registration';

function App() {
  return (
    <div>
    <div className="wrapper">
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/registration" element={<Registration></Registration>}></Route>
          <Route path="/admin" element={<PrivateRoute></PrivateRoute>}>
          <Route exact path='/admin' element={<AdminPage/>}/>
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
    </div>
  );
}

export default App;
