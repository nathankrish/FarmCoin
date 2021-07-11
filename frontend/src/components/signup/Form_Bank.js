import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = e => {
    const user = {
      name, city, country, address, district, postalCode, email, phoneNumber
    };
    
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