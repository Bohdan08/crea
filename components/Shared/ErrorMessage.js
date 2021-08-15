import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ message, onErrorHide }) => (
  <div className="my-4  bg-red-500 text-white p-2 rounded w-full">
    <FontAwesomeIcon
      className="h-5 w-5 mt-1 mr-3 text-white"
      icon="minus-circle"
    />
    <span className="relative -top-0.5">{message}</span>
    {onErrorHide && (
      <button type="button" className="float-right flex" onClick={onErrorHide}>
        <FontAwesomeIcon icon="times" />
      </button>
    )}
  </div>
);

export default ErrorMessage;
