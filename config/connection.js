import mongoose from 'mongoose';

const { connect, connection } = mongoose;

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB', {
   // useNewUrlParser: true,
   // useUnifiedTopology: true,
});


//connection.on('error', (err) => {console.log(`Connection error: ${err}`);});
connection.once('open', () => {
    console.log('Connected to MongoDB');
});

export default connection;