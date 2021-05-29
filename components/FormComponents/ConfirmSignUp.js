import Input from "./FormUIElements/FormInput";

function ConfirmSignUp({ setUiState, onChange, confirmSignUp }) {
  return (
    <>
      <p className="text-3xl font-black">Confirm Sign Up</p>
      <div className="mt-10">
        <label className="text-sm">Confirmation Code</label>
        <Input onChange={onChange} name="authCode" />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          confirmSignUp();
        }}
        className="text-white w-full mt-4 bg-pink-600 p-3 rounded"
      >
        Continue
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setUiState("signIn");
        }}
        className="text-sm mt-6 text-pink-500"
      >
        Cancel
      </button>
    </>
  );
}

export default ConfirmSignUp;
