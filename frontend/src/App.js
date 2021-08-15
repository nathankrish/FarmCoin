import logo from './logo.svg';
import './App.css';
import Navbar from './components/navigation/topbar/topbar';
import { TemporaryDrawer } from './components/navigation/topbar/drawer';
import React from 'react';
import LenderPage from './components/pages/LenderPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BorrowerPage from './components/pages/BorrowerPage';
import InfoPage from './components/pages/InfoPage';
import Login from './components/signin/login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useState, useEffect } from 'react';
import { asyncLocalStorage } from './components/signin/asyncLocalStorage';


function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await asyncLocalStorage.getItem("token");
      if (token) setAuth(true);
    };
    getToken();
  }, []);

  return (
      <BrowserRouter>
        <Navbar></Navbar>
        <TemporaryDrawer></TemporaryDrawer>
             <Switch>
                <ProtectedRoute exact path="/lendMoney"  redirectTo = "/login" isLoggedIn={auth}> 
                  <LenderPage/>
                </ProtectedRoute>
                <ProtectedRoute exact path="/borrowMoney" redirectTo = "/login" isLoggedIn={auth}>
                   <BorrowerPage />
                  </ProtectedRoute>
                <ProtectedRoute exact path="/" redirectTo = "/login" isLoggedIn={auth}>
                    <InfoPage />
                  </ProtectedRoute>
                <Route exact path = "/login">
                  <Login setAuth={setAuth} auth = {auth}></Login>
                </Route>
             </Switch>  
      </BrowserRouter>
  );
}

export default App;
