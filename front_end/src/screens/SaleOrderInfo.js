import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialStepper from '../components/MaterialStepper';
import {StepperData, ShipmentType, PaymentType} from '../data/Config';
import {StyledButton} from '../components/Components'

export class SaleOrderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCustomerDialog: false
    }
  }

  componentDidMount() {
  }

  onChangeCustomer = (event) => {
    if (event && event.value) {
      let selectedCustomer = this.props.customers.filter(customer => customer.name == event.value)[0];
      if (selectedCustomer) {
        this.props.changeCustomer(selectedCustomer)
      }
    }
  }

  createSaleOrder = () => {
      let SaleOrder = {...this.props.MainSaleOrder};
      SaleOrder.customer_id = this.props.customer._id;
      SaleOrder.seller_id = this.props.user_id;
      SaleOrder.items = this.props.SaleOrder.filter(item => item.selected).map(item => {return {qty: item.productQty, product_id: item.product._id, sale_price: item.product.saleprice[item.product.saleprice.length -1].value || 0}})
      this.props.createSaleOrder(this.props.token, SaleOrder);
      this.props.updateLocalStorageSaleOrder(this.props.SaleOrder.filter(item => item.selected == false))
    }

  render() {
      const {customer, SaleOrder, MainSaleOrder} = this.props
    return (
      <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%' , overflow:'scroll'}}>
        <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white' }}>
          Thông tin đơn hàng
        </div>
        <MaterialStepper
          data = {StepperData}
          activeStep = {3}
        />
        <div style = {{marginLeft: 20, fontWeight: 'bold', color: '#212121'}}>Thông tin chung</div>
        <div style = {{margin: 20, marginTop: 5, border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', fontSize: '14px'}}>
            <Grid item xs = {6} style = {{padding: 10, display: 'flex', flexDirection: 'column', lineHeight: 2}}>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Tên khách hàng:
                    </Grid>
                    <Grid item xs = {8}>
                        {customer.name}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Số điện thoại:
                    </Grid>
                    <Grid item xs = {8}>
                    {customer.phone_number}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Địa chỉ email:
                    </Grid>
                    <Grid item xs = {8}>
                        {customer.email}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Giới tính:
                    </Grid>
                    <Grid item xs = {8}>
                        {customer.genger == 'male' ? 'Nam' : customer.genger == 'female' ? 'Nữ' : 'Không xác định'}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Địa chỉ:
                    </Grid>
                    <Grid item xs = {8}>
                        {customer.address}
                    </Grid>
                </div>               
            </Grid>

            <Grid item xs = {6} style = {{paddingLeft: 10, paddingBottom: 10, display: 'flex', flexDirection: 'column', lineHeight: 2, borderLeft: '1px solid green'}}>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4} style = {{ marginTop: 10}}>
                        Hình thức giao hàng:
                    </Grid>
                    <Grid item xs = {6} style = {{ marginTop: 10}}>
                        {ShipmentType.filter(type => type.value == MainSaleOrder.shipment_type)[0].caption}
                    </Grid>
                    <Grid item xs = {2} style = {{height:30, backgroundColor: 'green', borderBottomLeftRadius: 8, textAlign: 'center', color: 'white', fontWeight:'bold'}}>Tạo mới</Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Hình thức thanh toán:
                    </Grid>
                    <Grid item xs = {8}>
                        {PaymentType.filter(type => type.value == MainSaleOrder.payment_type)[0].caption}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Người nhận:
                    </Grid>
                    <Grid item xs = {8}>
                        {MainSaleOrder.receiver_name}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Số điện thoại người nhận:
                    </Grid>
                    <Grid item xs = {8}>
                        {MainSaleOrder.receiver_phone_number}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Địa chỉ nhận hàng:
                    </Grid>
                    <Grid item xs = {8}>
                        {MainSaleOrder.shipment_address}
                    </Grid>
                </div>
                
            </Grid>
        </div>
        <div style = {{marginLeft: 20, fontWeight: 'bold', color: '#212121'}}>Danh sách sản phẩm</div>
        <div style = {{margin:20, marginTop: 5, border:'1px solid green', borderRadius: 3,  paddingLeft:10, paddingRight:10, fontSize:'0.8rem'}}>
            <div style = {{display: 'flex', flexDirection: 'row'}}>
                <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Hình ảnh</Grid>
                <Grid item xs = {4} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Tên sản phẩm</Grid>
                <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Đơn giá</Grid>
                <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Số lượng</Grid>
                <Grid item xs = {2} style = {{textAlign: 'center'}}>Thành tiền</Grid>
            </div>
            <hr style = {{margin: 2, color: 'red'}}></hr>
            {SaleOrder.filter(item => item.selected).map((item, index) => (
                <div style = {{display: 'flex', flexDirection: 'row', backgroundColor: index % 2 == 0 ? '#e0e0e0' : 'white'}}>
                    <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575', display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}><img style={{ width: 50, height: 50 }} src={`data:image/png;base64,${item.product.subImage}`} /></Grid>
                    <Grid item xs = {4} style = {{textAlign: 'center', borderRight:'1px dotted #757575',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>{item.product.name}</Grid>
                    <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>{(parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                    <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575', display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>{item.productQty}</Grid>
                    <Grid item xs = {2} style = {{textAlign: 'center',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center', justifyContent:'center' }}>{(parseFloat((item.product.saleprice[item.product.saleprice.length - 1].value) || 0)*item.productQty).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                </div> ))}
                <hr style = {{margin: 2, color:'red'}}></hr>
                <div style = {{display: 'flex', flexDirection: 'row', padding: 5, fontWeight: 'bold'}}>
                    <Grid item xs = {8}></Grid>
                    <Grid item xs = {4} style = {{ display:'flex', flexDirection: 'column'}}>
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {6}>Tổng thành tiền</Grid>
                            <Grid item xs = {6}  style = {{textAlign: 'center'}}>{MainSaleOrder.sub_total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>   
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {4} style = {{textAlign: 'left'}}>Chiết khấu</Grid>
                            <Grid item xs = {2} style = {{textAlign: 'center'}}>{MainSaleOrder.discount}%</Grid>
                            <Grid item xs = {6} style = {{textAlign: 'center'}}>{(MainSaleOrder.discount * MainSaleOrder.sub_total_amount/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>    
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {6}  style = {{textAlign: 'left', borderLeft: 10}}>Đã thanh toán</Grid>
                            <Grid item xs = {6}  style = {{textAlign: 'center'}}>{MainSaleOrder.paid_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>   
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {6}  style = {{textAlign: 'left'}}>Còn lại</Grid>
                            <Grid item xs = {6}  style = {{textAlign: 'center'}}>{(MainSaleOrder.total_amount - MainSaleOrder.paid_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>    
                    </Grid>
                </div>
        </div>
        <Grid item xs = {12} style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {8}/>
                    <Grid item xs = {4} style = {{marginLeft:30, marginRight: 30}}><StyledButton onClick = {this.createSaleOrder} fullWidth>Tạo đơn hàng</StyledButton></Grid>
                </Grid>
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    token: state.LoginReducer.token,
    customer: state.CustomerReducer.customer,
    SaleOrder: state.ProductReducer.SaleOrder,
    MainSaleOrder: state.ProductReducer.MainSaleOrder,
    user_id: state.LoginReducer.user_id
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    createSaleOrder: (token, SaleOrder) => {
        dispatch({type:'CREATE_NEW_SALE_ORDER', token: token, payload: SaleOrder})
    },
    updateLocalStorageSaleOrder:(NewSaleOrder) => {
        dispatch({type: 'UPDATE_SALE_ORDER_ITEM', payload: NewSaleOrder})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(SaleOrderInfo);
