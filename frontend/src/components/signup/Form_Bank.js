import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

const Form_Bank = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [name, setName] = useState('Bob Smith');
  const [city, setCity] = useState('Boston');
  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState('100 Money Street');
  const [district, setDistrict] = useState('MA');
  const [postalCode, setPostalCode] = useState('01234');
  const [email, setEmail] = useState('bobsmith@fakemail.com');
  const [phoneNumber, setPhoneNumber] = useState('+1-123-456-7890');

  const handleSubmit = e => {
    const user = {
      name, city, country, address, district, postalCode, email, phoneNumber
    };
    axios.post(backendLink + '/testMockAcct');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      Billing Details
      <TextField
        label="Name"
        variant="filled"
        type="name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="City"
        variant="filled"
        type="city"
        required
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <TextField
        label="Country"
        variant="filled"
        type="country"
        required
        value={country}
        onChange={e => setCountry(e.target.value)}
      />
      <TextField
        label="Address"
        variant="filled"
        type="address"
        required
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <TextField
        label="District"
        variant="filled"
        type="district"
        required
        value={district}
        onChange={e => setDistrict(e.target.value)}
      />
      <TextField
        label="Postal Code"
        variant="filled"
        type="postalCode"
        required
        value={postalCode}
        onChange={e => setPostalCode(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="filled"
        type="phoneNumber"
        required
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
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
  );
};

export default Form_Bank;