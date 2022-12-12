import { Schema, models, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: String,
    avatar: String,
    email: String,
    salary: Number,
    date: String,
    status: String,
  },
  { collection: "Employees" }
);

const Employee = models.employee || model("user", employeeSchema);

export default Employee;
