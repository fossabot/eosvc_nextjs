import React from "react";
import Template from "../layout/template";
import OpenAiComponent from "../components/v2/OpenAiComponent";

function Demo() {
  return (
    <Template>
      <div className="border border-blue-500 p-5 space-y-5">
        <OpenAiComponent />
      </div>
    </Template>
  );
}

export default Demo;
