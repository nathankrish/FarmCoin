import logo from './logo.svg';
import './App.css';
import Navbar from './components/navigation/topbar/topbar';
import { TemporaryDrawer } from './components/navigation/topbar/drawer';
import React from 'react';
import {PlaidWidget} from './components/payments/plaidWidget';
import { Button } from '@material-ui/core';

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <PlaidWidget>
      </PlaidWidget>
      <TemporaryDrawer></TemporaryDrawer>
    </React.Fragment>
  );
}

export default App;
