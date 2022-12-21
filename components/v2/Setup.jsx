import { useMutation } from "react-query";
import { addIndustry } from "../CRM/Setup/Industry/addIndustry";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function SetupComponent() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const addMutation = useMutation(addIndustry, {
    onSuccess: () => {
      //Auto refetch data from database instead of use cached data
      console.log("Industry inserted successfully!");
    },
  });

  const handleSubmit = (e) => {
    //Prevent page reloading when update form
    e.preventDefault();
    //Check if form is not empty
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    //Destractioning the data from form to single variable
    let { industry } = formData;

    const model = {
      //Join First Name and Last Name
      name: industry,
    };
    //Store data to MongoDB using reactQuery with addEmployee function using variables store in variable model
    addMutation.mutate(model);
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-row justify-start items-center p-5">
        <div className="flex flex-col">
          <h1>CRM</h1>
          <form className="space-x-5">
            <label htmlFor="industry">Odvětví: </label>
            <input
              className="border rounded-md"
              onChange={setFormData}
              type="text"
              name="industry"
              id="industry"
            />
            <button
              onClick={handleSubmit}
              className="bg-gray-500 rounded-md text-white font-bold py-2 px-5"
            >
              Přidat
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SetupComponent;
