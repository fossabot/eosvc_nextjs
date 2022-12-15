import React from "react";
import { useQuery } from "react-query";
import { getEmployees } from "../../components/employee/getEmployees";
//Fetch data from API and store in cache

//const employeeCount = data;
function Main() {
  const { isLoading, isError, data, error } = useQuery(
    "employee",
    getEmployees
  );
  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error: {error}</div>;

  const employeeCount = data.length;
  const employeeSum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.salary,
    0
  );
  console.log(employeeSum);
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
    </main>
  );
}

export default Main;
