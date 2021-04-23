import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

// style
import styles from "./post.module.scss";

const mockPoll = [
  {
    question: "Do you agree with this bill?",
    answers: ["Yes", "Not", "I am not sure"],
  },
  {
    question: "Do you find it relevant for the country?",
    answers: ["Yes", "Not", "I am not sure"],
  },
  {
    question: "How old are you?",
    answers: ["<15", "15-25", "26-39", "40-59", ">59"],
  },
];
export default function Poll() {
  const [answerState, setAnswerState] = useState({
    0: { 0: false, 1: false, 2: false },
    1: { 0: false, 1: false, 2: false },
    2: { 0: false, 1: false, 2: false, 3: false, 4: false },
  });

  const router = useRouter();

  const { packageId } = router.query;

  const allAnswered = Object.values(answerState).every((obj) =>
    Object.values(obj).some((val) => val === true)
  );

  return (
    <div className="mt-10">
      <p className="text-center text-4xl mb-5">Poll </p>
      <div className="d-flex flex-col justify-center">
        {mockPoll.map(({ question, answers }, key) => {
          return (
            <div key={key} className="w-6/12 mb-12 mx-auto">
              <p className="text-2xl text-gray-800 font-medium">{question}</p>
              <ul className="pt-2">
                {answers.map((answer, answerKey) => (
                  <li
                    key={answerKey}
                    className={`border-2 bg-white flex flex-row justify-between rounded py-2 my-2 px-2 cursor-pointer ${
                      answerState[key][answerKey] ? "border-green-500" : ""
                    }`}
                    onClick={() =>
                      setAnswerState({
                        ...answerState,
                        [key]: {
                          ...answerState[key],
                          [answerKey]: !answerState[key][answerKey],
                        },
                      })
                    }
                  >
                    <span> {answer}</span>
                    {answerState[key][answerKey] && (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-center mb-12">
        <button
          className="px-10 h-11 b-2 bg-red-500 rounded text-white"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to save your changes!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, cancel it!",
            }).then(({ isConfirmed }) => {
              if (isConfirmed) {
                router.push({
                  pathname: `/posts/post/${packageId}/content`,
                  query: { ...router.query, pollCompleted: false },
                });
              }
            });
          }}
        >
          {" "}
          Cancel
        </button>
        <div className={styles.tooltip}>
          <button
            className={`px-10 h-11 b-2 ml-5 rounded text-white ${
              !allAnswered ? "cursor-not-allowed bg-blue-500" : "bg-blue-600"
            }`}
            onClick={() => {
              if (allAnswered) {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, submit my results!",
                }).then(({ isConfirmed }) => {
                  if (isConfirmed) {
                    Swal.fire(
                      "Submitted!",
                      "Your results have been submitted.",
                      "success"
                    ).then(() =>
                      router.push({
                        pathname: `/posts/post/${packageId}/content`,
                        query: { ...router.query, pollCompleted: true },
                      })
                    );
                  }
                });
              }
            }}
          >
            Submit
            {!allAnswered && (
              <span className={styles.tooltiptext}>
                Please answer on all questions before you submit them.
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
