import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';

import jwtDecode from  'jwt-decode'

import { MuiThemeProvider,  createMuiTheme } from '@material-ui/core/styles'


import {SET_AUTHENTICATED} from './store/types'
import {logoutUser, getUserData } from  './store/actions/userActions'
import  axios from 'axios'

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



const token = localStorage.FBidToken
if(token) {
    const  decodeToken = jwtDecode(token)
    if(decodeToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser())
        window.location.href =  '/login'

    }else {
       store.dispatch({type: SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token
        store.dispatch(getUserData())

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
                           <AuthRoute exact path="/login" component={login}  />
                           <AuthRoute exact path="/signup" component={signup}  />
                       </Switch>
                   </div>
               </Router>
           </div>
           </Provider>
       </MuiThemeProvider>
  );
}

export default App;
