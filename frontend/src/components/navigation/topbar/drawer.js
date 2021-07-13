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
import { Home } from '@material-ui/icons';
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

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button key={"About Us"} component={Link} to="/">
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText primary={"About Us"} />
          </ListItem>

          <ListItem button key={"Lender Page"} component={Link} to="/lendMoney">
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText primary={"Lend Money"} />
          </ListItem>
          <ListItem button key={"Borrower Page"} component={Link} to="/borrowMoney">
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary={"Borrow Money"} />
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