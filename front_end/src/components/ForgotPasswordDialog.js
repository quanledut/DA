import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications'
import { truncate } from 'fs';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


export class ForgotPasswordDialog extends React.Component {
    state = {
        email : '',
        emailErr : false,
        messageFromServer: ''
    };

    handleClose = () => {
        //NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        this.props.closeForgotPasswordForm();
    };

    sendRequestForgotPassword = () => {
        
        this.props.sendRequestForgotPassword(this.state.email);
        setTimeout(() => this.setState({ emailErr: true, messageFromServer: 'Email không tồn tại trên danh sách tài khoản' }),3000)
    }

    onChangeText = (event) => {
        this.setState({email: event.target.value}, () => {
            if(!emailRegex.test(this.state.email)){
                this.setState({emailErr: true, messageFromServer: 'Vui lòng nhập đúng định dạng email'})
            }
            else this.setState({emailErr: false, messageFromServer: ''})
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    //onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Đặt lại mật khẩu</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Vui lòng nhập địa chỉ email của bạn vào ô bên dưới.
                        </DialogContentText>
                        <TextField
                            error={this.state.emailErr}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            helperText={this.state.messageFromServer}
                            value={this.state.email}
                            onChange = {this.onChangeText}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="error">
                            Hủy
                        </Button>
                        <Button onClick={this.sendRequestForgotPassword} color="secondary" disabled = {this.state.emailErr}>
                            Đặt lại mật khẩu
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapState2Props = (state) => {
    return {
        open: state.PageReducer.isShowForgotPasswordForm
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        closeForgotPasswordForm: () => {
            return dispatch({ type: 'HIDE_FORGOT_PASSWORD_FORM' })
        },
        sendRequestForgotPassword: (email) => {
            return dispatch({ type: 'SEND_REQUEST_FORGOT_PASSWORD', payload: email })
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(ForgotPasswordDialog);
