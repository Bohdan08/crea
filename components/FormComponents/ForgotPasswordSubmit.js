import { FormInput, FormLabel } from "./FormUIElements";

const FogotPasswordSubmit = ({
  setUiState,
  onChange,
  forgotPasswordSubmit,
  setError,
}) => (
  <>
    <p className="text-3xl font-black">Reset password</p>
    <div className="mt-10">
      <FormLabel className="text-sm">Confirmation Code</FormLabel>
      <FormInput onChange={onChange} name="authCode" />
    </div>
    <div className="mt-6">
      <FormLabel className="text-sm">New Password</FormLabel>
      <FormInput type="password" name="password" onChange={onChange} />
    </div>
    <button
      onClick={(e) => {
        e.preventDefault();
        forgotPasswordSubmit();
      }}
      className="text-white w-full mt-4 bg-pink-600 p-3 rounded"
    >
      Continue
    </button>
    <button
      onClick={() => {
        e.preventDefault();
        setUiState("signIn");
        setError(null);
      }}
      className="text-sm mt-6 text-pink-500"
    >
      Cancel
    </button>
  </>
);

export default FogotPasswordSubmit;
