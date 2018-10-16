const { GraphQLServer } = require("graphql-yoga");

const Mutation = require("./resolvers/mutation");
const Query = require("./resolvers/query");
const db = require("./db");

// Create the GraphQl Yoga server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;