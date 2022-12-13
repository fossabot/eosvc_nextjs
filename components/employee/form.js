import AddEmployeeForm from "./addEmployeeForm";
import EditEmployeeForm from "./editEmloyeeForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);

  console.log(formId, "form.js formId");

  return (
    <div className="containter w-full px-16">
      {formId
        ? EditEmployeeForm({ formId, formData, setFormData })
        : AddEmployeeForm({ formData, setFormData })}
    </div>
  );
}
