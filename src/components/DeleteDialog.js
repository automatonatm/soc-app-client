import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToolTipBtn from "../util/ToolTipBtn";
import DeleteIcon from '@material-ui/icons/Delete'
import withStyles from "@material-ui/core/styles/withStyles";

const styles =  theme => ({
        deleteBtn:  {

        }

})

class DeleteDialog extends React.Component {
    state = {
        open: false,
    };



    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const {deleteScream, btnClassName, classes} = this.props

        return (
            <Fragment>
                <ToolTipBtn btnClassName={btnClassName} tip="Remove Scream"  placement="top" onClick={() => {this.setState({open: true})}}>
                    <DeleteIcon color="secondary"/>
                </ToolTipBtn>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"You cannot undo this!!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you wanna delete the scream?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={deleteScream} color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default withStyles(styles)(DeleteDialog);