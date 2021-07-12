import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import axios from 'axios';
import { backendLink } from "../../globalvars";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 100,
  },
  text: {
    marginBottom: 25
  }
});

export default function LendingCard() {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const handleSubmit = e => {
    axios.post(backendLink + '/createPayment', {
        amount
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2" className = {classes.text}>
        Lend Money
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className = {classes.text}>
            Please enter the amount you want to contribute to the pool
        </Typography>
        <form onSubmit = {handleSubmit}>
            <TextField className = {classes.text}
            label="Amount to Lend"
            variant="filled"
            required
            value={amount}
            onChange={e => setAmount(e.target.value)}
            />
            <Button variant="contained"  color="primary" type = "submit">
            Lend Money
            </Button>
        </form>
      </CardContent>
      
    </Card>
  );
}
