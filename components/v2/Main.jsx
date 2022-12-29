import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEmployees } from "../employee/getEmployees";
import { getAccounts } from "../CRM/Accounts/getAccounts";
import { getImages } from "../documents/images/getImages";
import { MyResponsivePie } from "../nivo/PieChart";

//Fetch data from API and store in cache
//const employeeCount = data;
function Main() {
  const [employeeCount, setEmployeeCount] = useState(0);
  //const [accountCount, setAccountCount] = useState(0);
  const [employeeSum, setEmployeeSum] = useState(0);
  // const [imagesCount, setImagesCount] = useState(0);
  //const [isLoading, setIsLoading] = useState(true);
  //Fetch Employee data

  const { data: accountsData, isLoading } = useQuery("accounts", getAccounts);

  const { data: employeesData, isLoading: isLoadingEmployee } = useQuery(
    "employees",
    getEmployees
  );

  const { data: imgData, isLoading: isLoadingImg } = useQuery(
    "images",
    getImages
  );

  //console.log(accountsData.length, "accountsData");
  //Fetch Accounts data
  useEffect(() => {
    try {
      /*
      fetch(`/api/accounts`)
        .then((response) => response.json())
        .then((data) => {
          setAccountCount(data.length);
        });
*/
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
      /*
      fetch(`/api/documents/images`)
        .then((response) => response.json())
        .then((data) => {
          setImagesCount(data.length);
        });
        */
    } catch (error) {
      console.log(error);
    }
    //setIsLoading(false);
  }, []);

  const employeeProxSalary = employeeSum / employeeCount;

  const data = [
    {
      id: "Počet zaměstnanců",
      label: "Počet zaměstnanců",
      value: employeeCount,
      color: "green",
    },
    {
      id: "Náklady na zaměstnance",
      label: "Náklady na zaměstnance",
      value: employeeSum,
      color: "green",
    },
    {
      id: "Průměrná mzda",
      label: "Průměrná mzda",
      value: employeeProxSalary,
      color: "blue",
    },
  ];

  if (isLoading || isLoadingEmployee || isLoadingImg)
    return <div>Dashboar se načítá ...</div>;

  console.log(employeesData, "employeeData");

  //console.log(data);

  return (
    <main className="bg-gray-100 rounded-sm  h-full">
      <div className="flex flex-col w-full mx-auto gap-4 place-content-start">
        <div className="flex flex-row ">
          <div className="flex flex-row mx-auto p-2 ">
            <div className="flex  flex-col bg-gray-200 p-5 rounded-md ">
              <div className="flex mx-auto items-center ">
                <h1 className="font-bold pb-5">Zaměsnanci</h1>
              </div>
              <div className="w-full h-72 ">
                <MyResponsivePie className="" data={data} />
              </div>
            </div>
          </div>
          <div className="flex mx-auto p-2 w-full">
            <div className="flex flex-col w-full bg-gray-200 p-5 rounded-md">
              <div className="flex mx-auto items-center">
                <h1 className="font-bold pb-5">Zaměsnanci</h1>
              </div>
              <div>
                Počet zaměstnanců:{" "}
                <span className="font-bold">{employeesData.length}</span>
              </div>
              <div>
                Náklady za zaměstnance:{" "}
                <span className="font-bold">{employeeSum}</span>,- / měsíčně{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex mx-auto p-5">
            <div className="flex  flex-col bg-gray-200 p-5 rounded-md">
              <div className="flex mx-auto items-center">
                <h1 className="font-bold pb-5">Obrázky</h1>
              </div>
              <div>
                Počet obrázků v DB:{" "}
                <span className="font-bold">{imgData.length}</span>
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
                <span className="font-bold">
                  {accountsData ? accountsData.length : "Nevím"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
