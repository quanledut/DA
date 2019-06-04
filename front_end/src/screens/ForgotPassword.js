import React, { Component } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { blue, red, green, grey } from '@material-ui/core/colors'
import { connect } from 'react-redux';
import SetNewPasswordDialog from '../components/SetNewPasswordDialog';

const styles = {
    root: {
        //width: '100%', 
        margin: 5,
        //float: 'right',
        //right: 0
    },
    appBar: {
        position: 'static',
    }
}

export class ForgotPassword extends Component {
    state = {
        email: '',
        password: '',
        passwordConfirm: '',
        err: false,
        linkOK: false,
        showDialog: true,
        token: ''
    }
    async componentDidMount() {
        await axios.get(`${apiUrl}/reset`, {
            params: { token: this.props.match.params.token }
        }).then(response => {
            if (response.status === 200) {
                this.setState({ email: response.data.email, linkOK: true, token: this.props.match.params.token })
            }
        })
    }

    render() {
        const { classes } = this.props;
        const { history } = this.props;
        const theme = createMuiTheme({
            palette: {
                primary: { main: green.A400 },
                error: { main: red[500] },
                secondary: { main: grey[700] },
                type: 'light'
            },
            typography: { useNextVariants: true }
        })
        return (
            <MuiThemeProvider theme={theme}>
                <Paper className={classes.root} position='static'>
                    <SetNewPasswordDialog 
                        open = {this.state.showDialog} 
                        email = {this.state.email}
                        linkOK = {this.state.linkOK} 
                        closeDialog = {() => {
                            this.setState({showDialog: false});
                            this.props.routerScreen('/');
                        }}
                        requestSetNewPassword = {(newPassword) => {
                            this.props.requestSetNewPassword(this.state.email, newPassword, this.state.token);
                            this.setState({showDialog: false});
                            this.props.routerScreen('/');
                        }}
                        />
                </Paper>
            </MuiThemeProvider>

        )
    }
}

const mapState2Props = (state) => {
    return {
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        requestSetNewPassword: (email, newPassword,token) => {
            dispatch({ type: 'REQUEST_SET_NEW_PASSWORD', payload: {email, newPassword, token} })
        },
        routerScreen: (screenName) => {
            dispatch({type: 'SCREEN_ROUTER', payload:screenName})
        }
    }
}


export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(ForgotPassword)))
