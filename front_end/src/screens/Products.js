import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {AppBar,Tabs, Tab, Paper} from '@material-ui/core';
import {MuiThemeProvider, withStyles, createMuiTheme} from '@material-ui/core/styles'
import {blue, red, green, grey} from '@material-ui/core/colors'
import { typography } from 'material-ui/styles';
import {connect} from 'react-redux'

const styles = {
  root: {
    //width: '100%', 
    margin: 5,
    //float: 'right',
    //right: 0
  },
  appBar:{
    position: 'static',
  }
}

export class Products extends Component {
  render() {
    const {classes} = this.props;
    const {history} = this.props;
    const theme = createMuiTheme({
      palette:{
        primary:{main: green.A400},
        error: {main: red[500]},
        secondary: {main: grey[700]},
        type: 'dark'
      },
      typography: {useNextVariants : true}
    })
    return (
      <MuiThemeProvider theme = {theme}>
        <Paper className = {classes.root} position = 'static'>
          <AppBar className = {classes.appBar} position = 'absolute' color = 'primary'>
            {/* <Tabs 
              variant = 'fullWidth'
              value = {this.props.department || this.props.departments[0]} 
              // onChange = {}
              centered
              >
                {(this.props.departments).map((department, index) => 
                  (
                    <Tab label = {department.caption}/>
                  ) 
                )}
            </Tabs> */}
            123ABCDEFRTGKSD:LSKDLS:LD:DS:"DSDSJDK"
          </AppBar>
        </Paper>
      </MuiThemeProvider>
      
    )
  }
}

const mapState2Props = (state) => {
  return {
    departments: state.ProductReducer.departments,
    department: state.ProductReducer.department
  }
}

const mapDispatch2Props = (dispatch) =>{
  return{
    handleChangeDepartment: (departmentName) => {
      dispatch({type:'HANDLE_CHANGE_DEPARTMENT',payload: departmentName})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(Products)))