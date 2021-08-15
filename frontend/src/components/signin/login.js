import React from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,} from "@material-ui/core";
import axios from 'axios';
import { backendLink } from '../../globalvars';
import { makeStyles } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { asyncLocalStorage } from "./asyncLocalStorage";


const useStyles = theme => ({
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
  });

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password:"", authflag:1};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ email: event.state.email, password: event.state.password});
    }
    async handleSubmit(event) {
        event.preventDefault();
        let user = {email: this.state.email, password: this.state.password};
        try {
          let res = await axios.post(backendLink + '/auth/login', {user});
          let token = res.data.token;
          await asyncLocalStorage.setItem(
            "token",
          token);
          window.location.href="/";   
        } catch (err) {
          console.log(err);
        }
    }
    render() {
      if (this.props.auth) {
        return <Redirect to="/"/>
      } else {
      const { classes } = this.props;
        return (
            <div className={classes.root}>
            <AppBar position="static" alignitems="center" color="primary">
            {/* <Toolbar>
            <Grid container justify="center" wrap="wrap">
            <Grid item>
            <Typography variant="h6"></Typography>
            </Grid>
            </Grid>
            </Toolbar> */}
            </AppBar>
            <Grid container spacing={0} justify="center" direction="row">
            <Grid item>
            <Grid container direction="column" justify="center" spacing={2} className="login-form">
            <Paper variant="elevation" elevation={2} className="login-background">
            <Grid item>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            </Grid>
            <Grid item>
            <form onSubmit={this.handleSubmit}>
            <Grid container direction="column" spacing={2}>
            <Grid item>
            <TextField
            type="email"
            placeholder="Email"
            fullWidth
            name="email"
            variant="outlined"
            value={this.state.email}
            onChange={(event) => this.setState({[event.target.name]: event.target.value,})
            }
            required
            autoFocus
            />
            </Grid>
            <Grid item>
            <TextField
            type="password"
            placeholder="Password"
            fullWidth
            name="password"
            variant="outlined"
            value={this.state.password}
            onChange={(event) =>
            this.setState({
            [event.target.name]: event.target.value,
            })
            }
            required
            />
            </Grid>
            <Grid item>
            <Button
            variant="contained"
            color="primary"
            type="submit"
            className="button-block"
            onSubmit = {this.handleSubmit}
            >
            Submit
            </Button>
            </Grid>
            </Grid>
            </form>
            </Grid>
            <Grid item>
            <Link href="#" variant="body2">
            Forgot Password?
            </Link>
            </Grid>
            </Paper>
            </Grid>
            </Grid>
            </Grid>
            </div>
            );
          }
      }
    }
export default withStyles(useStyles, { withTheme: true })(Login);