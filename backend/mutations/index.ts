import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';


// In "mutations", add custom mutations...


// make a fake graphql tagged template literal for syntax highlighting
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
