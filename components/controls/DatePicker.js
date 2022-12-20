import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function DatePicker(props) {
  const [valueDate, setValueDate] = React.useState(dayjs("2022-04-07"));

  const { name, label, value, onChange } = props;

  //Checkbox doesn't have a value but have a e.target.checked, this function converts it to right value!!!
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDatePicker
          name={name}
          label={label}
          value={value}
          onChange={(e) => onChange(convertToDefEventPara(name, e))}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
