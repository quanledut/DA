import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { Typography, TextField, Input, InputAdornment, Button, GridList, GridListTile, GridListTileBar, IconButton, ListSubheader } from '@material-ui/core';
import { Search as SearchIcon, Delete } from '@material-ui/icons'
import { blue, red, green, grey } from '@material-ui/core/colors'
import { connect } from 'react-redux'

const styles = {
  root: {
    margin: 5,
    width: '50%'
  },
  appBar: {
    position: 'static',
    alignItem: 'center'
  },
  button: {
    margin: 10
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
  search: {
    display: 'flex',
    flexGrow: 1
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5
  },
  inputImage: {
    display: 'none'
  },
  textFieldAttribute: {
    marginRight: 30,
    width: '30%'
  },
  textField: {
    paddingRight: 30
  },
  productImage: {
    align: 'left'
  },
  chooseFile: {
    margin: 5,
    padding: 5
  },
  icon: {
    color: 'white'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  departmentTextField: {
    width: 400,
    left: 0
  }
}

export class NewProduct extends Component {
  state = {
    name: '',
    description: '',
    length: null,
    width: null,
    height: null,
    unitprice: null,
    saleprice: null,
    importqty: null,
    subImage: {},
    subImageLink: '',
    images: [],
    department: 'all'
  }

  chooseSubImage = (event) => {
    this.setState({ subImage: event.target.files[0] })
  }

  chooseProductImages = (event) => {
    this.setState({ images: [...this.state.images, ...event.target.files] })
  }

  onChangeText = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  deleteProductImage = (name) => {
    this.setState({ images: this.state.images.filter(p => p.name != name) })
  }

  onSubmitButton = () => {
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('length', this.state.length);
    data.append('width', this.state.width);
    data.append('height', this.state.height);
    data.append('unitprice', this.state.unitprice);
    data.append('saleprice',this.state.saleprice);
    data.append('importqty', this.state.importqty);
    data.append('files', this.state.subImage, this.state.subImage.name);
    this.state.images.map(image => {data.append('files',image,image.name)})
    data.append('department', this.state.department);
    this.props.createNewProduct(data);
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
        <div align='center'>
          <div style={{ width: '80%' }}>
            <Paper className={classes.root}>
              <AppBar className={classes.appBar} position='absolute' centered>
                <Typography variant='h4'>Thêm mới sản phẩm</Typography>
              </AppBar>
            </Paper>

            <Paper className={classes.productInfo}>
              <div style={{ flex: 3, justifyContent: 'center', alignItems: 'center', paddingLeft: 15, paddingTop: 10 }}>
                <Input
                  accept='.jpg/.png'
                  type='file'
                  onChange={this.chooseSubImage}
                  className={classes.inputImage}
                  id='input-image'
                />
                <label htmlFor='input-image' style={{ alignItems: 'center', justifyContent: 'center' }} >
                  <img style = {{width: 300}} src={this.state.subImage.name ? URL.createObjectURL(this.state.subImage) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfR8X74rkrhWpxqkeNUjMR71RTB2tLljU_-TlBXdPJ9qhJzcLWPA'} alt='default avatar' />
                  <Typography variant='subheading'>Ảnh thu nhỏ sản phẩm</Typography>
                </label>
              </div>
              <div style={{ flex: 6, justifyContent: 'center', alignItem: 'center', flexDirection: 'column' }}>
                <TextField
                  id="standard-name"
                  label="Tên sản phẩm"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                  fullWidth
                  onChange={this.onChangeText}
                  name='name'
                />
                <TextField
                  id="standard-name"
                  label="Mô tả"
                  className={classes.textField}
                  value={this.state.description}
                  margin="normal"
                  fullWidth
                  multiline
                  onChange={this.onChangeText}
                  name='description'
                />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <TextField
                    id="standard-name"
                    label="Dài"
                    className={classes.textFieldAttribute}
                    value={this.state.length}
                    margin="normal"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                    onChange={this.onChangeText}
                    name='length'
                  />
                  <TextField
                    id="standard-name"
                    label="Rộng"
                    className={classes.textFieldAttribute}
                    value={this.state.width}
                    margin="normal"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                    onChange={this.onChangeText}
                    name='width'
                  />
                  <TextField
                    id="standard-name"
                    label="Cao"
                    className={classes.textFieldAttribute}
                    value={this.state.height}
                    margin="normal"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                    onChange={this.onChangeText}
                    name='height'
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <TextField
                    id="standard-name"
                    label="Giá nhập mua"
                    className={classes.textFieldAttribute}
                    value={this.state.unitprice}
                    margin="normal"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                    }}
                    onChange={this.onChangeText}
                    name='unitprice'
                  />
                  <TextField
                    id="standard-name"
                    label="Giá bán"
                    className={classes.textFieldAttribute}
                    value={this.state.saleprice}
                    margin="normal"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                    }}
                    onChange={this.onChangeText}
                    name='saleprice'
                  />
                  <TextField
                    id="standard-name"
                    label="Số lượng nhập"
                    className={classes.textFieldAttribute}
                    value={this.state.importqty}
                    margin="normal"
                    type='number'
                    onChange={this.onChangeText}
                    name='importqty'
                  />
                </div>
                <TextField
                  id='filled-select-currency-native'
                  select
                  label='Ngành hàng'
                  className={classes.departmentTextField}
                  value={this.state.department}
                  onChange={this.onChangeText}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="filled"
                  name='department'
                  fullWidth
                >
                  {this.props.departments.map(department => (
                    <option key={department.name} value={department.name}>
                      {department.caption}
                    </option>
                  ))}
                </TextField>
              </div>
            </Paper>


            <Paper className={classes.productImage}>
              <Input
                accept='.jpg/.png'
                type='file'
                id='product-image-full'
                fullWidth
                className={classes.inputImage}
                multiple
                onChange={this.chooseProductImages}
              />
              <label htmlFor="product-image-full">
                <Button variant="contained" component="span" color='secondary' className={classes.button}>
                  Chọn hình ảnh sản phẩm
                </Button>
              </label>
              <GridList cols={4} spacing={1} cellHeight={200}>
                {this.state.images.map(pdimage => (
                  <GridListTile key={pdimage.name} cols={1} rows={1}>
                    <img src={URL.createObjectURL(pdimage)} alt='' />
                    <GridListTileBar
                      title={pdimage.name}
                      titlePosition="top"
                      actionIcon={
                        <IconButton className={classes.icon} onClick={() => this.deleteProductImage(pdimage.name)}>
                          <Delete />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes.titleBar}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Paper>
            <Paper>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Button color='secondary' variant='contained' style={{ marginRight: 20 }} onClick={() => {this.props.routerScreen('/')}}>Hủy bỏ</Button>
                <Button color='primary' variant='contained' style={{ marginLeft: 20 }} onClick={this.onSubmitButton}>Tạo sản phẩm</Button>
              </div>
            </Paper>
          </div>
        </div>

      </MuiThemeProvider>
    )
  }
}

const mapState2Props = (state) => {
  return {
    departments: state.ProductReducer.departments
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    createNewProduct: (data) => {
      return dispatch({ type: 'REQUEST_CREATE_NEW_PRODUCT', payload: data })
    },
    routerScreen: (screenName) => {
      dispatch({ type: 'SCREEN_ROUTER', payload: screenName })
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(NewProduct)))