import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter,Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import {makeStyles} from '@material-ui/core/styles';
  
function App() {
  const useStyles=makeStyles(()=>({
    App:{
       backgroundColor : "#14161a",
       color : "white",
       minHeight : "100vh",
    },
  }));
   
  const classes= useStyles(); 
   
  return (
    <BrowserRouter>
    <div className={classes.App}>
        <Header />
      <Routes>
        <Route path='/' element={<Homepage />} component={Homepage} exact/>
        <Route path='/coins/:id' element={<Coinpage />} component={Coinpage}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
