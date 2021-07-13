import { useState } from 'react';
import Button from '@material-ui/core/Button';
import {ModalDialog} from './ModalDialog';
import { PlaidWidget } from '../payments/plaidWidget';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    marginBottom: 25
  }
});

const SignUpPage = (props) => {
  const classes = useStyles();
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
    <div className="SignUpPage">
      <Button className = {classes.button} variant="contained" color="primary" onClick={handleOpen}>
        <Typography>{props.title}</Typography>
      </Button>   
      <ModalDialog open={open} handleClose={handleClose} />
      <PlaidWidget disabled = {true}>
      </PlaidWidget>   
    </div>
  );
};

export default SignUpPage;