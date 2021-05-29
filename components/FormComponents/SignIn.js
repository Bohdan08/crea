import { FormLabel, FormInput } from "./FormUIElements";
import SocialSignIn from "./SocialSignIn";

const SignIn = ({ setUiState, onChange, signIn }) => (
  <>
    <p className="text-3xl font-black">Sign in to your account</p>
    <div className="mt-10">
      <FormLabel>Email</FormLabel>
      <FormInput onChange={onChange} name="email" icon="envelope" />
    </div>
    <div className="mt-8">
      <FormLabel>
        Password
        <span
          onClick={() => setUiState("forgotPassword")}
          className="ml-8 sm:ml-48 text-pink-500"
        >
          Forgot your password?
        </span>
      </FormLabel>
      <FormInput
        type="password"
        name="password"
        icon="lock"
        onChange={onChange}
      />
    </div>

    <button
      onClick={signIn}
      className="text-white w-full mt-6 bg-pink-600 p-3 rounded"
    >
      Sign In
    </button>
    {/* <SocialSignIn /> */}
    <p className="mt-12 font-light">
      Don't have an account?
      <span
        onClick={() => setUiState("signUp")}
        role="button"
        className="cursor-pointer text-pink-600 pl-2"
      >
        Sign Up.
      </span>
    </p>
  </>
);

export default SignIn;
