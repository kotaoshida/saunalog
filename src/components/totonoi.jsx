import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {


  const handleChange = (event) => {
    props.setTotonoi(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">ととのえた？</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={props.totonoi} onChange={handleChange}>
          <div>
        <FormControlLabel value="0" control={<Radio />} label="ととのった〜！" />
        <FormControlLabel value="1"  control={<Radio />} label="ととのえなかった。。" />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
