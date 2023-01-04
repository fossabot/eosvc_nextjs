import React from "react";
import Template from "../layout/template";
import OpenAiComponent from "../components/v2/OpenAiComponent";

function OpenAi() {
  return (
    <Template>
      <div className=" p-5 space-y-5">
        <OpenAiComponent />
      </div>
    </Template>
  );
}

export default OpenAi;
