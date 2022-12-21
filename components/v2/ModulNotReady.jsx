import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEmployees } from "../employee/getEmployees";
import { getAccounts } from "../CRM/Accounts/getAccounts";

//Fetch data from API and store in cache
//const employeeCount = data;
function ModulNotReady() {
  return (
    <main className="flex justify-center items-center bg-gray-100 rounded-sm  h-full">
      <h1>Modul se připravuje</h1>
    </main>
  );
}

export default ModulNotReady;
