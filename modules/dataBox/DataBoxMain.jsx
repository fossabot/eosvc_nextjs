import React from "react";
import { getMessageList } from "./soapCall";

const DataBoxMain = () => {
  const message = getMessageList();
  console.log(message, "Message");
  return (
    <div>
      <h1>Datová schránka</h1>
    </div>
  );
};

export default DataBoxMain;
