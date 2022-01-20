// custom hook to get current user, regardless of which file we're in

import { gql, useQuery } from '@apollo/client';

// authenticatedItem return a union - could be multiple types of values
// in our case it could return a User
// so we need ... on User
// "when the authenticatedItem returns a user, then get this stuff..."
export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO: query the cart once we have it
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}
