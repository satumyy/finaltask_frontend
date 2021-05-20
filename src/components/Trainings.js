import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainings() {

  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchTrainings();
    fetchCustomers();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.err(err))
  }

  
  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.err(err))
  }

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')){
      fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE'})
      .then(response => {
        if (response.ok){
          openSnackbar();
          fetchTrainings();
        }
        else{
          alert('Something went wrong!');
        }
      })
      .catch(err => console.error(err))
    }
  }

  const addTraining = (newTraining) => {
    newTraining.customer = "https://localhost:8080/api/customers/" + newTraining.customer;
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      body: JSON.stringify(newTraining),
      headers: { 'Content-type' : 'application/json'}
    })
    .then(response => {
      if (response.ok){
        alert('ok');
        fetchTrainings();
      }
      else{
        alert('Something went wrong');
      }
    })
    .catch(err => console.error(err))
  }

  const editTraining = (id,updatedTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE'})
    .then(response => {
      if (response.ok){
        updatedTraining.customer = "https://localhost:8080/api/customers/" + updatedTraining.customer;
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          body: JSON.stringify(updatedTraining),
          headers: { 'Content-type' : 'application/json'}
        })
        .then(response => {
          if (response.ok)
            fetchTrainings();
          else
            alert('Something went wrong');
        })
      }
      else
        alert('Something went wrong!');
    })
    .catch(err => console.error(err))
  }

  const columns = [
    {
      field: 'date', 
      valueFormatter: function (date) {
        return moment(date.value).format('LLL');
      }, 
      sortable: true, 
      filter: true 
    },
    {field: 'activity', sortable: true, filter: true },
    {field: 'duration', sortable: true, filter: true },
    {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true },
    {headerName: '', field: 'customer.lastname', sortable: true, filter: true },
    {
      headerName:'',
      field: 'id',
      width: 100,
      cellRendererFramework: params =>
      <EditTraining link={params.value} training={params.data} editTraining={editTraining} />
    },
    {
      headerName: '',
      field: 'id',
      width: 100,
      cellRendererFramework: params => 
      <IconButton color='secondary' onClick={() => deleteTraining(params.value)}>
        <DeleteIcon />
      </IconButton> 
    }
  ]



  return (
    <div className="trainings">
        <AddTraining addTraining={addTraining} customers={customers}/>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto', marginTop: 10}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        <Snackbar
          open={open}
          message="Training deleted"
          autoHideDuration={3000}
          onClose={closeSnackbar}
        />
    </div>
  );
}

export default Trainings;