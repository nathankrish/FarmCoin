import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Toolbar, AppBar, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { TemporaryDrawer } from './drawer';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const setDrawerOpen = (boolean) => {
      setOpen(boolean);
  }

  return (
    <React.Fragment>
        <AppBar position="static">
        <Toolbar>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => {setDrawerOpen(true)}}>
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                FarmCoin
            </Typography>    
            <Button color="inherit">
                <AccountCircleIcon></AccountCircleIcon>
            </Button>
        </Toolbar>
        </AppBar>
        <TemporaryDrawer open = {open} setOpen = {setOpen}></TemporaryDrawer>
    </React.Fragment>
    
  );
};

export default Navbar;