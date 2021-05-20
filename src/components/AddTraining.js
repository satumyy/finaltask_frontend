import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete'

function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const[training, setTraining] = React.useState({
        date: new Date(),
        activity: "",
        duration: "",
        customer: ""
    });

    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name] : event.target.value});
    };

    const inputChangedSelection = (event,value) => {
      setTraining({...training, customer : value.links[0].href.replace("https://customerrest.herokuapp.com/api/customers/","")});
    };
  
    return (
      <div>
        <Button style={{ marginTop: 10 }}variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add training</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker style={{marginTop: 16, marginRight: 10}} value={training.date} onChange={date => setTraining({...training, ["date"]: date.toISOString()})} />
            </MuiPickersUtilsProvider>

            <TextField
              margin="dense"
              label="Activity"
              name="activity"
              value={training.activity}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Duration minutes"
              name="duration"
              value={training.duration}
              onChange={inputChanged}
              fullWidth
            />

            <Autocomplete
              options={props.customers}
              getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
              style={{ width: 300, marginTop: 10 }}
              onChange={inputChangedSelection}
              name="customer"
              renderInput={(params) => <TextField {...params} value={training.customer} label="Select customer" variant="outlined" />}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

}

export default AddTraining;