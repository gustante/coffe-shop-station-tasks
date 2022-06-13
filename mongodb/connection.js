require('dotenv').config();

import mongoose from 'mongoose';

let MONGODBURI = process.env.MONGODBURI;

const  connectMongo = async () => mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology:true});

module.exports = connectMongo;