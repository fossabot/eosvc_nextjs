import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEmployees } from "../../components/employee/getEmployees";
import { getAccounts } from "../../components/CRM/Accounts/getAccounts";

//Fetch data from API and store in cache
//const employeeCount = data;
function Main() {
  const [employeeCount, setEmployeeCount] = useState("");
  const [accountCount, setAccountCount] = useState("");
  const [employeeSum, setEmployeeSum] = useState("");
  //Fetch Employee data

  //Fetch Accounts data
  useEffect(() => {
    fetch(`/api/accounts`)
      .then((response) => response.json())
      .then((data) => {
        setAccountCount(data.length);
      });

    fetch(`/api/employee`)
      .then((response) => response.json())
      .then((data) => {
        setEmployeeCount(data.length);
        setEmployeeSum(() => {
          const employeeSum = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.salary,
            0
          );
          return employeeSum;
        });
      });
  }, []);

  return (
    <main className="w-full h-full p-5">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      <div className="flex mx-auto p-5">
        <div className="flex  flex-col bg-gray-200 p-5 rounded-md">
          <div className="flex mx-auto items-center">
            <h1 className="font-bold pb-5">Zaměsnanci</h1>
          </div>
          <div>
            Počet zaměstnanců:{" "}
            <span className="font-bold">{employeeCount}</span>
          </div>
          <div>
            Náklady za zaměstnance:{" "}
            <span className="font-bold">{employeeSum}</span>,- / měsíčně{" "}
          </div>
        </div>
      </div>
      <div className="flex mx-auto p-5">
        <div className="flex  flex-col bg-gray-200 p-5 rounded-md">
          <div className="flex mx-auto items-center">
            <h1 className="font-bold pb-5">Firmy v CRM</h1>
          </div>
          <div>
            Počet firem v CRM:
            <span className="font-bold">{accountCount || "Nevím"}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
