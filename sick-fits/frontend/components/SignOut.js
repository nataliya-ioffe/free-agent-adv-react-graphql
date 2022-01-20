import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY, useUser } from './User';

export default function SignOut() {
  const user = useUser();

  const SIGNOUT_MUTATION = gql`
    mutation {
      endSession
    }
  `;

  const [signout, { data, loading }] = useMutation(SIGNOUT_MUTATION, {
    refetchQuery: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={signout}>
      SignOut
    </button>
  );
}
