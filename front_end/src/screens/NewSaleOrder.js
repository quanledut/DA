import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paper, Dialog, FormControlLabel, Checkbox, Table, TableHead, TableFooter, TableCell, TableRow, TableBody, TextField, IconButton, Button,Grid } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons';
import YesNoDialog from '../components/YesNoDialog';
import { StyledButton } from '../components/Components';
import ReactToPrint from 'react-to-print';
import Stepper from '../components/Stepper'
import { withStyles } from '@material-ui/core/styles';

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

  onChangeCheck = (id, event) => {
    this.setState({ items: this.state.items.map(item => { if (item._id == id) item.selected = event.target.checked; return item }) })
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
        <div>
          <Stepper/>
        </div>
        <div style = {{margin: 10}}>
          <Grid container style = {{display: 'flex', flexDirection: 'row',fontSize:'0.8rem', fontWeight:'bold',marginLeft:10, }}>
            <Grid item xs = {1}>Số TT</Grid>
            <Grid item xs = {1}>Chọn</Grid>
            <Grid item xs = {2}>Hình ảnh</Grid>
            <Grid item xs = {4}>Tên sản phẩm</Grid>
            <Grid item xs = {1}>Số lượng</Grid>
            <Grid item xs = {1}>Đơn giá</Grid>
            <Grid item xs = {1}>Tổng tiền</Grid>
            <Grid item xs = {1}>Hành động</Grid>
          </Grid>
          <hr></hr>
          <div style = {{display: 'flex', flexDirection:'column'}}>
            {this.props.SaleOrder.map((item, index) => (
              <div>
                <Grid container xs = {12} style = {{display: 'flex', flexDirection: 'row',fontSize:'0.8rem',marginLeft:10, alignItems:'center'}}>
                <Grid item xs = {1}>{index + 1}</Grid>
                <Grid item xs = {1}><Checkbox checked={item.selected} color='secondary' onChange={(event) => { this.props.updateSaleOrderItem(this.props.SaleOrder.map(saleOrderItem => { if (saleOrderItem.product._id == item.product._id) saleOrderItem.selected = event.target.checked; return saleOrderItem; })) }} /></Grid>
                <Grid item xs = {2}><img style={{ width: 100, height: 100 }} src={`data:image/png;base64,${item.product.subImage}`} /></Grid>
                <Grid item xs = {4}>{item.product.name}</Grid>
                <Grid item xs = {1}>
                  <input 
                    type = 'number' 
                    value = {item.productQty} 
                    onChange={(event) => { this.props.updateSaleOrderItem(this.props.SaleOrder.map(saleOrderItem => { if (saleOrderItem.product._id == item.product._id) item.productQty = event.target.value; return saleOrderItem })) }}
                    style = {{width:100}}
                    />
                </Grid>
                <Grid item xs = {1}>{(parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                <Grid item xs = {1}>{(parseInt(item.productQty) * ((parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) ? parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) : 0))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                <Grid item xs = {1}>
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
                <hr></hr>
              </div>
            ))}
          </div>
          <Grid container xs = {12}>
            <Grid item xs = {4}></Grid>
            <Grid item xs = {4}>Tổng cộng</Grid>
            <Grid item xs = {2}>{this.props.SaleOrder.filter(item => item.selected).reduce((total,saleOrderItem) => {return total + parseInt(saleOrderItem.productQty)},0)}{' sản phẩm'}</Grid>
            <Grid item xs = {2}>{(this.props.SaleOrder.filter(item => item.selected).reduce((total, saleOrderItem) => { return total + (parseInt(saleOrderItem.productQty) * ((parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) ? parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) : 0))) }, 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
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
            {!this.props.role || this.props.role == '' ?
              <div />
              : <StyledButton onClick = {this.props.chooseCustomer}>
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
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Số TT</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Hình ảnh</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Tên sản phẩm</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Số lượng</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Đơn giá</div></TableCell>
                  <TableCell><div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>Tổng tiền</div></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.SaleOrder.filter(item => item.selected).map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><img style={{ width: 100, height: 100 }} src={`data:image/png;base64,${item.product.subImage}`} /></TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>
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
    chooseCustomer: () => {
      dispatch({type: 'SCREEN_ROUTER', payload: '/saleorder/customer'})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(NewSaleOrder)
