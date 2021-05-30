import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Auth } from "aws-amplify";

const SocialSignIn = () => {
  return (
    <div className="flex flex-col">
      <button
        className="mt-10 focus:outline-none"
        onClick={() => Auth.federatedSignIn({ provider: "Google" })}
      >
        <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
          <FontAwesomeIcon className="text-red-600" icon={faGoogle} />
          <p className="ml-3">Sign in with Google</p>
        </div>
      </button>
      {/* <button
        className="mt-4 focus:outline-none"
        onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
      >
        <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
          <FontAwesomeIcon className="text-blue-600" icon={faFacebook} />
          <p className="ml-3">Sign in with Facebook</p>
        </div>
      </button> */}
    </div>
  );
};

export default SocialSignIn;
