import express from 'express';
import mongoose from 'mongoose';
import {userName, password, databaseName} from './credentials.js'
import {paymentModel} from './schema.js'

const mongoConnString = `mongodb+srv://${userName}:${password}@cluster0.t8rmg.mongodb.net/${databaseName}?retryWrites=true&w=majority`
await mongoose.connect(mongoConnString, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 3000;

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

