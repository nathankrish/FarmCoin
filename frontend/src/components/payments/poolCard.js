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

export default function PoolCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2" className = {classes.text}>
          View Wallet
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className = {classes.text}>
            Click on the link to view the destination wallet on the Ethereum Ropsten testnet. This is where lended money converted into USDC is deposited. Transactions take several minutes to clear
        </Typography>
            <Button variant="contained"  color="primary" type = "submit" href="https://ropsten.etherscan.io/token/0x07865c6e87b9f70255377e024ace6630c1eaa37f?a=0x6f004cf8b555ce49e2dff3d4d16e0145b9d4d841">
                View Wallet
            </Button>
      </CardContent>
      
    </Card>
  );
}
