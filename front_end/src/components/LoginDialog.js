import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextField, Paper, Typography, Button, Link, Divider , FormControlLabel, Checkbox} from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import { connect } from 'react-redux';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import {login} from '../api/AccountApi';
import {decode} from 'base-64';
import atob from 'atob';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const styles = {

}

export class LoginDialog extends Component {

    onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loginFail: false
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
        }
    };

    showForgotPassForm = () => {
        this.props.hideLoginForm();
        this.props.showForgotPassForm();
    }

    requestLogin = () => {
        let userInfo = {
            email: this.state.email,
            password: this.state.password,
            remember: this.state.remember
        }
        login(userInfo).then(res => {
            if(this.state.remember) localStorage.setItem('token', res.data.token);
            else localStorage.removeItem('token');
            localStorage.setItem('tokenTempt', res.data.token);
            let tokenInfo = res.data.token.split('.')[1];
            tokenInfo = tokenInfo.replace('-','+').replace('_','/');
            let userInfo = JSON.parse(atob(tokenInfo));
            this.props.setCurrentUser(userInfo);
            this.props.hideLoginForm();
        }).catch(err => {this.setState({loginFail: true})})
    }

    handleCheckRemember = name => event => {
        this.setState({[name]:event.target.checked})
    }

    state = {
        email: '',
        password: '',
        emailErr: false,
        passwordErr: false,
        canRequestLogin: false,
        remember: false,
        loginFail: false
    }


    render() {
        const { open, classes } = this.props;
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
                    <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '500px' }} color='primary'>
                        <Typography variant='h3' style={{ textAlign: 'center' }}>Đăng nhập</Typography>
                        <Typography variant='h3' color = 'secondary' style={{ textAlign: 'center' , fontSize: '0.8em', color: 'red'}}>{this.state.loginFail ? 'Email hoặc mật khẩu không đúng' : ''}</Typography>
                        <Divider />
                        <TextField
                            error={this.state.emailErr}
                            name='email'
                            onChange={this.onChangeText}
                            value={this.state.email}
                            id="standard-dense"
                            label="Email"
                            className={'textField'}
                            style={{ marginLeft: 20, marginRight: 20 }}
                            helperText={this.state.emailErr ? 'Vui lòng kiểm tra định dạng email' : ' '}
                        />
                        <br />
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
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.remember}
                                        onChange={this.handleCheckRemember('remember')}
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Duy trì đăng nhập"
                            />
                            <Link onClick={this.showForgotPassForm} style={{ bottom: '0px', fontSize: '1em', paddingTop: '5px' }}>Quên mật khẩu ?</Link>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Button variant="contained" color="secondary" className='button' style={{ margin: '10px' }} onClick={this.props.hideLoginForm}>
                                Trở lại
                                <Cancel className={classes.iconRight} style={{ paddingLeft: '20px' }}></Cancel>
                            </Button>
                            <Button variant="contained" color="primary" className='button' style={{ margin: '10px' }} disabled={this.state.passwordErr || this.state.emailErr} onClick={this.requestLogin}>
                                Đăng nhập
                                <Send className='iconRight' style={{ paddingLeft: '20px' }}></Send>
                            </Button>
                        </div>
                    </Paper>
                </MuiThemeProvider>
            </Dialog>
        )
    }
}

LoginDialog.propTypes = {
    open: PropTypes.bool,
    hideLoginForm: PropTypes.func,
}

const mapState2Props = (state) => {
    return {

    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        setCurrentUser: (userInfo) => {
            dispatch({type: 'SET_CURRENT_USER',
                    payload: {
                        email: userInfo.email,
                        role: userInfo.role
                    }})
        },
        showForgotPassForm: () => {
            return dispatch({type: 'SHOW_FORGOT_PASSWORD_FORM'})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(withStyles(styles)(LoginDialog))