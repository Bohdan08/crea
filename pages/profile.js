import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function Profile() {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <div>loading... </div>}
      {user && (
        <>
          <div
            className="align-items-center profile-header mb-5 text-center text-md-left"
            data-testid="profile"
          >
            <div md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decode="async"
                data-testid="profile-picture"
              />
            </div>
            <div md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </div>
          </div>
          <div data-testid="profile-json">
            <div>{JSON.stringify(user, null, 2)} </div>
          </div>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <div> loading</div>,
  onError: (error) => <div>error is {error}</div>,
});
