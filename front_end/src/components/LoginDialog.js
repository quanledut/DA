import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Dialog, TextField, Fab, Paper, Typography, Button, Link} from '@material-ui/core';
import {Send, Cancel} from '@material-ui/icons';
import {connect} from 'react-redux'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
export class LoginDialog extends Component { 
    onChangeText =  (e) => {
        this.setState({
            [e.target.name] : e.target.value
        },() => {
            if(emailRegex.test(this.state.email)){
                this.setState({emailErr: false})
            }
            else {
                this.setState({
                    emailErr : true
                })
            }
        })
    };

    handleClickForgotPassword = () => {

    }

    state = {
        email: '',
        password: '',
        emailErr : false,
        passwordErr : false,
        canRequestLogin: false
    }

    
  render() {
    const {open} = this.props;
    return (
        <Dialog open = {open} style = {{}}>
            <Paper style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', width:'500px'}}>
                <Typography variant = 'display2' centered style = {{textAlign:'center'}}>Login</Typography>
                <TextField
                    error = {this.state.emailErr}
                    name = 'email'
                    onChange = {this.onChangeText}
                    value = {this.state.email}
                    id="standard-dense"
                    label="Email"
                    className={'textField'}
                    style = {{marginLeft: '10px', marginRight: '10px'}}
                    helperText={this.state.emailErr ? 'Please login' : ''}
                />
                
                <br/>
                <div style = {{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                    <TextField
                        name = 'password'
                        onChange = {this.onChangeText}
                        value = {this.state.password}
                        // id="standard-dense"
                        label="Password"
                        className={'textField'}
                        type = 'password'
                        style = {{marginLeft: '10px', marginRight: '10px', flex: 10}}
                        helperText="Please select your currency"
                        // margin="normal"
                    />
                    <Link onClick = {this.handleClickForgotPassword} style = {{flex: 3, bottom: '0px', fontSize: '0.8em', paddingTop: '5px'}}>Forgot password ?</Link>
                </div>
                <br/>
                <div style = {{display:'flex', flexDirection: 'row', justifyContent:'center'}}>
                    <Button variant="contained" color="secondary" className='button' style = {{ margin: '10px'}} onClick = {this.props.hideLoginForm}>
                        Cancel
                    <Cancel className = 'iconRight' style = {{paddingLeft:'20px'}}></Cancel>
                    </Button>
                    <Button variant="contained" color="primary" className='button' style = {{margin: '10px'}} disabled = {!this.state.canRequestLogin}>
                        Log in
                    <Send className = 'iconRight' style = {{paddingLeft:'20px'}}></Send>
                    </Button>
                </div> 
            </Paper>
        </Dialog>
        
    )
  }
}

LoginDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    hideLoginForm: PropTypes.func.isRequired
}

const mapState2Props = (state) => {
    return {
        open: state.LoginReducer.isShowLoginForm
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        hideLoginForm: () => {
            return dispatch(
                {type: 'HIDE_LOGIN_FORM'}
            );
        }

    }
}

export default connect(mapState2Props, mapDispatch2Props)(LoginDialog)