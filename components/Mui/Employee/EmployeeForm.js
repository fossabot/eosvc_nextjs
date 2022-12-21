import { Grid } from "@mui/material";
import { useForm, Form } from "../useForm";
import Controls from "../../controls/Controls";
import * as empoyeeService from "../../../services/EmployeeService";

const genderItems = [
  { id: "male", title: "Muž" },
  { id: "female", title: "Žena" },
  { id: "other", title: "Ostatní" },
];

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPernament: false,
};

export default function EmployeeForm() {
  const { values, setValues, handleInputChange } = useForm(initialFValues);

  return (
    <Form>
      <Grid container className="flex flex-row space-y-2 space-x-2">
        <Grid item xs={6} className="flex flex-col space-y-2">
          <Controls.Input
            name="fullName"
            label="Celé jméno"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="E-mail"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6} className="flex flex-col">
          <Controls.RadioGroup
            row
            name="gender"
            label="Pohlaví"
            value={values.gender}
            items={genderItems}
            onChange={handleInputChange}
          />
          <Controls.Select
            name="departmentId"
            label="Oddělení"
            value={values.departmentId}
            onChange={handleInputChange}
            options={empoyeeService.getDepartmentCollection()}
          />
          <Controls.Checkbox
            name="isPernament"
            label="Is Pernament"
            value={values.isPernament}
            onChange={handleInputChange}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
