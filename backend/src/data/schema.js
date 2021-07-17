import mongoose from 'mongoose';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: String,
    hash: String,
    salt: String
});


//functions from https://medium.com/signature-networks/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
  
userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
  
userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jsonwebtoken.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}
  
userSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
    };
};

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

const Payments = new mongoose.model('Payments', paymentSchema);
const Contributions = new mongoose.model('Contributions', contributionSchema);
const Lenders = new mongoose.model('Lenders', lenderSchema);
const Users = new mongoose.model('Users', userSchema);

export {Payments, Contributions, Lenders, Users};