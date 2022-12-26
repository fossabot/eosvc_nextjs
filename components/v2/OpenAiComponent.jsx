import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function OpenAiComponent() {
  const [question, setQuestion] = useState("");
  const [openAiQuestion, setOpenAiQuestion] = useState(
    `Decide whether a Tweet\'s sentiment is positive, neutral, or negative.\n\nTweet: "I loved the new Batman movie!"\nSentiment:`
  );
  const [openAiResponse, setOpenAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: openAiQuestion,
          temperature: 0,
          max_tokens: 60,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
        });
        setOpenAiResponse(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [openAiQuestion]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setOpenAiQuestion(question);
  };

  if (isLoading) return <div>Loading ...</div>;
  console.log(question, "question");
  console.log(typeof openAiResponse.data?.choices[0].text, "response");

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h1>OpenAi test</h1>
      <div>
        <div className="p-2">
          <form className="gap-2 space-x-1 px-2 border" onSubmit={handelSubmit}>
            <input
              className="border border-gray-600 p-2"
              type="text"
              name="tweet"
              placeholder="Write text here ..."
              onChange={(e) =>
                setQuestion(
                  e.target.value +
                    "Sentiment: Response only Positive or Negative"
                )
              }
            />
            <button className="bg-gray-500 rounded-md ml-2 px-5 py-2 text-white font-bold">
              Odeslat
            </button>
          </form>
        </div>
        <div
          className={`rounded-md items-center justify-center px-2
            ${
              openAiResponse.data?.choices[0].text === "Positive"
                ? `bg-green-500`
                : `bg-red-500 text-white font-bold`
            }`}
        >
          Response: {openAiResponse.data?.choices[0].text}{" "}
        </div>
      </div>
    </div>
  );
}

export default OpenAiComponent;
