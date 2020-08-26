import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import {Link} from "react-router-dom";

import {connect} from "react-redux";

import ToolTipBtn from "../util/ToolTipBtn";
import AddIcon from  '@material-ui/icons/Add'
import HomeIcon from  '@material-ui/icons/Home'
import Notifications from  '@material-ui/icons/Notifications'


class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (

            <div>
                    <AppBar >
                    <Toolbar className="nav-container">
                        {authenticated ?
                            (
                                <Fragment>
                                    <ToolTipBtn tip="Post a Scream!" placement="bottom" >
                                        <AddIcon color="primary" />
                                    </ToolTipBtn>

                                    <ToolTipBtn tip="Home"  placement="bottom" >
                                        <Link to="/">
                                            <HomeIcon color="primary"/>
                                        </Link>
                                    </ToolTipBtn>


                                    <ToolTipBtn tip="Post a Scream!" placement="bottom"  >
                                        <Notifications color="primary" />
                                    </ToolTipBtn>


                                </Fragment>
                            ) :
                            (
                                <Fragment>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/">Home</Button>
                                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                                </Fragment>
                            )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.object.isRequired
};


const mapStateToProps  = state => ({
    authenticated: state.user.authenticated
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);