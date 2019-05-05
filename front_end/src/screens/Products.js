import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { InputBase, Divider, IconButton, Button } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { blue, red, green, grey } from '@material-ui/core/colors'
import { typography } from 'material-ui/styles';
import { connect } from 'react-redux'

const styles = {
  root: {
    //width: '100%', 
    margin: 5,
    //float: 'right',
    //right: 0
  },
  appBar: {
    position: 'static',
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  searchBar: {
    margin: '15px 4px',
    display: 'flex',
    alignItem: 'center',
    paddingRight: 5
  },
  input: {
    flexGrow: 1,
    margin: 'dense'
  },
  search:{
    display: 'flex',
    flexGrow: 1
  }
}

export class Products extends Component {
  state = {

  }

  onSelectDepartment = (event, value) => {
    this.props.handleChangeDepartment(this.props.departments[value].name)
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
          <AppBar className={classes.appBar} position='absolute'>
            <Tabs
              variant='fullWidth'
              // value = {this.props.departments.findIndex(obj => obj.name === this.props.department.name) >= 0 ? this.props.departments.findIndex(obj => obj.name === this.props.department.name) : 0} 
              value={this.props.departments.map(dept => { return dept.name }).indexOf(this.props.department.name) >= 0 ?
                this.props.departments.map(dept => { return dept.name }).indexOf(this.props.department.name) : 0}
              onChange={this.onSelectDepartment}
              centered
            >
              {(this.props.departments).map((department, index) =>
                (
                  <Tab label={department.caption} />
                )
              )}
            </Tabs>
          </AppBar>
        </Paper>
        <div className={classes.searchBar}>
          <Paper className = {classes.search}>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} />
            <InputBase className={classes.input} placeholder="Tìm kiếm tên sản phẩm, nhóm hàng" />
          </Paper>

          {(this.props.role == 'admin') ? (<Button variant = 'contained' color = 'primary' className = {classes.button} onClick = {() => this.props.routerScreen('/product/new')}> Thêm sản phẩm</Button>) : <p></p>}
        </div >

      </MuiThemeProvider>

    )
  }
}

const mapState2Props = (state) => {
  return {
    departments: state.ProductReducer.departments,
    department: state.ProductReducer.department,
    role: state.LoginReducer.role
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    handleChangeDepartment: (departmentName) => {
      dispatch({ type: 'HANDLE_CHANGE_DEPARTMENT', payload: departmentName })
    },
    routerScreen: (screenName) => {
      dispatch({type: 'SCREEN_ROUTER', payload: screenName})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(Products)))