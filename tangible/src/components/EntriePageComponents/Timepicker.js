import { TextField } from "@material-ui/core";

import Card from "../ui/Card";
import "react-calendar/dist/Calendar.css";

const Dater = () => {
  return (
    <Card>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* <input type="text" class="datepicker"> */}
    </Card>
  );
};

export default Dater;
