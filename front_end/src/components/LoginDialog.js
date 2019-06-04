import React, { Component } from 'react';
import { Dialog, Grid, Divider, IconButton } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import { connect } from 'react-redux';
import { logo } from '../data/logo.png';
import { StyledButton } from '../components/Components'
import { Close as CloseIcon } from '@material-ui/icons';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErr: false,
            passwordErr: false,
            canRequestLogin: false,
            remember: false,
            loginFail: false
        }
    }

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

    onCheckRemember = (event) => {
        this.setState({remember: !this.state.remember})
    }

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
        this.props.requestLogin(userInfo);
    }

    render() {
        return (
            <Dialog open={this.props.open}>
            <div style={{ width: 500, display: 'flex',flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                <div item xs = {12} style = {{width:'100%', height: 30, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <IconButton style = {{height: 30}} onClick = {this.props.hideLoginForm}><CloseIcon/></IconButton>
                </div>
                <div style={{ width: 400, height: 400, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Grid container style={{ fontFamily: 'Helvetica Neue",Helvetica,Arial,sans-serif', color: '#333',fontSize:'14px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' , justifyContent: 'center'}}>
                    <Grid item xs = {12} style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <img src={require('../data/logo.png')} style={{ height: 100 }} />
                        </Grid>
                        <Divider/>
                        <Grid item xs={12} style={{ paddingTop: 20  }}>Email</Grid>
                        <Grid item xs={12} style={{ width: '100%'}}>
                            <input value={this.state.email} placeholder='your_name@example.com' style={!this.state.emailErr ? { border: '1px solid #bdbdbd', paddingLeft: 5, width: '100%', borderRadius: 1 , backgroundColor:'#e0e0e0', height:30} : { border: '1px solid red', paddingLeft: 5, width: '100%', borderRadius: 1, backgroundColor:'#e0e0e0' , height:30 }} name='email' onChange={this.onChangeText} />
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: 20  }}>Mật khẩu</Grid>
                        <Grid item xs={12} style={{ width: '100%' }}>
                            <input value={this.state.password} type = 'password' placeholder='**********' style={!this.state.passwordErr ? { border: '1px solid #bdbdbd', paddingLeft: 5, width: '100%', borderRadius: 1, backgroundColor:'#e0e0e0',  height:30 } : { border: '1px solid red', paddingLeft: 5, width: '100%', borderRadius: 1, backgroundColor:'#e0e0e0' , height:30}} name='password' onChange={this.onChangeText} />
                        </Grid>
                        <Grid item xs = {6} style={{ paddingTop: 20 ,display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                            <input type="checkbox" name="remember" value={'remember'} onClick = {this.onCheckRemember} style = {{paddingRight: 20}}/>{` Nhớ đăng nhập`} <br/>
                        </Grid>
                        <Grid item xs = {6} style={{ paddingTop: 20 ,display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                            <a onClick = {this.props.showForgotPassForm} href = 'javascript:;'> Quên mật khẩu</a>
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: 20 , display: 'flex', justifyContent: 'center'}}>
                            <StyledButton onClick={this.requestLogin}>Đăng nhập</StyledButton>
                        </Grid>
                    </Grid>
                </div>
                </div>
            </Dialog >
        )
    }
}

const mapState2Props = (state) => {
    return {
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        showForgotPassForm:() => dispatch({type:'SHOW_FORGOT_PASSWORD_FORM'})
    }
}

export default connect(mapState2Props, mapDispatch2Props)(LoginDialog)