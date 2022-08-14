import './App.css';
import * as React from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminPage } from './components/AdminPage';
import { AuthContextProvider } from "./contexts/auth";
import Header from './components/Header'
import Footer from './components/Footer'
import { MyProfile } from './components/MyProfile'

import Registration from './components/Registration';

function App() {
  return (
    <div>
       <AuthContextProvider>
      <Header></Header>
    <div className="wrapper">
     
        <Routes>
          <Route exact path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/registration" element={<Registration></Registration>}></Route>
          <Route path="/admin" element={<PrivateRoute></PrivateRoute>}>
            <Route exact path='/admin' element={<AdminPage/>}/>
          </Route>
          <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
        </Routes>
     
    </div>
    </AuthContextProvider>
    <Footer></Footer>
    </div>
  );
}

export default App;
