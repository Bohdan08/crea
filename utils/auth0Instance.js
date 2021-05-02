export const webAuth = new auth0.WebAuth({
  domain: "http://localhost:3000",
  clientID: "LuiCjOWUizDXRKMrZKzTpPtC9aXkzuEZ",
  redirectUri: 'http://localhost:3000/posts'
});
