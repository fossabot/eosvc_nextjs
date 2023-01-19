import { Schema, models, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    accounts_ref: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
    visibility: {
      type: String,
      default: "public",
    },
    status: {
      type: String,
      default: "new",
    },
    document_type: {
      type: String,
      default: "invoice",
    },
    invoice_type: {
      type: String,
      default: "Taxable document",
    },
    description: {
      type: String,
      default: `Invoice description`,
    },
    date_created: {
      type: Date,
    },
    date_received: {
      type: Date,
    },
    date_of_case: {
      type: Date,
    },
    date_tax: {
      type: Date,
    },
    date_due: {
      type: Date,
    },
    invoice_number: {
      type: String,
    },
    variable_symbol: {
      type: String,
    },
    constant_symbol: {
      type: String,
    },
    specific_symbol: {
      type: String,
    },
    order_number: {
      type: String,
    },
    internal_number: {
      type: String,
    },
    external_sign: {
      type: String,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: "partner",
    },
    partner_address: {
      type: Schema.Types.ObjectId,
      ref: "partner_address",
    },
    partner_VAT_number: {
      type: String,
    },
    partner_TAX_number: {
      type: String,
    },
    partner_TAX_local_number: {
      type: String,
    },
    partner_account_number: {
      type: String,
    },
    partner_account_bank_number: {
      type: Number,
    },
    partner_IBAN: {
      type: String,
    },
    partner_SWIFT: {
      type: String,
    },
    partner_BIC: {
      type: String,
    },
    invoice_currency: {
      type: String,
    },
    invoice_ammount_sum: {
      type: Number,
    },
    invoice_items: {
      type: Array,
      default: [],
    },
    invoice_file: {
      type: String,
    },
    position: {
      type: Number,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    connected_documents: {
      type: Array,
      default: [],
    },
  },
  { collection: "Invoices" }
);

const Invoice = models.Invoices || model("Invoices", invoiceSchema);
export default Invoice;
