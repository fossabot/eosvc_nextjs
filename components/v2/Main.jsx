import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEmployees } from "../../modules/employee/getEmployees";
import { getAccounts } from "../../modules/CRM/Accounts/getAccounts";
import { getImages } from "../../modules/documents/images/getImages";
import { getAllBoards } from "../../modules/projects/apiCalls/getAllBoards";
import { MyResponsivePie } from "../nivo/PieChart";
import DashboardBox from "../dashboard/box";
import LoadingSpinner from "../loadings/LoadingSpinner";
import { useSelector } from "react-redux";
import { selectedSession } from "../../redux/sessionSlice";

function Main() {
  const session = useSelector((state) => state.session);
  console.log(session._id, "session - Main");

  //Fetch data from API backend and store in cache
  const { data: accountsData, isLoading: isLoadingAccounts } = useQuery(
    "accounts",
    getAccounts
  );
  const { data: employeesData, isLoading: isLoadingEmployee } = useQuery(
    "employees",
    getEmployees
  );
  const { data: imgData, isLoading: isLoadingImg } = useQuery(
    "images",
    getImages
  );

  const { data: projectsData, isLoading: isLoadingProjects } = useQuery(
    "projects",
    () => getAllBoards(session._id)
  );

  //wait for data to be fetched
  if (
    isLoadingAccounts ||
    isLoadingEmployee ||
    isLoadingImg ||
    isLoadingProjects
  )
    return <LoadingSpinner message={"Data se načítají"} />;
  console.log(projectsData, "projectData");
  //return console.log("stop");
  //Calculate sum of salaries
  const employeesSum = employeesData.reduce(
    (accumulator, employee) => accumulator + employee.salary,
    0
  );
  //console.log(projectsData, "projectData");
  //calculate average salary
  const employeeProxSalary = employeesSum / employeesData.length;

  return (
    <main className="bg-gray-100 rounded-sm  h-full">
      <div className="flex flex-col w-full mx-auto gap-2 place-content-start">
        <div className="flex flex-row ">
          <DashboardBox>
            <div className="flex mx-auto items-center ">
              <h1 className="font-bold pb-5">Zaměsnanci</h1>
            </div>
            <div className="w-full h-72 ">
              {
                <MyResponsivePie
                  className=""
                  employeesData={employeesData}
                  employeesSum={employeesSum}
                  employeeProxSalary={employeeProxSalary}
                />
              }
            </div>
          </DashboardBox>
          <DashboardBox>
            <div className="flex mx-auto items-center">
              <h1 className="font-bold pb-5">Zaměstnanci</h1>
            </div>
            <div>
              Počet zaměstnanců:
              <span className="font-bold">{employeesData.length}</span>
            </div>
            <div>
              Náklady za zaměstnance:
              <span className="font-bold">{employeesSum}</span>,- / měsíčně{" "}
            </div>
            <div>
              Průměrná mzda:
              <span className="font-bold">{employeeProxSalary}</span>,- /
              měsíčně
            </div>
          </DashboardBox>
        </div>
        <div className="flex flex-row">
          <DashboardBox>
            <div className="flex mx-auto items-center">
              <h1 className="font-bold pb-5">Obrázky</h1>
            </div>
            <div>
              Počet obrázků v DB:{" "}
              <span className="font-bold">{imgData.length}</span>
            </div>
          </DashboardBox>
          <DashboardBox>
            <div className="flex mx-auto items-center">
              <h1 className="font-bold pb-5">Firmy v CRM</h1>
            </div>
            <div>
              Počet firem v CRM:
              <span className="font-bold">
                {accountsData ? accountsData.length : "Nevím"}
              </span>
            </div>
          </DashboardBox>
        </div>
        <div className="flex flex-row">
          <DashboardBox>
            <div className="flex mx-auto items-center">
              <h1 className="font-bold pb-5">Projekty:</h1>
            </div>
            <div>
              Počet projektů:
              <span className="font-bold">
                {projectsData ? projectsData.length : "Nemám data"}
              </span>
            </div>
          </DashboardBox>
          <DashboardBox></DashboardBox>
        </div>
      </div>
    </main>
  );
}

export default Main;
