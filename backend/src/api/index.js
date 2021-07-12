import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import {userName, password, databaseName} from '../credentials.js'
import { CirclePayments } from '../data/circleTest.js';
import {paymentModel} from '../data/schema.js'
import plaid from 'plaid';
import cors from 'cors';

const mongoConnString = `mongodb+srv://${userName}:${password}@cluster0.t8rmg.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
await mongoose.connect(mongoConnString, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())

const env = (process.env.PLAID_ENV == "sandbox") ? plaid.environments.sandbox : plaid.environments.development;

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: env
});

app.post('/create_link_token', async (request, response) => {
  try {
    // Get the client_user_id by searching for the current user
    // const user = await User.find(...);
    const clientUserId = '1';
    // Create the link_token with all of your configurations
    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'Plaid Test App',
      products: ["auth"],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://webhook.sample.com',
    });
    response.json(tokenResponse);
  } catch (e) {
    // Display error on client
    response.send({ error: e.message });
  }
});

let id = null;

app.post('/testMockAcct', async (req, res) => {
  const circle = new CirclePayments(); 
  let account = await circle.sampleBankAcct();
  id = account.data.id;
  let fetchAccount = await circle.fetchBankAcct(id);
  res.json(fetchAccount);
});

app.post('/createPayment', async (req, res) => {
  const circle = new CirclePayments(); 
  let amount = 10;
  let account = await circle.fetchBankAcct(id);
  let fetchId = account.data.id;
  let email = account.data.metadata.email;
  let payment = await circle.createPayment(fetchId, amount, email);
  res.json(payment);
});

app.post('/createPayout', async (req, res) => {
  const circle = new CirclePayments(); 
  let payout = await circle.createPayout(id);
  res.json(payout);
});


app.post('/exchangePlaidToCircle', (req, res) => {
  let handler = async () => {
    try {
      const publicToken = req.body.public_token;
      const accountId = req.body.account.id;
      console.log(req.body.metadata);
      const exchangeTokenResponse = await client.exchangePublicToken(
        publicToken,
      );
      const accessToken = exchangeTokenResponse.access_token;
      // Create a processor token for a specific account id.
      const processorTokenResponse = await client.createProcessorToken(
        accessToken,
        accountId,
        'circle',
      );
      const processorToken = processorTokenResponse.processor_token;
      return processorToken;
    } catch (err) {
      console.log(err.message)
    }  
  }
  handler().then((token) => console.log(token));
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

