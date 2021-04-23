import React, { useState } from "react";

// style
import styles from "./post.module.scss";

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

const currentUser = { user: "Victor", likes: 0, dislikes: 0 };

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

const UserCommentBlock = ({ id, user, text, likes, dislikes }) => (
  <div
    key={id}
    className={`w-5/6 border-2 p-2 mb-5 rounded bg-white ${styles["comment-block"]}`}
  >
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
      <p className="font-semibold pl-1 text-lg relative top-0.5">{user}</p>
    </div>
    <p className="py-2 text-lg">{text}</p>
    <hr />
    <div className="flex flex-row pt-2">
      <div className="flex flex-row text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <span className="pl-1">{likes} </span>
      </div>
      <div className="flex flex-row text-red-600 pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 relative top-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
        </svg>
        <span className="pl-1">{dislikes} </span>
      </div>
    </div>
  </div>
);

const ArgumentButton = ({ positive, negative }) => (
  <button className="w-54  mt-3 rounded w-5/6 text-lg bg-blue-500 text-white py-1">
    Post Argument
  </button>
);

export default function Debates() {
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

  return (
    <div className="mt-10  border-0">
      <p className="text-4xl text-center"> Do you support this bill? </p>
      <div className="flex flex-row mt-5">
        <div className="w-2/12 border-0 border-red-400"></div>
        <div className="w-8/12 border-0 border-blue-400">
          {/* <div className="flex flex-row justify-center items-center">
            <div className="w-48 px-2 py-2 bg-green-200 border-2 border-green-600 text-right text-xl text-green-800 rounded">
              {" "}
              Yes{" "}
            </div>
            <div className="rounded-full mx-2 h-16 w-16 flex items-center flex-row justify-center border-8 border-green-700">
              <div className="rounded-full h-11 w-11 flex items-center flex-row justify-center border-2 border-gray-400">
                <div className="rounded-full h-6 w-6 bg-gray-400"></div>
              </div>
            </div>
            <div> No </div>
          </div> */}

          <div className="flex flex-row justify-center items-center items-stretch ">
            <div className="w-1/2  relative left-1">
              <div className="py-2 bg-green-200 border-2 border-r-0 border-green-600 text-center text-xl text-green-800 rounded-l">
                Yes
              </div>
              <div className="pt-4 flex flex-col  items-center border-r-0 border-gray-500 mt-2">
                {positiveCommentsData.map((obj) => (
                  <UserCommentBlock {...obj} />
                ))}
                <textarea
                  placeholder='New Argument for "Yes"...'
                  className="w-5/6  border-2 rounded-lg p-2"
                  value={textareaContent["positive"]}
                  onChange={(event) =>
                    setTextareaContent({
                      ...textareaContent,
                      positive: event.target.value,
                    })
                  }
                />
                <button
                  className="w-54  mt-3 rounded w-5/6 text-lg bg-blue-500 text-white py-1"
                  onClick={() => {
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
                  }}
                >
                  Post Argument
                </button>
              </div>
            </div>
            <div className="border border-gray-200  z-0 relative -left-0.5"></div>

            <div className="w-1/2 z-10 relative right-1">
              <div className="py-2 bg-red-200 border-2 border-l-0 border-red-600 text-center text-xl text-red-800 rounded-r">
                No
              </div>
              <div className="pt-4 flex flex-col  items-center border-r-0 border-gray-500 mt-2">
                {negativeCommentsData.map((obj) => (
                  <UserCommentBlock {...obj} />
                ))}
                <textarea
                  placeholder='New Argument for "No"...'
                  className="w-5/6 border-2 rounded-lg p-2"
                  value={textareaContent["negative"]}
                  onChange={(event) =>
                    setTextareaContent({
                      ...textareaContent,
                      negative: event.target.value,
                    })
                  }
                />
                <button
                  className="w-54  mt-3 rounded w-5/6 text-lg bg-blue-500 text-white py-1"
                  onClick={() => {
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
                  }}
                >
                  Post Argument
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/12 border-0 border-green-400"></div>
      </div>
    </div>
  );
}
