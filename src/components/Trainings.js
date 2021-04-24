import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainings() {

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.err(err))
  }

  const columns = [
    {
      field: 'date', 
      valueFormatter: function (params) {
        return moment(params.date).format('LLL');
      }, 
      sortable: true, 
      filter: true 
    },
    {field: 'activity', sortable: true, filter: true },
    {field: 'duration', sortable: true, filter: true },
    {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true }
  ]



  return (
    <div className="trainings">
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto', marginTop: 10}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />
        </div> 
    </div>
  );
}

export default Trainings;