import { BiBrush } from "react-icons/bi";
import Success from "../../../components/utils/success";
import { getAccount } from "./getAccount";
import Error from "../../../components/utils/error";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChangeActionAccount } from "../../../redux/reducer";
import { getAccounts } from "./getAccounts";
import { updateAccount } from "./updateAccount";
import { useDispatch } from "react-redux";

function EditEmployeeForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //Fetch data using React Query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["accounts", formId],
    queryFn: () => getAccount(formId),
  });

  const UpdateMutation = useMutation({
    mutationFn: (newData) => updateAccount(formId, newData),
    onSuccess: async (data) => {
      // queryClient.setQueryData('users', (old) => [data])
      await queryClient.prefetchQuery({
        queryKey: ["accounts"],
        queryFn: getAccounts,
      });
      dispatch(toggleChangeActionAccount());
    },
  });

  if (isLoading) return <div>Loading...</div>;
  //if (isSuccess) return <Success>Success</Success>;
  if (isError) return <Error>Error</Error>;

  const {
    name,
    office_phone,
    website,
    fax,
    company_id,
    vat,
    email,
    billing_street,
    billing_postal_code,
    billing_city,
    billing_state,
    billing_country,
    shipping_street,
    shipping_postal_code,
    shipping_city,
    shipping_state,
    shipping_country,
    description,
    assigned_to,
    status,
    type,
    annual_revenue,
    member_of,
    industry,
  } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updated = Object.assign({}, data, formData);
    await UpdateMutation.mutate(updated);
  };

  return (
    <div className="w-full flex mx-auto justify-center items-center">
      <form className="gap-4 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col w-full p-2  overflow-x-scroll">
          <div className="flex flex-col p-2 gap-2">
            <h1>Základní údaje</h1>
            <input
              type="text"
              onChange={setFormData}
              name="name"
              defaultValue={name}
              placeholder="Název společnosti"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <input
              type="text"
              onChange={setFormData}
              name="office_phone"
              defaultValue={office_phone}
              placeholder="Telefon"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <input
              type="email"
              onChange={setFormData}
              name="email"
              defaultValue={email}
              placeholder="E-mail"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <input
              type="text"
              onChange={setFormData}
              name="website"
              defaultValue={website}
              placeholder="Webové stránky"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
            <div className="flex flex-row">
              <div className="input-type">
                <input
                  type="text"
                  onChange={setFormData}
                  name="company_id"
                  defaultValue={company_id}
                  placeholder="IČO"
                  className="border px-5 py-3 focus:outline-none rounded-md"
                />
              </div>
              <div className="input-type">
                <input
                  type="text"
                  onChange={setFormData}
                  name="vat"
                  defaultValue={vat}
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
                defaultValue={billing_street}
                placeholder="Ulice"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_postal_code"
                defaultValue={billing_postal_code}
                placeholder="PSČ"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_city"
                defaultValue={billing_city}
                placeholder="Město"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_state"
                defaultValue={billing_state}
                placeholder="Stát"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="billing_country"
                defaultValue={billing_country}
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
                defaultValue={shipping_street}
                placeholder="Ulice"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_postal_code"
                defaultValue={shipping_postal_code}
                placeholder="PSČ"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_city"
                defaultValue={shipping_city}
                placeholder="Město"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_state"
                defaultValue={shipping_state}
                placeholder="Stát"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />

              <input
                type="text"
                onChange={setFormData}
                name="shipping_country"
                defaultValue={shipping_country}
                placeholder="Země"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-row p-2 gap-5">
            <div className="w-1/2 flex flex-col p-2 gap-2">
              <h1>Klasifikace</h1>

              <input
                type="text"
                onChange={setFormData}
                name="description"
                defaultValue={description}
                placeholder="Poznámka"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
              <input
                type="text"
                onChange={setFormData}
                name="assigned_to"
                defaultValue={assigned_to}
                placeholder="Přířazený obchodník"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
              <input
                type="text"
                onChange={setFormData}
                name="type"
                defaultValue={type}
                placeholder="Typ firmy"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
            <div className="w-1/2 flex flex-col p-2 gap-2">
              <h1>Ostatní informace</h1>

              <input
                type="text"
                onChange={setFormData}
                name="annual_revenue"
                defaultValue={annual_revenue}
                placeholder="Roční obrat"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
              <input
                type="text"
                onChange={setFormData}
                name="member_of"
                defaultValue={member_of}
                placeholder="Patřící do holdingu?"
                className="border px-5 py-3 focus:outline-none rounded-md"
              />
              <input
                type="text"
                onChange={setFormData}
                name="industry"
                defaultValue={industry}
                placeholder="Odvětví"
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
                defaultChecked={status === "Active"}
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
                defaultChecked={status === "Inactive"}
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
              Upravit
              <BiBrush size={18} className="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
