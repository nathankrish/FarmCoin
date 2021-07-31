import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { backendLink } from '../../globalvars';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const signInPage = ({ handleClose }) => {
        const classes = useStyles();
        // create state variables for each input
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const SubmitAlert = props => {
            let { submitStatus } = props;
        
            switch (submitStatus) {
                case 'password':
                    return <Alert onClose={handleAlertClose} severity="error">Password is incorrect!</Alert>;
                    break;
                case 'email':
                    return <Alert onClose={handleAlertClose} severity="error">Email/Password is incorrect!</Alert>;
                    break;
                case 'success':
                    return <Alert onClose={handleAlertClose} severity="success">Sign In!</Alert>;
                    break;
                default:
                    return null;
            }
        };
        
        const handleAlertClose = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }
        
            setAlertOpen(false);
        };

        const handleSubmit = e => {
            const user = {
                email, password
            };
            let submitResponse = axios.post(backendLink + '/auth/login', {user});
            if(submitResponse.errors.email === 'is required' || submitResponse.errors.password === 'is required'){
                setSubmitStatus('email');
                setAlertOpen(true);
                e.preventDefault();    
            }
            else{
                setSubmitStatus('success');
                setAlertOpen(true);
                e.preventDefault();
                setTimeout(handleClose, 1000);
                //go to new page
            }
        };

        return (
            <React.Fragment>
            <form className={classes.root} onSubmit={handleSubmit}>
            Billing Details
            <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <Button variant="contained" onClick={handleClose}>
                Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Signup
                </Button>
            </div>
            </form>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
            <SubmitAlert submitStatus = {submitStatus}></SubmitAlert>
            </Snackbar>
            </React.Fragment>
        );
};