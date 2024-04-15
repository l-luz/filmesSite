import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultipleSelectCheckbox({ title, options, setSelected }) {
  const [selOpt, setSelOpt] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelOpt(value);
    setSelected(value.map((s) => s.id));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selOpt}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          renderValue={(selected) => {
            return selected.map((s) => s.name).join(", ");
          }}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt.id} value={opt}>
              <Checkbox checked={selOpt.indexOf(opt) > -1} />
              <ListItemText primary={opt.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}