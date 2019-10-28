import React from 'react';
import './App.css';
import SignIn from './components/login/SignIn';
import SignUp from './components/signup/SignUp';
import Main from './components/weather/Main';
import Routes from './components/routes/Routes';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
