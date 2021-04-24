import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.err(err))
  }

  const columns = [
    {field: 'firstname', sortable: true, filter: true, width: 130 },
    {field: 'lastname', sortable: true, filter: true, width: 130 },
    {field: 'streetaddress', sortable: true, filter: true },
    {field: 'postcode', sortable: true, filter: true, width: 130 },
    {field: 'city', sortable: true, filter: true },
    {field: 'email', sortable: true, filter: true },
    {field: 'phone', sortable: true, filter: true }
  ]



  return (
    <div className="Customerlist">
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto', marginTop: 10}}>
            <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            />
        </div> 
    </div>
  );
}

export default Customerlist;