import AddEmployeeForm from "./addEmployeeForm";
import EditEmployeeForm from "./editEmloyeeForm";

export default function Form() {
  const flag = false;
  return (
    <div className="containter w-full px-16">
      {flag ? <AddEmployeeForm /> : <EditEmployeeForm />}
    </div>
  );
}
