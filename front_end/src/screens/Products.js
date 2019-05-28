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
import main_wood from '../data/main_bg.jpeg'


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
      name: '',
      sort_by: ''
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
      name: this.state.name,
      page: number,
      limit: numberOfProductPerPage,
      sort_by: this.state.sort_by
    }
    this.props.getProduct(data);
  }

  onSelectDepartment = (event, value) => {
    this.props.handleChangeDepartment(this.props.departments[value].name)
  }

  onSearch = (event) => {
    this.setState({[event.target.name]: event.target.value, pageOfProduct: 1},() => {
      let data = {
        name: this.state.name,
        page: 1,
        limit: numberOfProductPerPage,
        sort_by: this.state.sort_by
      }
      this.props.getProduct(data);
    });
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
      <div style = {{backgroundColor: '#f5f5f5', margin: 5 ,border:'1px solid gray',height:'100%', overflow: 'hidden', borderRadius: 3, padding: 10, backgroundImage:`url(${main_wood})`, backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
          <div style={{ height: 30, display: 'flex', margin: 3, marginTop: 5 , marginBottom: 10}}>
            <div style={{ flexGrow: 1, display: 'flex', border: '1px solid #616161', borderRadius: 5, marginRight: 10 }}>
              <SearchIcon style={{ fontSize: 25 }} color='primary' className={classes.searchIcon} />
              <Divider className={classes.divider} />
              <InputBase className={classes.input} placeholder="Tìm kiếm tên sản phẩm, nhóm hàng" onChange={this.onSearch} name = 'name' />
            </div>
            <TextField
              variant="outlined"
              select
              label='Sắp xếp theo'
              onChange = {this.onSearch}
              name = 'sort_by'
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
          <div style = {{dislay: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
            <div style = {{width: '100%',height: 30, backgroundColor: '#009688', fontWeight: 'bold', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              DANH SÁCH SẢN PHẨM {`(${this.props.productCount} sản phẩm)`}
            </div>
            <GridList cellHeight={((window.innerHeight*0.92 - 70)*0.29)} className={classes.gridList} cols={numberOfProductPerLine} rows = {numberOfProductPerPage/numberOfProductPerLine}>            
              {(products).map(product => (
                <GridListTile key={product.name}>
                  <img src={`data:image/png;base64,${product.subImage}`} alt={product.name} style = {{width:'100%', height:'auto'}} onClick={() => {this.handleClickToProduct(product._id)}} />
                  <GridListTileBar
                    title={product.name}
                    subtitle={product.saleprice[product.saleprice.length - 1].value ? <span>Giá: {parseFloat(product.saleprice[product.saleprice.length - 1].value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VNĐ</span> : <span>Liên hệ</span>}
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
            <div style = {{width: '100%', display: 'flex', justifyContent: 'center'}}>
              <div style = {{width: 150, fontStyle: 'italic', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Sản phẩm {(this.state.pageOfProduct - 1)*numberOfProductPerPage + 1} - {(this.state.pageOfProduct)*numberOfProductPerPage < this.props.productCount ? (this.state.pageOfProduct)*numberOfProductPerPage : this.props.productCount} của {this.props.productCount} </div>  
              <div style = {{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Pagination
                  limit={numberOfProductPerPage}
                  offset={numberOfProductPerPage* this.state.pageOfProduct - 1}
                  total={this.props.productCount}
                  onClick={(e, offset, number) => this.changePageOfProduct(number)}
                  otherPageColor = 'inherit'
                />
              </div>
            </div>
          </div>
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
    },
    // showProductDetail: (id) => {
    //   dispatch({type: 'SCREEN_ROUTER', payload: `/products/${id}`})
    // }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(Products)))