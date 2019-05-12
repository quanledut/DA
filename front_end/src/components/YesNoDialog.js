import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ResponsiveDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          //onClose={this.props.handleClickNo}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClickNo} color="primary"  variant = 'contained'>
              {this.props.noLabel}
            </Button>
            <Button onClick={this.props.handleClickYes} color="inherit" autoFocus variant = 'contained'>
                {this.props.yesLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClickNo: PropTypes.func.isRequired,
  handleClickYes: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  noLabel: PropTypes.string.isRequired,
  yesLabel: PropTypes.string.isRequired
};

export default withMobileDialog()(ResponsiveDialog);