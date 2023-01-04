import AddAccountForm from "./Accounts/addAccountForm";
import EditAccountForm from "./Accounts/editAccountForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function CrmForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);
  //console.log(formId, "form.js formId");

  return (
    <div className="flex mx-auto justify-center items-center w-full text-sm">
      {formId
        ? EditAccountForm({ formId, formData, setFormData })
        : AddAccountForm({ formData, setFormData })}
    </div>
  );
}
