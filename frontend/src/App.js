import logo from './logo.svg';
import './App.css';
import Navbar from './components/navigation/topbar/topbar';
import { TemporaryDrawer } from './components/navigation/topbar/drawer';
import React from 'react';
import {PlaidWidget} from './components/payments/plaidWidget';
import { Button } from '@material-ui/core';
import {ModalDialog} from './components/signup/ModalDialog';
import { useState } from 'react'
import SignUpCard from './components/signup/SignUpCard'
import LendingCard from './components/payments/lendingCard';
import { Grid, Row } from '@material-ui/core';

function App() {
    // declare a new state variable for modal open
    const [open, setOpen] = useState(false);
  
    // function to handle modal open
    const handleOpen = () => {
      setOpen(true);
    };
  
    // function to handle modal close
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <TemporaryDrawer></TemporaryDrawer>
      <Grid container direction="row">
        <Grid item xs = "4">
        <SignUpCard />    
        </Grid>
        <Grid item xs = "4">
        <LendingCard />    
        </Grid>
    </Grid>
        <ModalDialog open={open} handleClose={handleClose} />
    </React.Fragment>
  );
}

export default App;
