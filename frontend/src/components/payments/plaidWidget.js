import React, { useCallback, useState } from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess
} from "react-plaid-link";
import { backendLink } from "../../globalvars";
import axios from 'axios';
import { Button, Typography } from "@material-ui/core";

const PlaidLink = ({ token }) => {
  const onSuccess = useCallback(
    (public_token, metadata) => {
      // send public_token to server
      let data = {
        public_token: public_token,
        accounts: metadata.accounts
      }
      let options = {
        headers: {
        'Content-Type': 'application/json',
        }
      };
      axios.post(backendLink + "/exchangePlaidToCircle", data, options);
    },
    []
  );

  const config = {
    token,
    onSuccess,
    // onExit
    // onEvent
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <Button onClick={() => open()} disabled={!ready}>
      <Typography>
      Connect a bank account
      </Typography>
    </Button>
  );
};

const PlaidWidget = () => {
  const [token, setToken] = useState(null);

  // generate a link_token
  React.useEffect(() => {
    async function generateToken() {
      let response = await axios.post(backendLink + "/create_link_token");
      const link_token = response.data.link_token;
      setToken(link_token);
    }
    generateToken();
  }, []);

  const onSuccess = useCallback(
    (public_token, metadata) => {
      // send public_token to server
    },
    []
  );
  
  // only initialize Link once our token exists
  return token === null ? (
    // insert your loading animation here
    <div className="loader"></div>
  ) : (
    <PlaidLink 
      token={token}>
    </PlaidLink>
  );
};

export { PlaidWidget };
