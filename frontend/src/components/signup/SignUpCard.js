import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SignUpPage from "./SignUpPage";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 100,
    marginLeft: 100
  },
  text: {
    marginBottom: 25
  }
});

export default function SignUpCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2" className = {classes.text}>
        Lender Signup
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className = {classes.text}>
          Please enter your billing information. Then connect to your bank account using Plaid.
        </Typography>
        <SignUpPage />
      </CardContent>
    </Card>
  );
}
