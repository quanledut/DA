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
const sortBy = [
  {
    value: 'rate',
    caption: 'Yếu thích'
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
      exampleItems: exampleItems,
      pageOfItems: []
    }
    this.onChangePage = this.onChangePage.bind(this);
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
}

  onSelectDepartment = (event, value) => {
    this.props.handleChangeDepartment(this.props.departments[value].name)
  }

  onSearch = (event) => {
    console.log(event.target.value)
    this.props.products.map(product => { console.log(RemoveSignString(product.name)); console.log(RemoveSignString(product.name).indexOf(RemoveSignString(event.target.value))) })
    if (event.target.value !== '') {
      this.setState({
        productShow: this.props.products.filter(product => RemoveSignString(product.name).indexOf(RemoveSignString(event.target.value)) >= 0)
      })
    }
    else {
      this.setState({ productShow: null })
    }
  }

  render() {
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
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
            <GridList cellHeight={180} className={classes.gridList} cols={4}>
              <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                <ListSubheader component="div">{`Sản phẩm: ${this.state.productShow ? this.state.productShow.length : productCount}`}</ListSubheader>
              </GridListTile>
              {(this.state.productShow || products).map(product => (
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
            <Pagination items={this.state.exampleItems} onChangePage={() => {}} />
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
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(Products)))