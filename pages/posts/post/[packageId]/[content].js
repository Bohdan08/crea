import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Poll from "./poll";

// mock data
import { data } from "../../../../data";

// style
import styles from "./post.module.scss";

const currentUser = { user: "Victor", likes: 0, dislikes: 0 };

const negativeComments = [
  {
    id: 0,
    user: "Rob",
    text:
      "I don't support this bill because our Government should worry about more important Bills. Such as free healthcare for all residents!",
    likes: 10,
    dislikes: 4,
    subComments: 12,
  },
  {
    id: 1,
    user: "Andrew",
    text:
      "I totally disagree with this bill because this decision sounds totally irrelevant to the problem.",
    likes: 11,
    dislikes: 1,
    subComments: 0,
  },
];

const positiveComments = [
  {
    id: 3,
    user: "Alex",
    text: "I feel like it's a great way of solving this problem! Good job!",
    likes: 2,
    dislikes: 15,
    subComments: 1,
  },
];

const UserCommentBlock = ({ id, user, text }) => (
  <div key={id} className={` p-2 bg-white w-full ${styles["comment-block"]}`}>
    <div className="flex flex-row">
      <div className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <p className="font  text-base  text-gray-500">{user}</p>
        <p className=" text-base 	 text">{text}</p>
      </div>
    </div>
  </div>
);

const Post = () => {
  const router = useRouter();

  const [pollState, setPollState] = useState(false);

  const [negativeCommentsData, setNegativeCommentsData] = useState(
    negativeComments
  );

  const [positiveCommentsData, setPositiveCommentsData] = useState(
    positiveComments
  );

  const [textareaContent, setTextareaContent] = useState({
    negative: "",
    positive: "",
  });

  const { packageId, pollCompleted = false } = router.query;

  useEffect(() => {
    if (pollCompleted != pollState) {
      setPollState(pollCompleted);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row my-10  px-10">
        <hr />

        <div className="w-3/12 ">
          <div className="relative right-1">
            <div className="py-2 border border-green-400 border-b-0 text-center text-xl text-green-800 rounded-t">
              Arguments In Favor of Bill
            </div>
            <div
              className={`flex flex-col items-center border border-green-400 border-t-0 bg-white rounded-b`}
            >
              <div
                className={`${styles["comment-thread"]} overflow-scroll w-full`}
              >
                {positiveCommentsData.map((obj) => (
                  <UserCommentBlock {...obj} key={obj.id} />
                ))}
              </div>
              <div className="w-full bg-gray-100 p-2">
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font pl-1 pt-1 text-base text-gray-500">
                    {" "}
                    Victor{" "}
                  </span>
                </div>
                <div className="w-5/6 ml-9 mt-2">
                  <textarea
                    placeholder='New Argument for "Yes"...'
                    className="mt-0 p-2 h-24 w-full outline-none border border-black rounded-t mb-0"
                    value={textareaContent["positive"]}
                    onChange={(event) =>
                      setTextareaContent({
                        ...textareaContent,
                        positive: event.target.value,
                      })
                    }
                  />

                  <button
                    className="w-54 relative -top-2  mt-0 rounded-b w-full text-lg bg-green-700 text-white py-1 outline-none"
                    onClick={() => {
                      if (textareaContent.positive.trim() !== "") {
                        setPositiveCommentsData(
                          positiveCommentsData.concat({
                            ...currentUser,
                            text: textareaContent.positive,
                            id: Math.random().toString(36).substring(7),
                          })
                        );
                        setTextareaContent({
                          ...textareaContent,
                          positive: "",
                        });
                      }
                    }}
                  >
                    Post Argument
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-6/12 m-auto leading-7 text-xl px-10">
          <p className="text-3xl font-semibold"> For the People Act of 2021</p>
          <p className="pt-4">
            This bill addresses voter access, election integrity and security,
            campaign finance, and ethics for the three branches of government.{" "}
          </p>
          <p className="pt-4">
            Specifically, the bill expands voter registration (e.g., automatic
            and same-day registration) and voting access (e.g., vote-by-mail and
            early voting). It also limits removing voters from voter rolls.
          </p>{" "}
          <p className="pt-4">
            {" "}
            The bill requires states to establish independent redistricting
            commissions to carry out congressional redistricting.{" "}
          </p>{" "}
          <p className="pt-4">
            {" "}
            Additionally, the bill sets forth provisions related to election
            security, including sharing intelligence information with state
            election officials, supporting states in securing their election
            systems, developing a national strategy to protect U.S. democratic
            institutions, establishing in the legislative branch the National
            Commission to Protect United States Democratic Institutions, and
            other provisions to improve the cybersecurity of election systems.{" "}
          </p>{" "}
          <p className="pt-4">
            Further, the bill addresses campaign finance, including by expanding
            the prohibition on campaign spending by foreign nationals, requiring
            additional disclosure of campaign-related fundraising and spending,
            requiring additional disclaimers regarding certain political
            advertising, and establishing an alternative campaign funding system
            for certain federal offices.{" "}
          </p>
          <p className="pt-4">
            The bill addresses ethics in all three branches of government,
            including by requiring a code of conduct for Supreme Court Justices,
            prohibiting Members of the House from serving on the board of a
            for-profit entity, and establishing additional conflict-of-interest
            and ethics provisions for federal employees and the White House.{" "}
          </p>
          <p className="pt-4">
            The bill requires the President, the Vice President, and certain
            candidates for those offices to disclose 10 years of tax returns.
          </p>
          <div className="mt-5">
            <Poll />
          </div>
        </div>
        <div className="w-3/12 ">
          <div className="relative right-1">
            <div className="py-2   border border-red-600 border-b-0 text-center text-xl text-red-800 rounded-t">
              Arguments Against Bill
            </div>
            <div
              className={`flex flex-col items-center border border-red-600 border-t-0 bg-white rounded-b`}
            >
              <div className={`${styles["comment-thread"]} overflow-scroll`}>
                {negativeCommentsData.map((obj) => (
                  <UserCommentBlock {...obj} key={obj.id} />
                ))}
              </div>
              <div className="w-full bg-gray-100 p-2">
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font pl-1 pt-1 text-base text-gray-500">
                    {" "}
                    Victor{" "}
                  </span>
                </div>
                <div className="w-5/6 ml-9 mt-2">
                  <textarea
                    placeholder='New Argument for "No"...'
                    className="mt-0 p-2 h-24 w-full outline-none border border-black rounded-t mb-0"
                    value={textareaContent["negative"]}
                    onChange={(event) =>
                      setTextareaContent({
                        ...textareaContent,
                        negative: event.target.value,
                      })
                    }
                  />

                  <button
                    className="w-54 relative -top-2  mt-0 rounded-b w-full text-lg bg-red-700 text-white py-1 outline-none"
                    onClick={() => {
                      if (textareaContent.negative.trim() !== "") {
                        setNegativeCommentsData(
                          negativeCommentsData.concat({
                            ...currentUser,
                            text: textareaContent.negative,
                            id: Math.random().toString(36).substring(7),
                          })
                        );
                        setTextareaContent({
                          ...textareaContent,
                          negative: "",
                        });
                      }
                    }}
                  >
                    Post Argument
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
