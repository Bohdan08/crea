import { FormLabel } from "./FormUIElements";
import FormInput from "./FormUIElements/FormInput";

const SignUp = ({ setUiState, signUp, onChange, setError }) => (
  <>
    <p className="text-3xl font-black">Sign up for an account</p>
    <div className="mt-10">
      <FormLabel>Email</FormLabel>
      <FormInput onChange={onChange} name="email" icon="envelope" />
    </div>
    <div className="mt-7">
      <FormLabel>Password</FormLabel>
      <FormInput
        name="password"
        onChange={onChange}
        type="password"
        icon="lock"
      />
    </div>
    <div className="mt-7">
      <FormLabel>Repeat Password</FormLabel>
      <FormInput
        name="repeatedPassword"
        onChange={onChange}
        type="password"
        icon="lock"
      />
    </div>
    <button
      onClick={(e) => {
        e.preventDefault();
        signUp();
      }}
      className="text-white w-full mt-10 bg-pink-600 p-3 rounded"
    >
      Continue
    </button>
    <p className="mt-12 font-light">
      Already have an account?
      <span
        className="cursor-pointer pl-2 text-pink-600"
        onClick={() => {
          setUiState("signIn");
          setError(null);
        }}
      >
        Sign In.
      </span>
    </p>
  </>
);

export default SignUp;
