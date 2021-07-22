const express = require('express');
const path = require('path');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
//async await added because of frequent error `await server.start()` before calling `server.applyMiddleware()`
 const startServer = async() => {
  await server.start()
server.applyMiddleware({ app });
}

startServer();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//starter code
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});



app.use(routes); //comment this out in the end


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  });
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});