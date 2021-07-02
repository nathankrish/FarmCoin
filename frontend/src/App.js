import logo from './logo.svg';
import './App.css';
import Navbar from './components/navigation/topbar/topbar';
import { TemporaryDrawer } from './components/navigation/topbar/drawer';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <TemporaryDrawer></TemporaryDrawer>
    </React.Fragment>
  );
}

export default App;
