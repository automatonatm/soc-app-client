import React, {Component} from 'react';
import {Grid} from "@material-ui/core";


import Scream from "../components/scream";
import Profile from "../components/Profile";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {loadScreams} from "../store/actions/dataActions";

class Home extends Component {
    state = {
        screams: null
    }
    componentDidMount() {
        this.props.loadScreams()
    }

     displayScreams = screams => {
       return  screams.map(scream => (
           <Scream scream={scream} key={scream.screamId}/>

       ))
    }


    render() {

        let {screams, loading} = this.props.data

        return (

          <Grid container  spacing={16}>
              <Grid item sm={8} xs={12}>
                  {screams ? this.displayScreams(screams) : <p>Loading</p>}
              </Grid>

              <Grid item sm={4} xs={12}>
                  <Profile />
              </Grid>

          </Grid>
        );
    }
}

Home.propTypes = {
    loadScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};


const mapStateToProps  = (state) =>({
    data: state.data
})

const mapActionsToProps = {
    loadScreams
}

export default connect(
    mapStateToProps,
    mapActionsToProps)(Home);