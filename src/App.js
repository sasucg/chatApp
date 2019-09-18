import React from 'react';
import Login from './Login.js'
import ChannelsList from './ChannelsList'
import Dashboard from './Dashboard'
import TextField from '@material-ui/core/TextField'
function App() {
  return (
    <div className="App">
        {/* <Login /> */}
        <div className="centered-div">
         <ChannelsList />
         <Dashboard />
        </div>
    </div>
  );
}

export default App;

