import './App.css';
import {
  BrowserRouter as Router,
  Route,Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import HolidaysState from './Context/Holidays/HolidaysStates'
//import NoteState from './context/notes/NoteState';
import  Alert  from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Holiday from './components/Holidayslist'
import React, { useState } from 'react';
import HeaderContainer from './container/HomeContainer'
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    
      <HolidaysState>
      {/* <HeaderContainer /> */}
     
          <div className="container">
          <Router>
          <Navbar schoolName={{name:'Saraswati'}} />
          <Alert  alert={alert} />
              <Routes>
              
                <Route exact path="/" element={<Home showAlert={showAlert} />}/>
                <Route exact path="/About" element={<About/>}/>
                <Route exact path="/Holidays" element={<Holiday     />}/>
               
                <Route exact path="/Login" element={<Login  showAlert={showAlert}   />}/>
                <Route exact path="/signup" element={<Signup  showAlert={showAlert}   />}/>
              
              </Routes>
        </Router>
              {/* <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route> */}
          
          </div>
          </HolidaysState>
    </>
  );
}

export default App;