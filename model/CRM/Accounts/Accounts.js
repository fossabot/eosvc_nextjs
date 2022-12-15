import { Schema, models, model } from "mongoose";

const accountsSchema = new Schema(
  {
    name: String,
    office_phone: String,
    website: String,
    fax: String,
    company_id: String,
    vat: String,
    email: String,
    billing_street: String,
    billing_postal_code: String,
    billing_city: String,
    billing_state: String,
    billing_country: String,
    shipping_street: String,
    shipping_postal_code: String,
    shipping_city: String,
    shipping_state: String,
    shipping_country: String,
    description: String,
    assigned_to: String,
    status: String,
    type: String,
    annual_revenue: String,
    member_of: String,
    industry: String,
    employees: String,
  },
  { collection: "Accounts" }
);

const Accounts = models.Accounts || model("Accounts", accountsSchema);

export default Accounts;
