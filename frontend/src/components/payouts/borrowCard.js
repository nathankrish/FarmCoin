import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField, DateField } from "@material-ui/core";
import { useState } from "react";
import axios from 'axios';
import { backendLink } from "../../globalvars";
import { Button, Input } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 100,
    marginLeft: 50
  },
  text: {
    marginBottom: 25
  }
});

export default function BorrowCard() {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [repayDate, setRepayDate] = useState('');
  const handleSubmit = e => {
    axios.post(backendLink + '/createPayment', {
        amount
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2" className = {classes.text}>
        Borrow Money
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className = {classes.text}>
            Please enter the dtails of your loan request
        </Typography>
        <form onSubmit = {handleSubmit}>
            <TextField className = {classes.text}
            label="Amount to Borrow"
            variant="filled"
            required
            value={amount}
            onChange={e => setAmount(e.target.value)}
            />
            <Input className = {classes.text}
            type = "date"
            label="Repayment Date"
            variant="filled"
            required
            value={repayDate}
            onChange={e => setRepayDate(e.target.value)}
            />
            <Button variant="contained"  color="primary" type = "submit">
            Borrow Money
            </Button>
        </form>
      </CardContent>
      
    </Card>
  );
}
