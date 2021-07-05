import fetch from 'node-fetch';
import { circleApiKey } from '../credentials.js';
import { circleApiLink } from "../globalVars.js";

class CirclePayments {

    async createMockAccount(account, balance) {
        const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${circleApiKey}`
            },
            body: JSON.stringify({
              account, balance
            })
          };
          
          return await fetch(circleApiLink + '/mocks/ach/accounts', options);
     }

}

export {CirclePayments}