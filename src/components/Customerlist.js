import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {

  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.err(err))
  }

  const deleteCustomer = (url) => {
    if (window.confirm('Are you sure?')){
      fetch(url, { method: 'DELETE'})
      .then(response => {
        if (response.ok){
          openSnackbar();
          fetchCustomers();
        }
        else{
          alert('Something went wrong!');
        }   
      })
      .catch(err => console.error(err))
    }
  }

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: { 'Content-type' : 'application/json'}
    })
    .then(response => {
      if (response.ok)
        fetchCustomers();
      else
        alert('Something went wrong');
    })
    .catch(err => console.error(err))
  }

  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomer),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok)
        fetchCustomers();
      else
        alert('Something went wrong');
    })
    .catch(err => console.error(err))
  }

  const columns = [
    {field: 'firstname', sortable: true, filter: true, width: 130 },
    {field: 'lastname', sortable: true, filter: true, width: 130 },
    {field: 'streetaddress', sortable: true, filter: true },
    {field: 'postcode', sortable: true, filter: true, width: 120 },
    {field: 'city', sortable: true, filter: true, width: 130 },
    {field: 'email', sortable: true, filter: true, width: 150},
    {field: 'phone', sortable: true, filter: true },
    {
      headerName:'',
      field: 'links.0.href',
      width: 100,
      cellRendererFramework: params =>
      <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
    },
    {
      headerName: '',
      field: 'links.0.href',
      width: 100,
      cellRendererFramework: params => 
      <IconButton color='secondary' onClick={() => deleteCustomer(params.value)}>
        <DeleteIcon />
      </IconButton> 
    }
  ]



  return (
    <div className="Customerlist">
        <AddCustomer addCustomer={addCustomer}/>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto', marginTop: 10}}>
          <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
        <Snackbar
          open={open}
          message="Customer deleted"
          autoHideDuration={3000}
          onClose={closeSnackbar}
        />
    </div>
  );
}

export default Customerlist;