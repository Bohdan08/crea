/* Shared Contants */

/* API STATUS */
export const AVAILABLE_REGIONS = {
  USA: "usa",
  UK: "uk",
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

export const PROFILE_SELECTIONS = ["Preferences", "Personal Info"];

export const PROFILE_FIELD_TYPES = {
  INPUT: "input",
  DROPDOWN: "dropdown",
};

export const PROFILE_FIELDS_BY_CURRENT_SELECTION = {
  Preferences: [
    {
      name: "I represent",
      value: "geographicPreference",
      options: [
        { key: "usa", value: "United States of America" },
        { key: "uk", value: "United Kingdom" },
      ],
      type: PROFILE_FIELD_TYPES.DROPDOWN,
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
      type: PROFILE_FIELD_TYPES.DROPDOWN,
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
      type: PROFILE_FIELD_TYPES.DROPDOWN,
    },
    // {
    //   name: "I vote in",
    //   value: "voteLocation",
    //   type: PROFILE_FIELD_TYPES.INPUT,
    // },
  ],
  "Personal Info": [
    {
      name: "Username",
      value: "username",
      iconPath: (
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
      type: PROFILE_FIELD_TYPES.INPUT,
    },
    {
      name: "Email",
      value: "email",
      iconPath: (
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      type: PROFILE_FIELD_TYPES.INPUT,
    },
    {
      name: "Phone Number",
      value: "phone_number",
      iconPath: (
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
      type: PROFILE_FIELD_TYPES.INPUT,
    },
    {
      name: "Address",
      value: "address",
      iconPath: (
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
      type: PROFILE_FIELD_TYPES.INPUT,
    },
  ],
};
