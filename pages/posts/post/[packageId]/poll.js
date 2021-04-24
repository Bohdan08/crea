import React, { useState } from "react";
import Swal from "sweetalert2";

const mockPoll = [
  {
    question: "Do you agree with this bill?",
    answers: ["Yes", "Not"],
  },
];
export default function Poll() {
  const [answerState, setAnswerState] = useState({
    0: { 0: false, 1: false, 2: false },
  });

  const [results, setResults] = useState(false);

  return !results ? (
    <div>
      <div className="w-full mt-5 border-2 py-5 px-2 bg-white rounded">
        <div className="w-12/12 d-flex flex-col justify-center">
          {mockPoll.map(({ question, answers }, key) => {
            return (
              <div key={key} className="w-11/12 mb-5 mx-auto">
                <p className="text-2xl text-gray-800 font-medium">{question}</p>
                <ul className="pt-2">
                  {answers.map((answer, answerKey) => (
                    <li
                      key={answerKey}
                      className={`border-2 bg-white flex flex-row justify-between rounded py-2 my-2 px-2 cursor-pointer ${
                        answerState[key][answerKey] ? "border-green-500" : ""
                      }`}
                      onClick={() => {
                        setAnswerState({
                          ...answerState,
                          [key]: {
                            ...answerState[key],
                            [answerKey]: !answerState[key][answerKey],
                          },
                        });
                        Swal.fire(
                          "Submitted!",
                          "Your results have been submitted.",
                          "success"
                        ).then(() => {
                          setResults(true);
                        });
                      }}
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
      </div>
    </div>
  ) : null;
}
