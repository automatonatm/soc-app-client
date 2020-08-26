import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/es/Paper/Paper";
import MuiLink from "@material-ui/core/es/Link/Link";
import Typography from "@material-ui/core/es/Typography/Typography";
import daysjs from 'dayjs'
import {Link} from "react-router-dom";
//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import Calender from '@material-ui/icons/CalendarToday'
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import {IconButton} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {uploadImage, logoutUser} from "../store/actions/userActions";
import EditDetails from "./EditDetails";
//MUI Stuff


const  styles = theme => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})



class Profile extends Component {


     handleImageChange = (event) => {
        const image = event.target.files[0]
         const formData = new FormData()
         formData.append('image', image, image.name)
         this.props.uploadImage(formData)
    }

    handleEditPicture = () => {
           document.getElementById('imageInput').click()
    }

    handleLogout = ()  => {
         this.props.logoutUser()
    }


    render() {

        const  {
                 classes,
                  user: {credentials: {handle, createdAt, imageUrl, bio, website, location},
                      loading,
                      authenticated
                  },
                 } = this.props


        const userData = () => (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper" >
                        <img src={imageUrl} alt={"Profile Photo"} className="profile-image" />
                        <input type="file" id="imageInput" hidden onChange={this.handleImageChange}/>
                        <Tooltip title="Change Profile Photo" placement="top">
                        <IconButton onClick={this.handleEditPicture} className="button">
                            <EditIcon color="primary"  />
                        </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn  color="primary"/> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}

                        {website && (
                            <Fragment>
                                <LinkIcon  color="primary"/> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                                <hr/>
                            </Fragment>
                        )}
                        <Calender color="primary"/> {' '}
                        <span>{daysjs(createdAt).format('MM YYYY')}</span>
                    </div>
                </div>
                <Tooltip title="Logout" placement="top">
                    <IconButton onClick={this.handleLogout}>
                        <KeyboardReturn color="primary"/>
                    </IconButton>
                </Tooltip>

                <EditDetails credentials={this.props.user.credentials} />
            </Paper>
        )

        const authUI = () => (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile Found Please Login
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Typography>
            </Paper>
        )



        return !loading ? (authenticated ? (userData()) : (authUI())) : (<p>Loading....</p>)

    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const  mapStateToProps = (state) =>({
    user: state.user
})

const mapActionsToProps = {
    uploadImage,
    logoutUser
}




export default connect(
    mapStateToProps,
    mapActionsToProps)(withStyles(styles)(Profile));
