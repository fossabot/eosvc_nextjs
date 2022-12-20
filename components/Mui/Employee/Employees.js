import PageHeader from "../PageHeader";
import { PeopleOutlineTwoTone } from "@mui/icons-material";
import EmployeeForm from "./EmployeeForm";

export default function Employees() {
  return (
    <div className="flex flex-col px-2">
      <div>
        <PageHeader
          title="Page Header"
          subTittle="Page description"
          icon={<PeopleOutlineTwoTone />}
        />
      </div>
      <div className="">
        <EmployeeForm />
      </div>
    </div>
  );
}
