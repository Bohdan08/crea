import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormInput = (props) => (
  <div className="flex flex-row">
    <FontAwesomeIcon
      className="absolute mt-5 ml-3 text-gray-300"
      icon={props.icon || 'user'}
    />
    <input
      {...props}
      className="pl-9 outline-none border-gray-300 border rounded p-2 mt-2 w-full focus:shadow-inputfocus"
      required
    />
  </div>
);

export default FormInput;
