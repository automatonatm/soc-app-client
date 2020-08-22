import React, {Component} from 'react';
import {Grid} from "@material-ui/core";

import axios from 'axios'
import Scream from "../components/scream";

class Home extends Component {
    state = {
        screams: null
    }
    componentDidMount() {
        axios.get('/screams')
            .then(({data}) => {
                    this.setState({screams: data})
            })
            .catch(error => {
                console.log(error)
            })
    }

     displayScreams = screams => {
       return  screams.map(scream => (
           <Scream scream={scream} key={scream.screamId}/>

       ))
    }


    render() {
        let {screams} = this.state

        return (
          <Grid container  spacing={16}>
              <Grid item sm={8} xs={12}>
                  {screams ? this.displayScreams(screams) : <p>Loading</p>}
              </Grid>

              <Grid item sm={4} xs={12}>
                  <p>Profile..</p>
              </Grid>

          </Grid>
        );
    }
}

export default Home;