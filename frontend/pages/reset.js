import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function resetPage({ query }) {
  // If user goes to the reset page without requesting a reset email (has no token)
  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you must supply a token</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <p>Reset your password</p>
      <Reset token={query.token} />
    </div>
  );
}
