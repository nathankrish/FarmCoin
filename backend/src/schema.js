import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amountPaid: Number,
    date: Date
});

const paymentModel = new mongoose.model('Payment', paymentSchema);

export {paymentModel};