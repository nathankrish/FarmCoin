import fetch from 'node-fetch';
import { circleApiKey, masterWalletId} from '../credentials.js';
import { circleApiLink } from "../globalVars.js";
import { v4 as uuidv4 } from 'uuid';

class CirclePayments {

    async createMockAccount(account, balance) {
      const url = 'https://api-sandbox.circle.com/v1/mocks/ach/accounts';
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
      
      let res = await fetch(url, options)
      return res.json();
    }

    async createBankAccount(processorToken) {
      const url = 'https://api-sandbox.circle.com/v1/banks/ach';
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${circleApiKey}`
        },
        body: JSON.stringify({
          billingDetails: {
            name: 'Satoshi Nakamoto',
            postalCode: '01234',
            line1: '100 Money Street',
            city: 'Boston',
            country: 'US',
            district: 'MA'
          },
          metadata: {
            // need to generate the session id's uniquely in future
            sessionId: 'DE6FA86F60BB47B379307F851E238617',
            ipAddress: '244.28.239.130',
            email: 'satoshi@circle.com'
          },
          idempotencyKey: uuidv4(),
          plaidProcessorToken: processorToken
        })
      };

      let res = await fetch(url, options);
      return res.json();
    }

    async sampleBankAcct() {
      let account = {
        accountNumber: '123456789',
        routingNumber: '011000028',
        description: 'My ACH account'
      };
      let balance = {amount: '3.14', currency: 'USD'};
      let mockResp = await this.createMockAccount(account, balance);  
      let processorToken = mockResp.data.processorToken;
      let accountResp = await this.createBankAccount(processorToken)
      return accountResp;
    }

    async fetchBankAcct(id) {
      const url = `https://api-sandbox.circle.com/v1/banks/ach/${id}`;
      const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${circleApiKey}`
       }
      };

      let res = await fetch(url, options);
      return res.json();
    }

    async createPayment(id, amount, email) {
      const url = 'https://api-sandbox.circle.com/v1/payments';
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${circleApiKey}`
        },
        body: JSON.stringify({
          metadata: {
            email: email,
            sessionId: 'DE6FA86F60BB47B379307F851E238617',
            ipAddress: '244.28.239.130'
          },
          amount: {amount: amount, currency: 'USD'},
          source: {id: id, type: 'ach'},
          idempotencyKey: uuidv4(),
          verification: 'none',
          description: 'Payment'
        })
      };

      let res = await fetch(url, options);
      return res.json();
    }

    
    async createPayout(id) {
      const url = 'https://api-sandbox.circle.com/v1/payouts';
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer QVBJX0tFWToyNTlkM2Y3MTk2MjU2NzdjYzEyNGFkYmI0YmZhMjk3ODpiNGY5OWViZDEyZjQ4MjlkNDMzNDIzMjY0NzQwMzY4ZQ=='
        },
        body: JSON.stringify({
          source: {type: 'wallet', id: masterWalletId},
          destination: {type: 'ach', id: id},
          amount: {amount: '3.14', currency: 'USD'},
          metadata: {beneficiaryEmail: 'satoshi@circle.com'},
          idempotencyKey: uuidv4()
        })
      };
      
      let res = await fetch(url, options)
      return res.json();
    }
}

export {CirclePayments}