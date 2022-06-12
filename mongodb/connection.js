require('dotenv').config();

import mongoose from 'mongoose';

let MONGODBURI = process.env.MONGODBURI;

const connection = {};

async function connectMongo() {
    if(connection.isConnected)
        return;
    
    const db = await mongoose.connect(MONGODBURI, {useNewUrlParser: true, useUnifiedTopology:true});

    connection.isConnected = db.connections[0].readyState;
}

export default connectMongo;

// const connectMongo = async () => mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology:true});

// module.exports = connectMongo;