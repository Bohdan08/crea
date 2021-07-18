import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  MAX_FULL_NAME_LENGTH,
  MAX_PREFFERED_NAME_LENGTH,
  PERSONAL_INFO_MENU_ITEMS,
  REGIONS_MAPPING,
} from "../../shared/constants";
import {
  ProfileDropDownContainer,
  ProfileInputContainer,
} from "./ProfileElements";

const INIT_PROFILE_ERRORS_PAYLOAD = {
  fullName: "",
  preferredName: "",
  supportGroup: "",
  voteLocation: "",
  geographicPreference: "",
};

const PersonalInfo = () => {
  /* Redux */
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    geographicPreference,
    supportGroup,
    voteLocation,
    fullName,
    preferredName,
  } = user?.data || {};

  /* Geo Location */
  const {
    ready,
    value,
    /* suggestions: { status, data }, */
    suggestions,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },

    debounce: 300,
  });

  /* States */

  // initial states that are taken from db
  const [currentPersonalInfoValues, setCurrentPersonalInfoValues] = useState({
    fullName,
    preferredName,
    supportGroup,
    voteLocation,
    geographicPreference,
  });

  // initial validation errors (errors that are not related to DB)
  const [validationErrors, setValidationErrors] = useState(
    INIT_PROFILE_ERRORS_PAYLOAD
  );

  // initial api errors (errors that are related to DB)
  const [apiErrors, setApiErrors] = useState({
    INIT_PROFILE_ERRORS_PAYLOAD,
  });

  const onChangeDropDown = (event) => {};

  const onChangeVoteLocation = (event) => {
    setCurrentPersonalInfoValues({
      ...currentPersonalInfoValues,
      ["voteLocation"]: event.target.value,
    });
  };

  /* GeoLocation handlers */

  const handleSelectLocation = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);

    /* setUserValues({ ...userValues, voteLocation: description }); */

    setCurrentPersonalInfoValues({
      ...currentPersonalInfoValues,
      ["voteLocation"]: description,
    });
    clearSuggestions();
  };

  const renderVoteLocationSuggestions = () => {
    console.log(suggestions.status, "suggestionsStatus");
    console.log(suggestions.data, "suggestionsData");
    /* show data only according to selected region */

    /* const filteredData = data?.filter((initialSuggestion) =>
      initialSuggestion.description
        ?.toLowerCase()
        .includes(REGIONS_MAPPING[user])
    ); */

    return suggestions?.data?.length ? (
      suggestions.data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li
            key={place_id}
            className="cursor-pointer px-2 hover:bg-gray-50"
            onClick={handleSelectLocation(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      })
    ) : (
      <li className="px-2"> No results found... </li>
    );
  };

  console.log(currentPersonalInfoValues, "currentPersonalInfoValues");
  return (
    <>
      {Object.values(currentPersonalInfoValues).filter(
        (personalInfoValue) => personalInfoValue === ""
      ).length ? (
        <div className="border rounded bg-blue-600 p-3 text-white">
          Please, answer all questions below in order to gain full access to the
          application. <br />
          Having full access you will be able to chat and vote with others.
        </div>
      ) : null}
      <ProfileInputContainer
        id="userFullName"
        iconName="user"
        labelName="Full Name"
        type="text"
        containerStyles="mt-5"
        required
        value={currentPersonalInfoValues["fullName"]}
        validationError={validationErrors["fullName"]}
        maxLength={MAX_FULL_NAME_LENGTH}
        onChangeInput={(event) =>
          setCurrentPersonalInfoValues({
            ...currentPersonalInfoValues,
            ["fullName"]: event.target.value,
          })
        }
      />
      <ProfileInputContainer
        id="userFullName"
        iconName="user"
        labelName="Preferred Name"
        type="text"
        containerStyles="mt-5"
        required
        value={currentPersonalInfoValues["peferredName"]}
        validationError={validationErrors["preferredName"]}
        maxLength={2}
        onChangeInput={(event) =>
          setCurrentPersonalInfoValues({
            ...currentPersonalInfoValues,
            ["preferredName"]: event.target.value,
          })
        }
      />

      {PERSONAL_INFO_MENU_ITEMS.map(
        ({ name, value, options, geographyDependent, dependencies }) => (
          <ProfileDropDownContainer
            key={name}
            containerStyles="mt-5"
            fieldId={value}
            fieldName={name}
            optionName={value}
            required
            options={
              geographyDependent
                ? options[
                    REGIONS_MAPPING[
                      currentPersonalInfoValues["geographicPreference"]
                    ]
                  ]
                : options
            }
            selectedOption={currentPersonalInfoValues[value]}
            onChangeField={(event) =>
              onChangeDropDown(value, event.target.value)
            }
            disabled={
              dependencies.length &&
              Object.entries(currentPersonalInfoValues).filter(
                ([key, value]) => dependencies.includes(key) && value === ""
              )
            }
          />
        )
      )}

      <ProfileInputContainer
        id="voteLocation"
        iconName="search-location"
        containerStyles="mt-5"
        inputType="text"
        labelName="I vote in"
        required
        /* disabled={!currentPersonalInfoValues["geographicPreference"]} */
        value={currentPersonalInfoValues["voteLocation"]}
        onChangeInput={onChangeVoteLocation}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {suggestions?.status === "OK" && (
        <ul className="absolute mt-1 w-96 bg-white rounded border">
          {renderVoteLocationSuggestions()}
        </ul>
      )}
    </>
  );
};

export default PersonalInfo;
