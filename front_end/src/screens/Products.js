import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { InputBase, Divider, IconButton, Button, TextField, MenuItem, GridList, GridListTile, ListSubheader, GridListTileBar } from '@material-ui/core'
import { Search as SearchIcon, RateReview, Info as InfoIcon } from '@material-ui/icons'
import { blue, red, green, grey, white } from '@material-ui/core/colors';
import _colors from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { RemoveSignString } from '../helpers/RemoveSignString';
import Pagination from 'material-ui-flat-pagination';
import {numberOfProductPerPage, numberOfProductPerLine} from '../config';
import {PropTypes} from 'prop-types'

const sortBy = [
  {
    value: 'rate',
    caption: 'Yêu thích'
  },
  {
    value: 'pricedecending',
    caption: 'Giá thấp nhất'
  },
  {
    value: 'priceassending',
    caption: 'Giá cao nhất'
  }
]

const styles = theme => ({
  departmentTab: {
    marginTop: '0.5%',
    marginLeft: '0.2%',
    marginBottom: '0.6%'
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
    margin: 'dense',
    marginBottom: 2,
    marginRight: 5
  },
  search: {
    display: 'flex',
    flexGrow: 1,
    marginBottom: 2,
    paddingRight: 5
  },
  tabs: {
    height: '20px'
  },
  searchIcon: {
    margin: 2
  },
  sortByTextField: {
    height: 35
  },
  inputTextField: {
    fontSize: 12
  },
  selectRoot: {
    height: 30,
    display: 'table',
  },
  select: {
    height: 30,
    width: 150,
    paddingTop: 0,
    paddingBottom: 0,
    display: "table-cell",
    verticalAlign: "middle",
    bottom: -5
  },
  productRoot: {
    backgroundColor: '#fff',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  }
})


export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productShow: null,
      pageOfProduct: 1,
      name: ''
    }
  }

  changePageOfProduct = (offset) => {
    this.setState({
      pageOfProduct: offset
    });
    let data = {
      department: this.props.department,
      name: this.state.name,
      page: offset
    }
    if(this.props.department.name === 'all' || !this.props.department.name){
      delete data.department;
    }
    if(this.state.name === ''){
      delete data.name
    }
    this.props.getProduct(data);
  }

  onSelectDepartment = (event, value) => {
    this.props.handleChangeDepartment(this.props.departments[value].name)
  }

  onSearch = (event) => {
    this.setState({name: event.target.value});
    let data = {
      department: this.props.department,
      name: event.target.value,
      page: this.state.page || 1
    }
    if(this.props.department.name === 'all' || !this.props.department.name){
      delete data.department;
    }
    if(event.target.value === ''){
      delete data.name
    }
    this.props.getProduct(data);
  }

  render() {
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
    const { classes, products, productCount } = this.props;
    const { history } = this.props;
    const theme = createMuiTheme({
      type: 'light',
      typography: { useNextVariants: true },
      spacing: value => value
    })
    return (
      <div theme={theme}>
        <Paper className={classes.departmentTab}>

          <Tabs
            variant='fullWidth'
            value={this.props.departments.map(dept => { return dept.name }).indexOf(this.props.department.name) >= 0 ?
              this.props.departments.map(dept => { return dept.name }).indexOf(this.props.department.name) : 0}
            onChange={this.onSelectDepartment}
            textColor='primary'
            style={{ height: "32px" }}>
            >
            {(this.props.departments).map((department, index) =>
              (
                <Tab label={department.caption} className={classes.tab}
                  style={{ height: 40 }}
                />
              )
            )}
          </Tabs>

          {/* Search Field */}
          <div style={{ height: 30, display: 'flex', margin: 3 }}>
            <div style={{ flexGrow: 1, display: 'flex', border: '1px solid #616161', borderRadius: 5, paddingRight: '5px' }}>
              <SearchIcon style={{ fontSize: 25 }} color='primary' className={classes.searchIcon} />
              <Divider className={classes.divider} />
              <InputBase className={classes.input} placeholder="Tìm kiếm tên sản phẩm, nhóm hàng" onChange={this.onSearch} />
            </div>
            <TextField
              variant="outlined"
              select
              label='Sắp xếp theo'
              InputLabelProps={{
                shrink: true
              }}
              SelectProps={{
                native: true,
                classes: {
                  root: classes.selectRoot,
                  select: classes.select
                }
              }}
            >
              {sortBy.map(option => (
                <option key={option.value} value={option.value}>
                  {option.caption}
                </option>
              ))}
            </TextField>
            {(this.props.role === 'admin') ? (<Button variant='contained' color='primary' className={classes.button} onClick={() => this.props.routerScreen('/product/new')}> Thêm sản phẩm</Button>) : <p></p>}
          </div>

          {/* List Product */}
          <div className={classes.productRoot}>
            <GridList cellHeight={180} className={classes.gridList} cols={numberOfProductPerLine} rows = {numberOfProductPerPage/numberOfProductPerLine}>
              <GridListTile key="Subheader" cols={numberOfProductPerLine} style={{ height: 'auto' }}>
                <ListSubheader component="div">{`Sản phẩm: ${this.props.productCount}`}</ListSubheader>
              </GridListTile>
              {(products).map(product => (
                <GridListTile key={product.name}>
                  <img src={`data:image/png;base64,${product.subImage}`} alt={product.name} onClick={() => { console.log('Click Image') }} />
                  <GridListTileBar
                    title={product.name}
                    subtitle={<span>by: {product.description}</span>}
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
            <Pagination
              limit={12}
              offset={12}
              total={this.props.productCount}
              onClick={(e, offset) => this.changePageOfProduct(offset)}
            />
          </div>

        </Paper>
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    departments: state.ProductReducer.departments,
    department: state.ProductReducer.department,
    role: state.LoginReducer.role,
    products: state.ProductReducer.products,
    productCount: state.ProductReducer.productCount
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    handleChangeDepartment: (departmentName) => {
      dispatch({ type: 'HANDLE_CHANGE_DEPARTMENT', payload: departmentName })
    },
    routerScreen: (screenName) => {
      dispatch({ type: 'SCREEN_ROUTER', payload: screenName })
    },
    getProduct: (data) => {
      dispatch({ type: 'GET_PRODUCT', payload: data })
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(Products)))