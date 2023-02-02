// import express, { json } from 'express';
import express, { json } from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { DataBase } from "./data/db.js";
import { db_feed } from "./data/db_seed.js";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const PORT = 3000;

DataBase.connect().then(db_feed);
const app = express();

async function createApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginLandingPageDisabled()] });
  await server.start();

  app.use('/graphql', cors(), json(), expressMiddleware(server));
}

createApolloServer().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
