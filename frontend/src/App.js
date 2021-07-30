import logo from './logo.svg';
import './App.css';
import Navbar from './components/navigation/topbar/topbar';
import { TemporaryDrawer } from './components/navigation/topbar/drawer';
import React from 'react';
import LenderPage from './components/pages/LenderPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BorrowerPage from './components/pages/BorrowerPage';
import InfoPage from './components/pages/InfoPage';

function App() {
  return (
   
    <React.Fragment>
      <BrowserRouter>
        <Navbar></Navbar>
        <TemporaryDrawer></TemporaryDrawer>
             <Switch>
                <Route exact path="/lendMoney" component={LenderPage}/>
                <Route exact path="/borrowMoney" component={BorrowerPage}/>
                <Route path="/" component={InfoPage}/>
             </Switch>  
    </BrowserRouter>
  </React.Fragment>
  );
}

export default App;
