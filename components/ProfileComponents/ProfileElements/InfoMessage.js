import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoMessage = ({ children, onInfoMessageHide, containerStyles }) => (
  <div
    className={`bg-blue-500 text-white p-2 rounded w-full flex flex-row ${containerStyles}`}
  >
    <FontAwesomeIcon className="my-auto ml-2 mr-4" icon="info" />
    <div className="relative -top-0.5">{children}</div>
    {onInfoMessageHide && (
      <button
        type="button"
        aria-label="Close Info Message"
        className="float-right h-3"
        onClick={onInfoMessageHide}
      >
        <FontAwesomeIcon icon="times" />
      </button>
    )}
  </div>
);

export default InfoMessage;
