import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";

export default function RadioGroup(props) {
  const { name, label, value, onChange, items } = props;
  return (
    <FormControl className="gap-2">
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
