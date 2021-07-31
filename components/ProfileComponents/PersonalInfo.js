import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import usePlacesAutocomplete from "use-places-autocomplete";
import { setUser } from "../../redux/slices/userSlice";
import {
  GEOGRAPHIC_LOCATION_KEY_MAPPING,
  MAX_FULL_NAME_LENGTH,
  MAX_PREFFERED_NAME_LENGTH,
  MIN_FULL_NAME_LENGTH,
  MIN_PREFERRED_NAME_LENGTH,
  PERSONAL_INFO_MENU_ITEMS,
  TEMPORARY_DEFAULT_GEOGRAPHIC_LOCATION,
} from "../../shared/constants";
import { removeNullsInObject, shallowEqualObjects } from "../../shared/utils";
import { updateUser } from "../../src/graphql/mutations";
import {
  CancelChangesButton,
  ErrorMessage,
  InfoMessage,
  ProfileDropDownContainer,
  ProfileInputContainer,
  ProfileSvgWrapper,
  SaveChangesButton,
} from "./ProfileElements";

const StyledSuggestionsItem = styled.ul`
  height: 40px;
`;

const StyledTooltipContainer = styled.div`
  &:hover .tooltip-text {
  visibility: visible;
`;

const StyledTooltipText = styled.span`
  width: 200px;
  margin-left: -70px;
  margin-top: -30px;
`;

const INIT_PROFILE_ERRORS_PAYLOAD = {
  fullName: "",
  preferredName: "",
  supportGroup: "",
  voteLocation: "",
  geographicPreference: "",
};

const UserInfoBlock = ({ header, content }) => (
  <>
    <div className="mb-1 mt-5"> {header}</div>
    <div className="font-semibold">{content} </div>
  </>
);

const PersonalInfo = () => {
  /* Redux */
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  /* Geo Location */
  const {
    ready,
    value: voteLocationValue,
    /* suggestions: { status, data }, */
    suggestions,
    setValue: setVoteLocationValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },

    debounce: 300,
  });

  /* States */

  // initial states that are taken from db
  const [currentPersonalInfoValues, setCurrentPersonalInfoValues] = useState(
    user?.data || {}
  );

  // initial validation errors (errors that are not related to DB)
  const [validationErrors, setValidationErrors] = useState(
    INIT_PROFILE_ERRORS_PAYLOAD
  );

  const [personalInfoApiError, setApiError] = useState("");

  const [personalInfoSuccessUpdate, setPersonalInfoSuccessUpdate] = useState(
    ""
  );

  const [infoMessageViewAwareness, setInfoMessageViewAwareness] = useState(
    true
  );
  const [infoMessageViewRules, setInfoMessageViewRules] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const [editMode, setEditMode] = useState(false);

  /*  Use Effects */

  useEffect(() => {
    if (user?.data?.voteLocation) {
      setVoteLocationValue(user?.data?.voteLocation, false);
      clearSuggestions();
    }
  }, []);

  useEffect(() => {
    // check if user completed their profile
    if (
      user?.data &&
      !Object.values(user?.data || {}).filter(
        (personalInfoValue) => personalInfoValue === ""
      ).length
    ) {
      setProfileCompleted(true);
      setEditMode(false);
    } else {
      setProfileCompleted(false);
      setEditMode(true);
    }
  }, []);

  /* Handlers */
  const onChangeDropDown = (userKey, value) =>
    setCurrentPersonalInfoValues({
      ...currentPersonalInfoValues,
      [userKey]: value,
    });

  const onChangeVoteLocation = (event) => {
    setVoteLocationValue(event.target.value);
  };

  /* GeoLocation handlers */

  const handleSelectLocation = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setVoteLocationValue(description, false);

    setCurrentPersonalInfoValues({
      ...currentPersonalInfoValues,
      ["voteLocation"]: description,
    });

    clearSuggestions();
  };

  const renderVoteLocationSuggestions = () => {
    /* show data only according to selected region */
    const filteredData = suggestions?.data?.filter(
      (initialSuggestion) =>
        initialSuggestion.description
          ?.toLowerCase()
          .includes(TEMPORARY_DEFAULT_GEOGRAPHIC_LOCATION.toLowerCase()) &&
        initialSuggestion.types?.includes("locality")
    );

    return filteredData?.length ? (
      filteredData.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <StyledSuggestionsItem
            key={place_id}
            className="h-full flex flex-row justify-left items-center border cursor-pointer px-2 bg-white hover:bg-gray-50"
            onClick={handleSelectLocation(suggestion)}
          >
            <strong>{main_text}</strong>{" "}
            <small className="relative pt-1 pl-1">{secondary_text}</small>
          </StyledSuggestionsItem>
        );
      })
    ) : (
      <StyledSuggestionsItem className="h-full flex justify-left items-center bg-white px-2">
        {" "}
        No results found...{" "}
      </StyledSuggestionsItem>
    );
  };

  const validateProfileChanges = () => {
    if (shallowEqualObjects(currentPersonalInfoValues, user.data)) {
      setApiError(`You haven't made any changes to your profile.`);

      return false;
    }
    // check input lengths
    if (currentPersonalInfoValues["fullName"]?.length < MIN_FULL_NAME_LENGTH) {
      setValidationErrors({
        ...validationErrors,
        ["fullName"]: `Full name should be at least ${MIN_FULL_NAME_LENGTH} characters.`,
      });

      return false;
    } else if (
      currentPersonalInfoValues["preferredName"]?.length <
      MIN_PREFERRED_NAME_LENGTH
    ) {
      setValidationErrors({
        ...validationErrors,
        ["preferredName"]: `Preferred name should be at least ${MIN_PREFERRED_NAME_LENGTH} characters.`,
      });

      return false;
    }

    return true;
  };

  const onSaveProfileChanges = () => {
    // make sure if user completed their profile properly
    if (validateProfileChanges()) {
      // push changes to db
      updateUserProfileInDB();
    }
  };

  const updateUserProfileInDB = async () => {
    try {
      const updatedProfileValues = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            ...user.data,
            ...currentPersonalInfoValues,
            // temporary preference
            ["geographicPreference"]: TEMPORARY_DEFAULT_GEOGRAPHIC_LOCATION,
          },
        })
      );

      const updatedData = updatedProfileValues.data.updateUser;

      // if a message is received, it means that something went wrong
      if (!updatedData && updatedData.message) {
        setApiError(updatedData.message);
      } else {
        setApiError("");
        setPersonalInfoSuccessUpdate(
          "Your Personal Info has been successfully updated!"
        );
        setValidationErrors(INIT_PROFILE_ERRORS_PAYLOAD);
        dispatch(setUser(removeNullsInObject(updatedData)));
      }
    } catch (error) {
      if (error) {
        if (error?.message) {
          setApiError(error.message);
        } else if (error?.errors && error.errors[0]) {
          setApiError(error?.errors[0].message);
        }
      }
    }
  };

  return (
    <>
      {infoMessageViewAwareness ? (
        <InfoMessage
          containerStyles="mb-4"
          onInfoMessageHide={() => setInfoMessageViewAwareness(false)}
        >
          Beware that you can have full access to only one region at a time.
          <br /> So, if you choose to represent United States of America, you
          won't have full access to United Kingdom, and vice versa.
        </InfoMessage>
      ) : null}
      {!profileCompleted && infoMessageViewRules ? (
        <InfoMessage
          containerStyles="my-4"
          onInfoMessageHide={() => setInfoMessageViewRules(false)}
        >
          Please, answer all questions below in order to gain full access to the
          application. <br />
          Having full access you will be able to chat and vote with others.
        </InfoMessage>
      ) : null}
      {personalInfoApiError ? (
        <ErrorMessage
          message={personalInfoApiError}
          onErrorHide={() => setApiError("")}
        />
      ) : personalInfoSuccessUpdate ? (
        <div className="my-4 bg-green-600 text-white p-2 rounded w-full">
          {personalInfoSuccessUpdate}
          <button
            type="button"
            className="float-right"
            onClick={() => setPersonalInfoSuccessUpdate("")}
          >
            <ProfileSvgWrapper
              stroke="white"
              path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
            />
          </button>
        </div>
      ) : null}
      {!editMode ? (
        <StyledTooltipContainer className="inline-block float-right">
          <StyledTooltipText className="tooltip-text absolute rounded p-1 invisible text-center bg-black text-white">
            Edit your answers
          </StyledTooltipText>
          <button type="button" onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon="edit" className="text-yellow-700" />
          </button>
        </StyledTooltipContainer>
      ) : null}

      {editMode ? (
        <>
          <ProfileInputContainer
            id="userFullName"
            iconName="user"
            labelName="Full Name"
            type="text"
            containerStyles="mt-0"
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
            value={currentPersonalInfoValues["preferredName"]}
            validationError={validationErrors["preferredName"]}
            maxLength={MAX_PREFFERED_NAME_LENGTH}
            onChangeInput={(event) =>
              setCurrentPersonalInfoValues({
                ...currentPersonalInfoValues,
                ["preferredName"]: event.target.value,
              })
            }
          />

          {PERSONAL_INFO_MENU_ITEMS.map(({ name, value, options }) => (
            <ProfileDropDownContainer
              key={name}
              containerStyles="mt-5"
              fieldId={value}
              fieldName={name}
              optionName={value}
              required
              options={options}
              selectedOption={currentPersonalInfoValues[value]}
              onChangeField={(event) =>
                onChangeDropDown(value, event.target.value)
              }
            />
          ))}

          <ProfileInputContainer
            id="voteLocation"
            iconName="search-location"
            containerStyles="mt-5"
            inputType="text"
            labelName="I vote in"
            required
            {/* disabled={!currentPersonalInfoValues["geographicPreference"]} */}
            /* value={currentPersonalInfoValues["voteLocation"]} */
            value={voteLocationValue}
            onChangeInput={onChangeVoteLocation}
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {suggestions?.status === "OK" ? (
            <ul className="relative mt-1 bg-white rounded border">
              {renderVoteLocationSuggestions()}
            </ul>
          ) : suggestions?.status !== "" ? (
            <ErrorMessage message={suggestions.status} />
          ) : null}

          <div className="float-right mt-2">
            <CancelChangesButton
              style="mr-5"
              onClick={() => {
                setEditMode(false);
                setCurrentPersonalInfoValues(user.data || {});
              }}
            />
            <SaveChangesButton
              onClick={onSaveProfileChanges}
              disabled={
                Object.values(currentPersonalInfoValues).filter(
                  (personalInfoValue) => personalInfoValue === ""
                ).length
              }
            />
          </div>
        </>
      ) : (
        <div className="text-xl">
          <UserInfoBlock
            header="Full Name"
            content={currentPersonalInfoValues["fullName"]}
          />
          <UserInfoBlock
            header="Preferred Name"
            content={currentPersonalInfoValues["preferredName"]}
          />

          <UserInfoBlock
            header="Geographic Preference"
            content={
              GEOGRAPHIC_LOCATION_KEY_MAPPING[
                currentPersonalInfoValues["geographicPreference"]
              ]
            }
          />

          <UserInfoBlock
            header="Identity"
            content={currentPersonalInfoValues["userType"]}
          />

          <UserInfoBlock
            header="Support Group"
            content={currentPersonalInfoValues["supportGroup"]}
          />

          <UserInfoBlock
            header="Location"
            content={currentPersonalInfoValues["voteLocation"]}
          />
        </div>
      )}
    </>
  );
};

export default PersonalInfo;
