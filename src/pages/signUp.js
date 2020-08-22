import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import {Grid, Typography} from "@material-ui/core";
import axios from 'axios'

//Images
import AppLogo from '../images/icon.png'
import TextField from "@material-ui/core/TextField";
import Buttons from "../components/UI/Button";
import {Link} from "react-router-dom";



import {connect} from "react-redux";
import { signUpUser} from "../store/actions/userActions";


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



class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            error: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({errors: nextProps.UI.errors})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const formData = {
            email: this.state.email,
            password: this.state.password,
            handle: this.state.handle,
            confirmPassword: this.state.confirmPassword
        }

        this.props.signUpUser(formData, this.props.history)

}



    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {classes} = this.props
        const {email, password, loading, errors, handle, cconfirmPassword} = this.state
        return (
            <Grid container
                  item  sm
                  className={classes.form}
                  direction="column"
                  justify="center"
                  alignItems="center">
                <img  src={AppLogo} alt="App Logo"  className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>SignUp</Typography>

                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        label="Handle"
                        className={classes.textField}
                        type="text"
                        name="handle"
                        id="handle"
                        autoComplete="handle"
                        value={handle}
                        onChange={this.handleChange}
                        fullWidth
                        helperText={errors ? errors.handle : ''}
                        error={errors ? !!errors.handle : false }
                    />

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


                    <TextField
                        label="Confirm Password"
                        className={classes.textField}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        value={cconfirmPassword}
                        onChange={this.handleChange}
                        fullWidth
                        helperText={errors ? errors.confirmPassword : ''}
                        error={errors ? !!errors.confirmPassword : false }
                    />

                    {errors ? errors.general ? <Typography variant='body2' className={classes.customError} >{errors.general}</Typography> : '' : ''}

                    <Buttons loading={loading} action="SIGN UP"/>
                    <small>Have an Account? <Link  to={"/signup"}>Signin Here</Link></small>


                </form>

            </Grid>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
    UI: PropTypes.func.isRequired,
};

const mapStateToProps  = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signUpUser
}

export default connect(
    mapStateToProps, mapActionsToProps
)(withStyles(styles)(SignUp));
