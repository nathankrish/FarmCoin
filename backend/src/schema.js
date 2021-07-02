import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amountPaid: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const contributionSchema = new mongoose.Schema({
    amountContributed: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const lenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalContributed: {
        type: Number,
        required: true,
        default: 0
    }, 
    netYield: {
        type: Number,
        required: true,
        default: 0
    },
    contributions: {
        type: [contributionSchema],
        required: true,
        default: [],
        immutable: true
    }
});

const paymentModel = new mongoose.model('Payment', paymentSchema);

export {paymentModel};