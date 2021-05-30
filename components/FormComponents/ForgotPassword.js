import { FormLabel, FormInput } from "./FormUIElements";

const FogotPassword = ({ setUiState, onChange, forgotPassword, setError }) => (
  <>
    <p className="text-3xl font-black">Reset password</p>
    <div className="mt-10">
      <FormLabel>Email</FormLabel>
      <FormInput onChange={onChange} name="email" />
    </div>
    <button
      onClick={(e) => {
        e.preventDefault();
        forgotPassword();
      }}
      className="text-white w-full mt-4 bg-pink-600 p-3 rounded"
    >
      Continue
    </button>
    <button
      onClick={(e) => {
        e.preventDefault();
        setUiState("signIn");
        setError(null);
      }}
      className="text-sm mt-6 text-pink-500 focus:outline-none"
    >
      Cancel
    </button>
  </>
);

export default FogotPassword;
