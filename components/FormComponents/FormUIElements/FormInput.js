import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// const StyledIcon = styled(FontAwesomeIcon)`
//   margin-top: 22px;
// `;

const FormInput = (props) => (
  <div className="flex flex-row">
    <FontAwesomeIcon
      style={{ marginTop: "22px" }}
      className="absolute p-0 ml-3 text-gray-300"
      icon={props.icon || "user"}
    />
    <input
      {...props}
      className="pl-9 outline-none border-gray-300 border rounded p-2 mt-2 w-full focus:shadow-inputfocus"
      required
    />
  </div>
);

export default FormInput;
