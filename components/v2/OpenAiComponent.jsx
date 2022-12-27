import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
//import { configuration } from "../../hidden_public/openAIApiConfig";

/*
Configuration options:
apiKey: string
    The API key to use when making requests to the OpenAI API. This is required.

engine: string
    The name of the OpenAI engine to use when making requests to the API. This is optional and will default to "text-davinci-002" if not provided.

maxTokens: number
    The maximum number of tokens (words or word pieces) that the API will generate in a single request. This is optional and will default to 2048 if not provided.

temperature: number
    The temperature to use when generating text. This is optional and will default to 0.5 if not provided.

topP: number
    The top-p value to use when generating text. This is optional and will default to 1 if not provided.

presencePenalty: number
    The presence penalty to use when generating text. This is optional and will default to 0 if not provided.

OpenAIApi options: 
config: Configuration
    An instance of the Configuration class, containing the API key and other configuration options to use when making requests to the OpenAI API. This is required.

baseUrl: string
    The base URL to use when making requests to the OpenAI API. This is optional and will default to "https://api.openai.com" if not provided.
*/
//const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function OpenAiComponent() {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

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
              openAiResponse.data?.choices[0].text.includes("Positive")
                ? `bg-green-500 text-white font-bold`
                : `bg-red-500 text-white font-bold`
            }`}
        >
          Your text is: {openAiResponse.data?.choices[0].text}{" "}
        </div>
      </div>
    </div>
  );
}

export default OpenAiComponent;
