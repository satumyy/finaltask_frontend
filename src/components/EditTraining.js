import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function EditTraining(props){
    const [open, setOpen] = React.useState(false);
    const[training, setTraining] = React.useState({
        date: new Date(),
        activity: "",
        duration: "",
        customer: ""
    })

    const handleClickOpen = () => {
      setTraining({
        date: props.training.date,
        activity: props.training.activity,
        duration: props.training.duration,
        customer: props.training.customer.id
      });
      setOpen(true);
    };
  
    const handleSave = () => {
        props.editTraining(props.training.id, training);
        setOpen(false);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name] : event.target.value});
    }



  
    return (
      <div>
        <IconButton color='primary' onClick={handleClickOpen}>
          <EditIcon />
        </IconButton> 
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit training with {props.training.customer.firstname}</DialogTitle>
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

export default EditTraining;