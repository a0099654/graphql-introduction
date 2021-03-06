import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

import schema from './graphql';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, this is graphql API');
});

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to database'))
    .once('open', () => console.log('Connected to DB.'));

app.use('/graphql', graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true
})));

app.listen(3000, () => {
    console.log('Graphql API running at port 3000');
});