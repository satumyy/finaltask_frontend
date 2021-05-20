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


    console.log(JSON.stringify(trainings));
/*
    {"id":250,
    "date":"2021-05-19T18:28:48.140+00:00",
    "duration":60,"activity":"Fitness",
    "customer":{"id":233,"firstname":"Mary","lastname":"Philips","streetaddress":"Hill Street 3","postcode":"23322","city":"Flintsone","email":"m.philips@mail.com","phone":"232-310123"}}
    */
    let events = [];
    for(const training of trainings) {
        const endTime = new Date(Date.parse(training.date)+1000*60*training.duration).toISOString().substr(0,19)+"+00:00";
        events.push({
            id: training.id,
            color: '#fd3153',
            from: training.date,
            to: endTime,
            title: training.activity + ' with ' + training.customer.firstname + ' ' + training.customer.lastname
        });
    }


/*
    const events = [{
        id: 1,
        color: '#fd3153',
        from: '2021-05-02T18:00:00+00:00',
        to: '2021-05-05T19:00:00+00:00',
        title: 'This is an event'
    }, {
        id: 2,
        color: '#1ccb9e',
        from: '2021-05-01T13:00:00+00:00',
        to: '2021-05-05T14:00:00+00:00',
        title: 'This is another event'
    }, {
        id: 3,
        color: '#3694DF',
        from: '2019-05-05T13:00:00+00:00',
        to: '2019-05-05T20:00:00+00:00',
        title: 'This is also another event'
    }];
    */
    
        
    return (
        <div style={{width: '80%', margin: 'auto', marginTop: 10}}>
            <Calendar
                events={events}
            />
        </div>
        
    );
        
    

}

export default CalendarPage;

