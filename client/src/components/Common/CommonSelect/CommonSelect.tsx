import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FocusEventHandler } from "react";

interface Props {
  name: string;
  label: string;
  value?: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  onBlur?: FocusEventHandler;
  options: { label: string; value: string }[];
  error?: boolean;
  defaultValue?: string;
  helperText?: string | false | null;
  fullWidth?: boolean;
  shouldTranslate?: boolean;
}

const CommonSelect: React.FC<Props> = ({
  label,
  error,
  helperText,
  options,
  shouldTranslate,
  ...props
}) => {

  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        label={label}
        error={error}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {shouldTranslate ? option.label : option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}

export default CommonSelect;