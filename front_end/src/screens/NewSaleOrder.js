import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paper, Dialog, FormControlLabel, Checkbox, Table, TableHead, TableFooter, TableCell, TableRow, TableBody, TextField, IconButton, Button,Grid } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons';
import YesNoDialog from '../components/YesNoDialog';
import { StyledButton } from '../components/Components';
import ReactToPrint from 'react-to-print';
import MaterialStepper from '../components/MaterialStepper'
import {StepperData} from '../data/Config'

export class NewSaleOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.SaleOrder.map(item => { item.selected = false; return item }),
      checked: false,
      openDialog: false,
      _id: '',
      showPrintDialog: false
    }
  }

  componentDidMount(){
    this.props.updateSaleOrderItem(this.props.SaleOrder.map(item => {
      item.selected = true;
      return item;
    }))
  }

  onChangeCheck = (id, event) => {
    this.setState({ items: this.state.items.map(item => { if (item._id == id) item.selected = event.target.checked; return item }) })
  }

  decreaseItemQty = (id) => {
    this.props.updateSaleOrderItem(
      this.props.SaleOrder.map(item => {
        if(item.product._id == id){
          if(item.productQty > 1) item.productQty = parseFloat(item.productQty) -1 ;
        }
        return item;
      })
    )
  }

  increaseItemQty = (id) => {
    this.props.updateSaleOrderItem(
      this.props.SaleOrder.map(item => {
        if(item.product._id == id){
          if(!item.productQty) item.productQty = 1;
          else if(item.productQty < item.product.importqty) item.productQty = parseFloat(item.productQty) + 1 ;
          else alert('Vuợt quá số sản phẩm còn lại trong kho');
        }
        return item;
      })
    )
  }

  updateItemQty = (id, event) => {
    if(parseFloat(event.target.value)){
      this.props.updateSaleOrderItem(this.props.SaleOrder.map(item => {
        if(item.product._id == id){
          if(parseFloat(event.target.value) <= item.product.importqty){
            item.productQty = parseFloat(event.target.value);
          }
          else{
            alert('Vuợt quá số sản phẩm còn lại trong kho');
          }
        }
        return item;
      }))
    }
    else if(event.target.value == ''){
      this.props.updateSaleOrderItem(this.props.SaleOrder.map(item => {
        if(item.product._id == id){
          item.productQty = event.target.value;
        }
        return item;
      }))
    }
  }

  onChangeQty = (index, event) => {
    
  }

  render() {
    const { classes } = this.props;
    return (
      <div style =  {{margin: 3, border: '1px solid #2979ff', borderRadius:5}}>
        <div style = {{height: 30, textAlign:'center', backgroundColor:'#00695c',  color:'white'}}>
          Giỏ hàng
        </div>
        {this.props.role != 'guess' && this.props.role && <div>
          <MaterialStepper
            data = {StepperData}
            activeStep = {0}
          />
        </div>}
        <div style = {{margin: 10, border: '1px solid green', borderRadius: 3}}>
          <Grid container style = {{display: 'flex', flexDirection: 'row',fontSize:'0.8rem', fontWeight:'bold',margin:10, alignItems: 'center' }}>
            <Grid item xs = {1} style = {{textAlign: 'center',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Số TT</Grid>
            <Grid item xs = {1} style = {{textAlign: 'center'}}>Chọn</Grid>
            <Grid item xs = {2} style = {{textAlign: 'center'}}>Hình ảnh</Grid>
            <Grid item xs = {4}>Tên sản phẩm</Grid>
            <Grid item xs = {1} style = {{textAlign: 'center'}}>Số lượng</Grid>
            <Grid item xs = {1} style = {{textAlign: 'center'}}>Đơn giá</Grid>
            <Grid item xs = {1} style = {{textAlign: 'center'}}>Tổng tiền</Grid>
            <Grid item xs = {1} style = {{textAlign: 'center'}}>Hành động</Grid>
          </Grid>
          <hr style = {{margin: 0}}></hr>
          <div style = {{display: 'flex', flexDirection:'column'}}>
            {this.props.SaleOrder.map((item, index) => (
              <div>
                <Grid container xs = {12} style = {{display: 'flex', flexDirection: 'row',fontSize:'0.8rem',marginLeft:10, alignItems:'center'}}>
                <Grid item xs = {1} style = {{textAlign: 'center'}}>{index + 1}</Grid>
                <Grid item xs = {1} style = {{textAlign: 'center'}}><Checkbox checked={item.selected} color='secondary' onChange={(event) => { this.props.updateSaleOrderItem(this.props.SaleOrder.map(saleOrderItem => { if (saleOrderItem.product._id == item.product._id) saleOrderItem.selected = event.target.checked; return saleOrderItem; })) }} /></Grid>
                <Grid item xs = {2} style = {{textAlign: 'center'}}><img style={{ width: 100, height: 100 }} src={`data:image/png;base64,${item.product.subImage}`} /></Grid>
                <Grid item xs = {4} style = {{fontWeight:'bold'}}>
                  <a href = 'javascript:;' onClick = {() => {this.props.showProductDetail(item.product._id)}}>
                    {item.product.name.toUpperCase()}
                  </a>
                </Grid>
                <Grid item xs = {1} style = {{textAlign: 'center', paddingLeft: 20, paddingRight: 20}}>
                  <div style = {{width:'100%', display:'flex'}}>
                    <div onClick = {() => {this.decreaseItemQty(item.product._id)}} style = {{width:35, display: 'flex', justifyContent:'center', alignItems: 'center', border: '1px solid #999', borderTopLeftRadius: 3, borderBottomLeftRadius:3}}>-</div>
                    <input 
                      value = {item.productQty} 
                      onChange={(event) => {this.updateItemQty(item.product._id, event)}}
                      style = {{width:30, display: 'flex', justifyContent:'center', alignItems: 'center', border: '1px solid #999', textAlign:'center', fontWeight: 'bold'}}
                    />
                    <div onClick = {() => {this.increaseItemQty(item.product._id)}} style = {{width:35, display: 'flex', justifyContent:'center', alignItems: 'center', border: '1px solid #999',  borderTopRightRadius: 3, borderBottomRightRadius:3}}>+</div>
                  </div>
                </Grid>
                <Grid item xs = {1} style = {{textAlign: 'center'}}>{(parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                <Grid item xs = {1} style = {{textAlign: 'center'}}>{(parseInt(item.productQty) * ((parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) ? parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) : 0))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                <Grid item xs = {1} style = {{textAlign: 'center'}}>
                  <IconButton 
                    onClick={() => {
                      this.setState({ _id: item.product._id }, () => {
                      this.setState({ openDialog: true })
                      })
                    }}>
                    <DeleteForever/>
                  </IconButton>
                </Grid>
                </Grid>
                <hr style = {{margin: 2}}></hr>
              </div>
            ))}
          </div>
          <Grid container xs = {12} style = {{fontWeight: 'bold', margin:5}}>
            <Grid item xs = {4}></Grid>
            <Grid item xs = {4}>Tổng cộng</Grid>
            <Grid item xs = {2}>{this.props.SaleOrder.filter(item => item.selected).reduce((total,saleOrderItem) => {return total + parseInt(saleOrderItem.productQty)},0)}{' sản phẩm'}</Grid>
            <Grid item xs = {2} style = {{color: 'red'}}>{(this.props.SaleOrder.filter(item => item.selected).reduce((total, saleOrderItem) => { return total + (parseInt(saleOrderItem.productQty) * ((parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) ? parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) : 0))) }, 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
          </Grid>
        </div>
        

        <Paper style={{ display: 'block' }}>
          <YesNoDialog
            fullScreen={false}
            open={this.state.openDialog}
            handleClickNo={() => { this.setState({ openDialog: false }) }}
            handleClickYes={() => {
              this.props.updateSaleOrderItem(this.props.SaleOrder.filter(saleOrderItem => saleOrderItem.product._id != this.state._id))
              this.setState({ openDialog: false });
            }
            }
            title='Xác nhận xóa'
            content='Bạn muốn xóa sản phẩm này khỏi giỏ hàng?'
            noLabel='Không'
            yesLabel='Xóa'
          />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
            <StyledButton onClick={() => this.setState({ showPrintDialog: true })}>In báo giá</StyledButton>
            {!this.props.role || this.props.role == 'guess' ?
              <div />
              : <StyledButton onClick = {this.props.SaleOrder.filter(item => item.selected).length > 0 ? 
                () => this.props.chooseCustomer((this.props.SaleOrder.filter(item => item.selected).reduce((total, saleOrderItem) => { return total + (parseInt(saleOrderItem.productQty) * ((parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) ? parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) : 0))) }, 0)))
                  : () => {alert('Vui lòng chọn ít nhất 1 sản phẩm')}}>
                Chọn khách hàng
              </StyledButton>}
          </div>
        </Paper>

        <Dialog open={this.state.showPrintDialog}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', marginLeft: 50, marginRight: 50}}>
            <StyledButton variant = 'contained' color = 'secondary' onClick = {() => this.setState({showPrintDialog: false})}>Hủy</StyledButton>
            <ReactToPrint
              trigger={() => (<StyledButton>In</StyledButton>)}
              content={() => this.componentRef}
            />
          </div>
          <div ref={ref => this.componentRef = ref}>
          <Paper> 
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
              <img src = {require('../data/logo.png')} style = {{height: 100}}/>
              <div style = {{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItem: 'center',flexGrow: 1}}>
                <div style = {{fontSize: 20, fontColor: '#651fff', fontWeight:'bold', textAlign: 'center'}}>Báo giá sản phẩm</div>
                <div style = {{fontSize: 12, fontColor: '#212121', fontWeight:'italic',textAlign: 'center'}}>Ngày : {(new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + (new Date().getFullYear()))}</div>
              </div>
            </div>
          </Paper>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Số TT</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Hình ảnh</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Tên sản phẩm</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Số lượng</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Đơn giá</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Tổng tiền</div></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.SaleOrder.filter(item => item.selected).map((item, index) => (
                  <TableRow>
                    <TableCell style = {{textAlign:'center'}}>{index + 1}</TableCell>
                    <TableCell><img style={{ width: 100, height: 100 }} src={`data:image/png;base64,${item.product.subImage}`} /></TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell style = {{textAlign:'center'}}>
                      {item.productQty}
                    </TableCell>
                    <TableCell>{item.product.saleprice[item.product.saleprice.length - 1].value || 0}</TableCell>
                    <TableCell>{(parseInt(item.productQty) * ((parseInt(item.product.saleprice[item.product.saleprice.length - 1].value) ? parseInt(item.product.saleprice[item.product.saleprice.length - 1].value) : 0))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Tổng cộng</div></TableCell>
                  <TableCell colSpan={1.5}><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>{(this.props.SaleOrder.filter(item => item.selected).reduce((total,saleOrderItem) => {return total + parseInt(saleOrderItem.productQty)},0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' sản phẩm'}</div></TableCell>
                  <TableCell align="right"><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>{(this.props.SaleOrder.filter(item => item.selected).reduce((total, saleOrderItem) => { return total + (parseInt(saleOrderItem.productQty) * ((parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) ? parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) : 0))) }, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}{' VNĐ'}</div></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    SaleOrder: state.ProductReducer.SaleOrder,
    role: state.LoginReducer.role
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    updateSaleOrderItem: (SaleOrder) => {
      dispatch({ type: 'UPDATE_SALE_ORDER_ITEM', payload: SaleOrder })
    },
    chooseCustomer: (amount) => {
      dispatch({type: 'SET_MAIN_SALE_ORDER_SUB_AMOUNT', payload: amount});
      dispatch({type: 'SCREEN_ROUTER', payload: '/saleorder/customer', amount})
    },
    showProductDetail:(id) => {
      dispatch({type: 'SCREEN_ROUTER', payload: `/products/${id}`})
    },
  }
}

export default connect(mapState2Props, mapDispatch2Props)(NewSaleOrder)
