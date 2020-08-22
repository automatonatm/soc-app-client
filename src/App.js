import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';

import jwtDecode from  'jwt-decode'

import { MuiThemeProvider,  createMuiTheme } from '@material-ui/core/styles'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signUp'

//components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

//Redux
import  {Provider} from  'react-redux'
import  store from './store/store'

//theme
import Theme from './util/theme'


const theme = createMuiTheme(Theme)

let authenticated;

const token = localStorage.FBidToken
if(token) {
    const  decodeToken = jwtDecode(token)
    if(decodeToken.exp * 1000 < Date.now()) {
        window.location.href =  '/login'
        authenticated = false
    }else {
        authenticated = true
    }
}

function App() {
  return (
       <MuiThemeProvider theme={theme}>
           <Provider store={store}>
           <div className="App">
               <Router>
                   <Navbar />
                   <div className="container">
                       <Switch>
                           <Route exact path="/" component={home} />
                           <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
                           <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
                       </Switch>
                   </div>
               </Router>
           </div>
           </Provider>
       </MuiThemeProvider>
  );
}

export default App;
