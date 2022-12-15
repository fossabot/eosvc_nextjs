import { BiPlus } from "react-icons/bi";
//import Success from "../success";
//import Error from "../error";
import { useQueryClient, useMutation } from "react-query";
import { addAccount } from "../Accounts/addAccount";
import { getAcounts } from "./getAccounts";

function AddAccountForm({ formData, setFormData }) {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addAccount, {
    onSuccess: () => {
      //Auto refetch data from database instead of use cached data
      queryClient.prefetchQuery("accounts", getAccounts);
      console.log("Account inserted successfully!");
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
    <div className="w-full flex mx-auto justify-center items-center">
      <form className="gap-4 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col w-full p-2">
          <div className="flex flex-col p-2 gap-2">
            <h1>Základní údaje</h1>
            <input
              type="text"
              onChange={setFormData}
              name="name"
              placeholder="Název společnosti"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <input
              type="text"
              onChange={setFormData}
              name="office_phone"
              placeholder="Telefon"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <input
              type="email"
              onChange={setFormData}
              name="email"
              placeholder="E-mail"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <input
              type="text"
              onChange={setFormData}
              name="website"
              placeholder="Webové stránky"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <div className="flex flex-row">
              <div className="input-type">
                <input
                  type="text"
                  onChange={setFormData}
                  name="company_id"
                  placeholder="IČO"
                  className="border px-5 py-3 focus:outline-none rounded-md"
                />
              </div>
              <div className="input-type">
                <input
                  type="text"
                  onChange={setFormData}
                  name="vat"
                  placeholder="DIČ"
                  className="border px-5 py-3 focus:outline-none rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full mx-auto">
            <div className="w-1/2 flex flex-col p-2 gap-2">
              <h1>Sídlo společosti</h1>

              <input
                type="text"
                onChange={setFormData}
                name="billing_street"
                placeholder="Ulice"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_postal_code"
                placeholder="PSČ"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_city"
                placeholder="Město"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_state"
                placeholder="Stát"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_country"
                placeholder="Země"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
            <div className="w-1/2 flex flex-col p-2 gap-2">
              <h1>Korespondenční adresa</h1>

              <input
                type="text"
                onChange={setFormData}
                name="shipping_street"
                placeholder="Ulice"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_postal_code"
                placeholder="PSČ"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_city"
                placeholder="Město"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_state"
                placeholder="Stát"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_country"
                placeholder="Země"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col p-2 gap-5">
            <div className="flex gap-10 items-center">
              <input
                type="radio"
                onChange={setFormData}
                name="status"
                value="Active"
                id="radioDefault1"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault1"
                className="inline-block text-gray-500"
              >
                Aktivní
              </label>

              <input
                type="radio"
                onChange={setFormData}
                name="status"
                value="Inactive"
                id="radioDefault2"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault2"
                className="inline-block text-gray-500"
              >
                Neaktivní
              </label>
            </div>
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 gap-2"
            >
              Přidat
              <BiPlus size={18} className="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAccountForm;
