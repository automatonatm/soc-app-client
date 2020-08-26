import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


import withStyles from '@material-ui/core/styles/withStyles'
import {updateUserDetails} from "../store/actions/userActions";

//MUI
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import Buttons from "./UI/Button";


const styles = theme => ({
        ...theme,
    button: {
            float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false,
        maxWidth: 'sm',

    }

    componentDidMount() {
        const {credentials} = this.props
        this.setState({
            bio: credentials.bio ? credentials.bio :  '',
            website: credentials.website ? credentials.website :  '',
            location: credentials.location ? credentials.location :  '',
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault()
        const  formData = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        }

        this.props.updateUserDetails(formData)

    }


    render() {

        const {classes, UI: {loading}} = this.props
        const {bio, location, website} = this.state

        return (
           <Fragment>
               <Tooltip title="Edit Details" placement="top">
                        <IconButton onClick={() => this.setState({ open: true })} className={classes.button} >
                            <EditIcon  color="primary"/>
                        </IconButton>
               </Tooltip>

               <Dialog
                   open={this.state.open}
                   onClose={this.handleClose}
                   aria-labelledby="form-dialog-title"
                   fullWidth={true}
                   maxWidth={this.state.maxWidth}
               >
                   <DialogTitle id="form-dialog-title">Update Details</DialogTitle>
                   <form noValidate onSubmit={this.handleSubmit}>
                   <DialogContent>
                       <TextField
                           autoFocus
                           margin="dense"
                           id="bio"
                           label="Bio"
                           type="text"
                           fullWidth
                           value={bio}
                           rows="3"
                           placeholder="A short bio about you"
                           onChange={this.handleChange}
                       />
                       <TextField
                           margin="dense"
                           id="website"
                           label="Website"
                           type="text"
                           fullWidth
                           value={website}
                           placeholder="Your personal/professional website"
                           onChange={this.handleChange}
                       />

                       <TextField
                           margin="dense"
                           id="location"
                           label="Location"
                           type="text"
                           fullWidth
                           value={location}
                           placeholder="Where you live"
                           onChange={this.handleChange}
                       />
                   </DialogContent>
                   <DialogActions>
                       <Button onClick={this.handleClose} color="primary">
                           Cancel
                       </Button>

                       <Buttons action={"Update Details"} loading={loading} />
                   </DialogActions>
                   </form>
               </Dialog>

           </Fragment>


        );
    }
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    updateUserDetails: PropTypes.func.isRequired,
    UI: PropTypes.func.isRequired,
};


EditDetails.propTypes = {
    updateUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};


const mapStateToProps  = state => ({
    UI: state.UI
})

const mapActionsToProps = {
    updateUserDetails
}



export default connect(
    mapStateToProps, mapActionsToProps
)(withStyles(styles)(EditDetails));