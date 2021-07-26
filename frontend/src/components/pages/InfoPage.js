import { Grid, Row, Card, Typography, CardContent } from '@material-ui/core';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

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

export default function InfoPage() {
    const classes = useStyles();
    return (
        <React.Fragment>
          <Grid container direction="row">
            <Grid item xs = "4">
            <Card className={classes.root}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className = {classes.text}>
                    About Us
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p" className = {classes.text}>
                        FarmCoin is a decentralized platform for microloans. Our goal is to enable small businesses and individuals in emerging countries
                        to access loans. Check out the links on the sidebar to see how our app works!
                    </Typography>
                </CardContent>    
            </Card>

            </Grid>
        </Grid>        
        </React.Fragment>
    );    
}