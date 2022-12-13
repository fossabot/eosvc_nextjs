import { BiPlus } from "react-icons/bi";
import Success from "../success";
import Error from "../error";
import { useQueryClient, useMutation } from "react-query";
import { addEmployee } from "../employee/addEmployee";
import { getEmployees } from "./getEmployees";

function AddEmployeeForm({ formData, setFormData }) {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addEmployee, {
    onSuccess: () => {
      //Auto refetch data from database instead of use cached data
      queryClient.prefetchQuery("employee", getEmployees);
      console.log("Employee inserted successfully!");
    },
  });

  const handleSubmit = (e) => {
    //Prevent page reloading when update form
    e.preventDefault();
    //Check if form is not empty
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    //Destractioning the data from form to single variable
    let { firstname, lastname, email, salary, date, status } = formData;

    const model = {
      //Join First Name and Last Name
      name: `${firstname} ${lastname}`,
      //Use random user image
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      //If empty set as Active
      status: status ?? "Active",
    };
    //Store data to MongoDB using reactQuery with addEmployee function using variables store in variable model
    addMutation.mutate(model);
  };
  //If Loading, Success or Error show message
  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError)
    return <Error message={addMutation.error.message}></Error>;
  if (addMutation.isSuccess)
    return <Success message={"Nový zaměstnanec byl přidán"}></Success>;

  return (
    <form className="grid lg:grid-cols-2 gap-4">
      <h1>Add employee</h1>
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
