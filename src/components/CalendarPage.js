import React, {useState, useEffect} from 'react';
import Calendar from 'react-awesome-calendar';


function CalendarPage(){
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
  
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


    let events = [];
    for(const training of trainings) {
        const endTime = new Date(Date.parse(training.date)+1000*60*training.duration).toISOString().substr(0,19)+"+00:00";
        const customerColor = Math.floor(training.customer.id/400*16777215).toString(16);
        events.push({
            id: training.id,
            color: '#' + customerColor.substring(1,5),
            from: training.date,
            to: endTime,
            title: training.activity + ' with ' + training.customer.firstname + ' ' + training.customer.lastname
        });
    }

    console.log(events);
    
        
    return (
        <div style={{width: '80%', margin: 'auto', marginTop: 10}}>
            <Calendar
                events={events}
            />
        </div>
        
    );

}

export default CalendarPage;


