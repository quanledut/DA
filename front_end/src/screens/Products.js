import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { InputBase, Divider, IconButton, Button, TextField, MenuItem, GridList, GridListTile, ListSubheader, GridListTileBar } from '@material-ui/core'
import { Search as SearchIcon, RateReview, Info as InfoIcon, AddShoppingCart } from '@material-ui/icons'
import { blue, red, green, grey, white } from '@material-ui/core/colors';
import _colors from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { RemoveSignString } from '../helpers/RemoveSignString';
import Pagination from 'material-ui-flat-pagination';
import {numberOfProductPerPage, numberOfProductPerLine} from '../config';
import {PropTypes} from 'prop-types';
import Rating from '../components/RatingStart'


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
  },
  rating: {
      iconButton: {
        width: 30,
        height: 30,
        padding: 10
      },
      icon: {
        width: 20,
        height: 20
      }
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

  handleClickToProduct = (id) => {
    this.props.showProductDetail(id);
  }

  changePageOfProduct = (number) => {
    this.setState({
      pageOfProduct: number
    });
    let data = {
      department: this.props.department,
      name: this.state.name,
      page: number,
      limit: numberOfProductPerPage
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
    this.setState({name: event.target.value, pageOfProduct: 1});
    let data = {
      department: this.props.department,
      name: event.target.value,
      page: 1,
      limit: numberOfProductPerPage
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
                <Tab key = {department.name} label={department.caption} className={classes.tab}
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
            <GridList cellHeight={220} className={classes.gridList} cols={numberOfProductPerLine} rows = {numberOfProductPerPage/numberOfProductPerLine}>
              <GridListTile key="Subheader" cols={numberOfProductPerLine} style={{ height: 'auto' }}>
                <ListSubheader component="div">{`Sản phẩm: ${this.props.productCount}`}</ListSubheader>
              </GridListTile>
              {(products).map(product => (
                <GridListTile key={product.name}>
                  <img src={`data:image/png;base64,${product.subImage}`} alt={product.name} style = {{width:'100%', height:'auto'}} onClick={() => {this.handleClickToProduct(product._id)}} />
                  <GridListTileBar
                    title={product.name}
                    subtitle={product.saleprice[product.saleprice.length - 1].value? <span>Giá: {product.saleprice[product.saleprice.length - 1].value} VNĐ</span> : <span>Liên hệ</span>}
                    actionIcon={
                      <div style = {{display: 'flex', flexDirection: 'column', alignItems:'flex-end', }}>
                        <Rating
                        value = {3}
                        max = {5}
                        />
                      </div>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
            <Pagination
              limit={numberOfProductPerPage}
              offset={numberOfProductPerPage* this.state.pageOfProduct - 1}
              total={this.props.productCount}
              onClick={(e, offset, number) => this.changePageOfProduct(number)}
              otherPageColor = 'inherit'
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
    },
    showProductDetail: (id) => {
      dispatch({type: 'HANDLE_SHOW_PRODUCT_DETAIL', payload: id})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(Products)))