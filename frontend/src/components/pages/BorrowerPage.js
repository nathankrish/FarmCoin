import {ModalDialog} from '../signup/ModalDialog';
import { useState } from 'react'
import SignUpCard from '../signup/SignUpCard'
import LendingCard from '../payments/lendingCard';
import { Grid, Row } from '@material-ui/core';
import PoolCard from '../payments/poolCard';
import BorrowCard from '../payouts/borrowCard';
import SquareWidget from '../payouts/SquareWidget';
import React from 'react';

export default function BorrowerPage() {
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
      <Grid container direction="row">
        <Grid item xs = "4">
        <SignUpCard title = {"Borrower Signup"}/>    
        </Grid>
        <Grid item xs = "4">
        <SquareWidget />    
        </Grid>
        <Grid item xs = "4">
            <BorrowCard></BorrowCard>
        </Grid>
        </Grid>        
        <ModalDialog open={open} handleClose={handleClose} />
    </React.Fragment>
  );
}