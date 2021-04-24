import './App.css';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './components/Customerlist';
import Trainings from './components/Trainings';




function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event,value) => {
    setValue(value);
  };



  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Customers" />
            <Tab value="two" label="Trainings"/>
          </Tabs>
        </Toolbar>
      </AppBar>
      {value===   'one'&&   <Customerlist />}
      {value===   'two'&&   <Trainings />}
    </div>
  );
}

export default App;
