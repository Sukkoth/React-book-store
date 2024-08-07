import { TextField } from "@mui/material";

type Props = {
  value?: string;
  name: string;
};

function ShowFieldValue({ value, name }: Props) {
  return (
    <TextField
      InputProps={{
        readOnly: true,
      }}
      name={name}
      defaultValue={value}
      label={name}
      variant='outlined'
      type='text'
      sx={{ width: "100%", marginBlock: "1rem" }}
    />
  );
}

export default ShowFieldValue;
