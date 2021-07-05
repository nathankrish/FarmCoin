import express from 'express';
import mongoose from 'mongoose';
import {userName, password, databaseName} from '../credentials.js'
import { CirclePayments } from '../data/circleTest.js';
import {paymentModel} from '../data/schema.js'

const mongoConnString = `mongodb+srv://${userName}:${password}@cluster0.t8rmg.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
await mongoose.connect(mongoConnString, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 5000;

app.post('/testMockAcct', async (req, res) => {
  const circle = new CirclePayments(); 
  let account = {
    accountNumber: '123456789',
    routingNumber: '011000028',
    description: 'My ACH account'
  };
  let balance = {amount: '3.14', currency: 'USD'};
  let accountResp = await circle.createMockAccount(account, balance);  
  res.json(accountResp);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const newPayment = paymentModel.create({
    amountPaid: 20.50,
    date: Date.now()
});

