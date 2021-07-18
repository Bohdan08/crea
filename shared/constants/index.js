/* Shared Contants */

/* API */
// const GOOGLE_API_KEY = "AIzaSyDz2SO7yXLWj-EBs7nz7JiP1JFv6xLnzrA";

/* Profile Constants */

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_FULL_NAME_LENGTH = 5;
export const MIN_PREFERRED_NAME_LENGTH = 4;
export const MAX_FULL_NAME_LENGTH = 56;
export const MAX_PREFFERED_NAME_LENGTH = 56;

export const AVAILABLE_REGIONS = {
  US: "US",
  UK: "uk",
};

export const USER_AUTH_ATTRIBUTES = ["username", "email"];

export const REGIONS_MAPPING = {
  "United States of America": "usa",
  "United Kingdom": "uk",
};

export const HEADER_CONTENT_BY_REGION = {
  usa: ["Home", "Bills"],
  uk: ["Home", "Bills"],
};

export const PROFILE_OPTIONS_BY_REGION = {
  support: {
    usa: ["Republicans", "Democrats", "Other"],
    uk: ["Labour", "Conservatives", "SNP"],
  },
};

export const PREFERENCES = "Preferences";
export const PERSONAL_INFO = "Personal Info";
export const ACCOUNT = "Account";
export const PROFILE_SELECTIONS = [PERSONAL_INFO, ACCOUNT];

export const PROFILE_FIELD_TYPES = {
  INPUT: "input",
  DROPDOWN: "dropdown",
};

export const PERSONAL_INFO_MENU_ITEMS = [
  {
    name: "I represent",
    value: "geographicPreference",
    options: [
      { key: "usa", value: "United States of America" },
      { key: "uk", value: "United Kingdom" },
    ],
    dependencies: [],
  },
  {
    name: "I am a",
    value: "userType",
    options: [
      { key: "voter", value: "Voter" },
      { key: "media", value: "Media" },
      { key: "researcher", value: "Researcher" },
      { key: "electedOfficial", value: "Elected official" },
      { key: "otherOfficial", value: "Other official" },
      { key: "politicalActivist", value: "Political Activist" },
    ],
    dependencies: [],
  },
  {
    name: "I support",
    value: "supportGroup",
    geographyDependent: true,
    options: {
      usa: [
        { key: "republicans", value: "Republicans" },
        { key: "democrats", value: "Democrats" },
        { key: "other", value: "Other" },
      ],
      uk: [
        { key: "labour", value: "Labour" },
        { key: "conservatives", value: "Conservatives" },
        { key: "snp", value: "SNP" },
        { key: "liberalDemocrats", value: "Liberal Democrats" },
        { key: "other", value: "Other" },
      ],
    },
    dependencies: ["geographicPreference"],
  },
];
