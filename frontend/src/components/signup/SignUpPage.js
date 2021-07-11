import { useState } from 'react';
import Button from '@material-ui/core/Button';
import {ModalDialog} from './ModalDialog';

const SignUpPage = () => {
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Lender Signup
      </Button>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Borrower Signup
      </Button>
      
      <ModalDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default SignUpPage;