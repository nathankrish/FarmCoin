import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import { Link } from 'react-router-dom';
import SignUpPage from '../../signup/SignUpPage';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const TemporaryDrawer = (props) => {
    const classes = useStyles();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setOpen(open);
  };
  const ListItemComponent  =  () => {
    return <Link to = "./GitHub/FarmCoin/frontend/src/components/singup/SignUpPage"></Link>
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button key={"Sign Up"}>
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText primary={"Signup Page"} />
          </ListItem>
          <ListItem button key={"Lend Money"}>
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText primary={"Lend Money"} />
          </ListItem>
          <ListItem button key={"Request Loan"}>
            <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
            <ListItemText primary={"Request Loan"} />
          </ListItem>
          <ListItem button key={"Repay Loan"}>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary={"Repay Loan"} />
          </ListItem>
          
         
      </List>
    </div>
  );

  return (
    <div>
          <Drawer anchor={'left'} open={props.open} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
    </div>
  );
}

export {TemporaryDrawer}