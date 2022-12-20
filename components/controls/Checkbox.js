import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckBox,
} from "@mui/material";

export default function Checkbox(props) {
  const { name, label, value, onChange } = props;

  //Checkbox doesn't have a value but have a e.target.checked, this function converts it to right value!!!
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckBox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
