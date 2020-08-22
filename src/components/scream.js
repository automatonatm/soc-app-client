import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from  'react-router-dom'
import daysjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//MUI STUFFS
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles =  {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }



}

class Scream extends Component {
    render() {
        daysjs.extend(relativeTime)
        const  {classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount}} = this.props
        return (
            <Card className={classes.card}>
                    <CardMedia image={userImage} className={classes.image} title="Profile Picture"/>
                    <CardContent className={classes.content}>
                        <Typography variant="body2" color="textSecondary" >{daysjs(createdAt).fromNow()}</Typography>
                        <Typography component={Link} color="primary"  to={`/user/${userHandle}`}>{userHandle}</Typography>
                        <Typography  variant="body1">{body}</Typography>
                    </CardContent>

            </Card>
        );
    }
}

export default withStyles(styles)(Scream);