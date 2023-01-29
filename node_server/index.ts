import express from "express";
import { ApolloServer } from "apollo-server-express";
import { DataBase } from "./data/db.js";
import { db_feed } from "./data/db_seed.js";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const PORT = 3000;

DataBase.connect().then(db_feed);
const app = express();

async function createApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
}

createApolloServer().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
