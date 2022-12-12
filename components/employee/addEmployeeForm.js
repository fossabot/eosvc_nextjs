import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "../success";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function AddEmployeeForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "handleSubmit");
  };

  if (Object.keys(formData).length > 0)
    return <Success message="Data úspěšně přidána" />;

  return (
    <form className="grid lg:grid-cols-2 gap-4">
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          placeholder="Jméno"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="lastname"
          placeholder="Příjmení"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="email"
          onChange={setFormData}
          name="email"
          placeholder="E-mail"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="salary"
          placeholder="Plat"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="dateOfBirth"
          placeholder="Plat"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            name="status"
            value="Active"
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-500">
            Aktivní
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            name="status"
            value="Inactive"
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-500">
            Neaktivní
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="flex justify-center items-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 gap-2"
      >
        Přidat
        <BiPlus size={18} className="" />
      </button>
    </form>
  );
}

export default AddEmployeeForm;
