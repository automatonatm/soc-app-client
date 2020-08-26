import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from  'react-router-dom'
import daysjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from "prop-types";
import {deleteScream, likeScream,  unLikeScream} from "../store/actions/dataActions";
//MUI STUFFS
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import ToolTipBtn from "../util/ToolTipBtn";


//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteDialog from "./DeleteDialog";
import {Grid} from "@material-ui/core";

const styles =  {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    deleteBtn: {
       // float: 'right',
        position: 'absolute',
        left: '90%',
        top: '10%'
    }



}

class Scream extends Component {
    likedScream = () => {
        const like = this.props.user.likes.find(like => like.screamId === this.props.scream.screamId);
        return !!(this.props.user.likes && like);
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }

    unLikeScream = () => {
        this.props.unLikeScream(this.props.scream.screamId)
    }


    deleteScream = () => {
            this.props.deleteScream(this.props.scream.screamId)
    }

    render() {


        daysjs.extend(relativeTime)
        const  {classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount}, user: {authenticated, credentials: {handle}}} = this.props
        const likeButton  = !authenticated ? (
            <ToolTipBtn tip="Like">
                <Link to="/login"><FavoriteBorder color="primary"/></Link>
            </ToolTipBtn>
        )  : (
            this.likedScream() ?  (
                <ToolTipBtn placement="top" onClick={this.unLikeScream} tip="Unlike">
                    <Favorite color="primary"/>
                </ToolTipBtn>
            ) : (
                <ToolTipBtn placement="top" onClick={this.likeScream} tip="Like">
                    <FavoriteBorder color="primary"/>
                </ToolTipBtn>
            )
        )

        const deleteButton =  authenticated && (userHandle === handle) ? (
          <DeleteDialog  deleteScream={this.deleteScream} btnClassName={classes.deleteBtn} />
        ) : null

        return (
            <Card className={classes.card}>

                    <CardMedia image={userImage} className={classes.image} title="Profile Picture"/>

                    <CardContent className={classes.content}>
                        <Typography variant="body2" color="textSecondary" >{daysjs(createdAt).fromNow()}</Typography>
                        <Typography component={Link} color="primary"  to={`/user/${userHandle}`}>{userHandle}</Typography>
                        <Typography  variant="body1">{body}</Typography>
                        {likeButton}
                       <span>{likeCount}</span>
                        <ToolTipBtn tip="comment">
                                <ChatIcon color="primary"/>
                        </ToolTipBtn>
                        <span>{commentCount} comments</span>

                        {deleteButton}

                    </CardContent>
            </Card>
        );
    }
}


Scream.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unLikeScream: PropTypes.func.isRequired
};


const mapStateToProps  = (state) =>({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unLikeScream,
    deleteScream
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Scream));