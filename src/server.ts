import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers/index';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = process.env.PORT || 4000;
server.listen({ port: port }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
