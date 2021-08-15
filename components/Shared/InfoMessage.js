import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// -top-0.5
const InfoMessage = ({
  children,
  onInfoMessageHide,
  containerStyles,
  textStyles,
}) => (
  <div
    className={`${containerStyles} bg-blue-500 text-white p-2 rounded flex flex-row`}
  >
    <FontAwesomeIcon className="my-auto ml-2 mr-4" icon="info" />
    <div className={`${textStyles} relative`}>{children}</div>
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
