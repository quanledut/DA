import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors'
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Divider, TextField, MuiThemeProvider, Input, Typography, Button} from '@material-ui/core';
import { Roles } from '../data/Role'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit/3,
    marginBottom: theme.spacing.unit/3,
    width: '90%'
  },
  inputImage: {
    display: 'none'
  },
  dialog: {
  }
})

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class SignUpDialog extends Component {
  state = {
    open: true,
    email: '',
    password: '',
    passwordConfirm: '',
    emailErr: false,
    passwordNotMatch: false,
    passwordErr: false,
    role: '',
    avatar: {},
    filePath: null
  }
  handleOnchangeText = (event) => {
      switch (event.target.name){
          case 'email': {
            this.setState({email:event.target.value},() => {
              if(emailRegex.test(this.state.email)){
                this.setState({emailErr: false})
              }
              else this.setState({emailErr: true})
            })
            break;
          }
          case 'password': {
            this.setState({password: event.target.value},()=>{
              if(this.state.password.length < 8) this.setState({passwordErr: true})
              else this.setState({passwordErr: false})
            })
            break;
          }
          case 'passwordConfirm': {
            this.setState({passwordConfirm:event.target.value},() => {
              if(this.state.password.length < 8){
                this.setState({passwordErr: true})
              }
              if(this.state.passwordConfirm != this.state.password){
                this.setState({passwordNotMatch: true})
              }
              else this.setState({passwordNotMatch: false})
          })
          break;
        }
        default:{
          this.setState({[event.target.name]:event.target.value})
        }
      }
  }
  chooseImage = (event) => {
    this.setState({ avatar: event.target.files[0]
                    ,filePath: URL.createObjectURL(event.target.files[0])
                  })
  }
  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      palette: {
        primary: { main: blue[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        inherit: {main: red[600]},
        type: 'dark'
      },
      typography: { useNextVariants: true },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={this.state.open && this.props.open}
          //onClose={this.props.closeDialogFormHandle}
          fullWidth
          className={classes.dialog}
        >
          <DialogTitle>
            <Typography variant='display1'>
              Create New Employees
            </Typography>
          </DialogTitle>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'row', height:250 }}>
            <div style={{ flex: 4 , justifyContent: 'center', alignItems: 'center'}}>
              <Input
                accept='.jpg/.png'
                type='file'
                onChange={this.chooseImage}
                className={classes.inputImage}
                id='input-image'
              />
              <label htmlFor='input-image' display='flex' style={{ alignItems: 'center', justifyContent: 'center', width: 200, paddingLeft: 20, marginTop: 50 }}>
                <img style={{ alignItems: 'center', width: '100%' }} src={this.state.filePath || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfR8X74rkrhWpxqkeNUjMR71RTB2tLljU_-TlBXdPJ9qhJzcLWPA'} alt='default avatar' />
              </label>
            </div>
            <div style={{ flex: 6, margin: 10 , height:250}}>
              <TextField
                error={this.state.emailErr}
                id='standart-dense'
                label='Email'
                value={this.state.email}
                onChange={this.handleOnchangeText}
                className={classes.textField}
                type='text'
                name='email'
              />
              <TextField
                error={this.state.passwordErr}
                id='standart-dense'
                label='Password'
                value={this.state.password}
                onChange={this.handleOnchangeText}
                className={classes.textField}
                type='password'
                name='password'
              />
              <TextField
                error={this.state.passwordNotMatch}
                id='standart-dense'
                label='Confirm password'
                value={this.state.passwordConfirm}
                onChange={this.handleOnchangeText}
                className={classes.textField}
                type='password'
                name='passwordConfirm'
              />
              <TextField
                select
                label = 'Role'
                className = {classes.textField}
                value = {this.state.role}
                onChange = {this.handleOnchangeText}
                SelectProps = {{
                  native: true,
                  MenuProps:{
                    className: classes.roleMenu
                  }
                }}
                margin = 'normal'
                variant = 'filled'
                name = 'role'
              >
                {Roles.map(role => (
                  <option key = {role} value = {role}>
                    {role}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
          <Divider/>
          <div style = {{display:'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center', padding: 10}}>
              <Button color = 'secondary' variant = 'contained' style = {{marginRight: 20}}>Cancel</Button>
              <Button color = 'primary' variant = 'contained' style = {{marginLeft: 20}}>Sign Up</Button>
          </div>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

SignUpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialogFormHandle: PropTypes.func.isRequired
}

export default withStyles(styles)(SignUpDialog)
