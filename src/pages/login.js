import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import {Grid, Typography} from "@material-ui/core";


//Images
import AppLogo from '../images/icon.png'
import TextField from "@material-ui/core/TextField";
import Buttons from "../components/UI/Button";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {loginUser} from "../store/actions/userActions";


const styles =  theme => ({
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    form : {
        textAlign : 'center'
    },
    image: {
        margin: '10px auto 10px auto'
    },
    textField: {
      margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: 'green',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    customError: {
        color: 'red !important',
        fontSize: '0.8rem'
    }
})



class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({errors: nextProps.UI.errors })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const formData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(formData, this.props.history)
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {classes, UI: {loading}} = this.props
        const {email, password, errors} = this.state
        return (
           <Grid container
                 item  sm
                 className={classes.form}
                 direction="column"
                 justify="center"
                 alignItems="center">
               <img  src={AppLogo} alt="App Logo"  className={classes.image} />
               <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
               <form noValidate onSubmit={this.handleSubmit}>
                   <TextField
                       label="Email"
                       className={classes.textField}
                       type="email"
                       name="email"
                       id="email"
                       autoComplete="email"
                       value={email}
                       onChange={this.handleChange}
                       fullWidth
                       helperText={errors ? errors.email : ''}
                       error={errors ? !!errors.email : false }
                   />


                   <TextField
                       label="Password"
                       className={classes.textField}
                       type="password"
                       name="password"
                       id="password"
                       autoComplete="password"
                       value={password}
                       onChange={this.handleChange}
                       fullWidth
                       helperText={errors ? errors.password : ''}
                       error={errors ? !!errors.password : false }
                   />

                   {errors ? errors.general ? <Typography variant='body2' className={classes.customError} >{errors.general}</Typography> : '' : ''}

                   <Buttons loading={loading} action="Login"/>
                   <small>Don't have account? <Link  to={"/signup"}>Sign Up Here</Link></small>


               </form>

           </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
    UI: PropTypes.func.isRequired,
};


const mapStateToProps  = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(
    mapStateToProps, mapActionsToProps
)(withStyles(styles)(Login));
