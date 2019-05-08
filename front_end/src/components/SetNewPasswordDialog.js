import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextField, Paper, Typography, Button, Link, Divider, DialogContent, DialogTitle } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import { connect } from 'react-redux';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { login } from '../api/AccountApi';
import { decode } from 'base-64'
import atob from 'atob'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const styles = {

}

export class SetNewPasswordDialog extends Component {

    onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loginFail: false
        }, () => {
            
        });
        switch (e.target.name) {
            case 'email': {
                if (!emailRegex.test(e.target.value)) {
                    this.setState({ emailErr: true })
                }
                else { this.setState({ emailErr: false }) }
                break;
            }
            case 'password': {
                if (e.target.value.length < 8) {
                    this.setState({ passwordErr: true })
                }
                else this.setState({ passwordErr: false })
                break;
            }
            case 'passwordConfirm': {
                if (this.state.password.length >= 8 && e.target.value != this.state.password) {
                    this.setState({ passwordConfirmNotMatch: true })
                }
                else this.setState({ passwordConfirmNotMatch: false })
                break;
            }
        }
    };

    showForgotPassForm = () => {
        this.props.hideLoginForm();
        this.props.showForgotPassForm();
    }

    handleCheckRemember = name => event => {
        this.setState({ [name]: event.target.checked })
    }

    state = {
        password: '',
        passwordConfirm: '',
        passwordErr: false,
        passwordConfirmNotMatch: false
    }


    render() {
        const { open, classes, linkOK } = this.props;
        const theme = createMuiTheme({
            palette: {
                primary: { main: blue[500] }, // Purple and green play nicely together.
                secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
                inherit: { main: red[600] },
                type: 'light'
            },
            typography: { useNextVariants: true },
        });
        return (
            <Dialog open={open}>
                <MuiThemeProvider theme={theme}>
                    {
                        linkOK ?
                            <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '500px' }} color='primary'>
                                <Typography variant='h3' style={{ textAlign: 'center' }}>Đặt lại mật khẩu</Typography>
                                <Divider />
                                <TextField
                                    name='password'
                                    disabled
                                    value={this.props.email}
                                    label="Email:"
                                    className={'textField'}
                                    type='text'
                                    style={{ marginLeft: 20, marginRight: 20 }}
                                />
                                <TextField
                                    name='password'
                                    error={this.state.passwordErr}
                                    onChange={this.onChangeText}
                                    value={this.state.password}
                                    label="Mật khẩu"
                                    className={'textField'}
                                    type='password'
                                    style={{ marginLeft: 20, marginRight: 20 }}
                                    helperText={this.state.passwordErr ? 'Mật khẩu phải có ít nhất 8 ký tự' : ' '}
                                />
                                <TextField
                                    name='passwordConfirm'
                                    error={this.state.passwordConfirmNotMatch}
                                    onChange={this.onChangeText}
                                    value={this.state.passwordConfirm}
                                    label="Nhập lại mật khẩu"
                                    className={'textField'}
                                    type='password'
                                    style={{ marginLeft: 20, marginRight: 20 }}
                                    helperText={this.state.passwordConfirmNotMatch ? 'Mật khẩu không khớp' : ' '}
                                />
                                <Divider />
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button variant="contained" color="secondary" className='button' style={{ margin: '10px' }} onClick={this.props.closeDialog}>
                                        Trở lại
                                    </Button>
                                    <Button variant="contained" color="primary" className='button' style={{ margin: '10px' }} 
                                            disabled={this.state.passwordErr || this.state.passwordConfirmNotMatch} 
                                            onClick={() => this.props.requestSetNewPassword(this.state.password)}>
                                        Đặt lại mật khẩu
                                    </Button>
                                </div>
                            </Paper>
                            :
                            <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '500px' }} color='primary'>
                                <DialogContent>
                                    <DialogTitle>
                                        Đường dẫn không đúng hoặc đã hết hạn, vui lòng yêu cầu đặt lại mật khẩu
                            </DialogTitle>
                                    <Divider />
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Button variant="contained" color="secondary" className='button' style={{ margin: '10px' }} onClick={this.props.closeDialog}>
                                            Về trang chủ
                                        <Cancel className={classes.iconRight} style={{ paddingLeft: '20px' }}></Cancel>
                                        </Button>
                                        <Button variant="contained" color="primary" className='button' style={{ margin: '10px' }} onClick={() => {
                                            this.props.closeDialog();
                                            this.props.showForgotPassForm();
                                        }}>
                                            Yêu cầu đặt lại
                                        <Send className='iconRight' style={{ paddingLeft: '20px' }}></Send>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Paper>
                    }
                </MuiThemeProvider>
            </Dialog>
        )
    }
}

const mapState2Props = (state) => {
    return {

    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        showForgotPassForm: () => {
            return dispatch({ type: 'SHOW_FORGOT_PASSWORD_FORM' })
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(withStyles(styles)(SetNewPasswordDialog))