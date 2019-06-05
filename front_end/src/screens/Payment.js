import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { GreenButton } from '../components/Components';
import NewCustomerDialog from '../components/NewCustomerDialog';
import { connect } from 'react-redux';
import SelectAutoComplete from '../components/SelectAutoComplete';
import MaterialStepper from '../components/MaterialStepper';
import {StepperData, BankName} from '../data/Config';
import {StyledButton} from '../components/Components';
import {PaymentType, ShipmentType} from '../data/Config';
import moment from 'moment';

export class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        payment_type:'direct',
        customer_pay: 0,
        shipment_type: 'company_shipping',
        shipment_date: new Date(),
        shipment_address: this.props.customer.address,
        receiver_name: this.props.customer.name,
        paid_amount: 0,
        receiver_phone_number: '',
        bank_name: '',
        bank_number: ''
    }
  }

  onChangeText = (event) => {
    if(event.target.name == 'payment_type'){
      if(event.target.value == 'direct' || event.target.value == 'bank'){
        this.setState({paid_amount: this.props.MainSaleOrder.total_amount, 
                        remain_amount: 0, 
                        [event.target.name] : event.target.value}, () => {
          this.updateMainSaleOrder();
        })
      }
      else {
        this.setState({ remain_amount: this.props.MainSaleOrder.total_amount, 
                        paid_amount: 0, 
                        [event.target.name] : event.target.value}, () => {
                        this.updateMainSaleOrder();
        })
      }
    }
    else if(event.target.name == 'shipment_type'){
      if(event.target.value == 'customer_shipping'){
        this.setState({shipment_date: new Date(),
                        shipment_address: this.props.customer.address,
                        receiver_name: this.props.customer.name,
                        receiver_phone_number: this.props.customer.phone_number,
                        [event.target.name] : event.target.value}, () => {
                          this.updateMainSaleOrder();
                        })
      }
      else {
        this.setState({[event.target.name]: event.target.value}, () => {
          this.updateMainSaleOrder();
        })
      }
    }
    else {
      this.setState({[event.target.name]: event.target.value}, () => {
        this.updateMainSaleOrder();
      })
    }
  }

  onChangeNumber = (event) => {
    this.setState({[event.target.name]: parseFloat(event.target.value)}, () => {
      this.updateMainSaleOrder();
    })
  }

  updateMainSaleOrder = () => {
    let mainSaleOrder = {
        payment_type:this.state.payment_type,
        customer_pay: this.state.customer_pay,
        shipment_type: this.state.shipment_type,
        shipment_date: this.state.shipment_date,
        shipment_address: this.state.shipment_address,
        receiver_name: this.state.receiver_name,
        paid_amount: this.state.paid_amount,
        bank_name: this.state.bank_name,
        bank_number: this.state.bank_number,
        receiver_phone_number: this.state.receiver_phone_number
    }
    this.props.updateMainSaleOrder(mainSaleOrder)
  }

  render() {
    const {MainSaleOrder} = this.props;
    return (
      <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%' }}>
        <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white' }}>
          Thông tin thanh toán
        </div>
        <MaterialStepper
          data = {StepperData}
          activeStep = {2}
        />

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', allignItems: 'center'}}>

          <div style={{ width: '80%', border: '2px solid #9dcaff', borderRadius: 5 , margin: 20, marginBottom: 0}}>
            <div style={{ height: 30, fontSize: '1.2rem', fontWeight: 'bold', marginLeft: 20 }}>
              Thông tin thanh toán
            </div>
            <hr style = {{margin: 5}}></hr>
            <div style = {{display: 'flex', flexDirection: 'row',  margin: 10}}>
                <div>Chọn phương thức thanh toán: </div>
                <select style = {{flexGrow: 1, border: '1px solid purple', borderRadius: 3, marginLeft: 10, paddingLeft:20}} onChange = {this.onChangeText} value = {MainSaleOrder.payment_type} name = 'payment_type'>
                  {PaymentType.map(item => (
                    <option value = {item.value}>{item.caption}</option>
                  ))}    
                </select>
            </div>
            {
              {
                'direct': 
                  <div style = {{display: 'flex', flexDirection: 'column', margin: 10,padding: 10, border:'1px solid green', borderRadius: 3, fontSize: '0.8rem', lineHeight: 2}}>
                    <div style = {{display: 'flex', flexDirection: 'row'}}> 
                      <Grid xs = {3}>Tổng tiền thanh toán</Grid>
                      <Grid xs = {9} style = {{fontWeight: 'bold', color: 'red', paddingLeft: 10}}>{MainSaleOrder.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                      <Grid xs = {3}>Tiền khách đưa</Grid>
                      <Grid xs = {3} style = {{border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                        <input type = 'number' name = 'customer_pay' placeholder = '0.00' style = {{border:'0px', flexGrow: 1, width: 100}} onChange = {this.onChangeText}/>
                        <div>VNĐ</div>
                      </Grid>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                      <Grid xs = {3}> Tiền trả lại: </Grid>
                      <Grid xs = {9} style = {{marginLeft: 10, color: 'green'}}>{(this.state.customer_pay - MainSaleOrder.total_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
                    </div>
                  </div>,
                'after_shipment': 
                    <div style = {{display: 'flex', flexDirection: 'column', margin: 10,padding: 10, border:'1px solid green', borderRadius: 3, fontSize: '0.8rem', lineHeight: 2}}>
                    <div style = {{display: 'flex', flexDirection: 'row'}}> 
                      <Grid xs = {3}>Tổng tiền thanh toán</Grid>
                      <Grid xs = {9} style = {{fontWeight: 'bold', color: 'red', paddingLeft: 10}}>{MainSaleOrder.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                      <Grid xs = {3}>Đặt trước</Grid>
                      <Grid xs = {3} style = {{border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                        <input type = 'number' name = 'paid_amount' placeholder = '0.00' style = {{border:'0px', flexGrow: 1, width: 100}} onChange = {this.onChangeNumber} value = {MainSaleOrder.paid_amount}/>
                        <div>VNĐ</div>
                      </Grid>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                      <Grid xs = {3}> Còn lại: </Grid>
                      <Grid xs = {9} style = {{marginLeft: 10, color: 'green'}}>{(MainSaleOrder.total_amount - this.state.paid_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
                    </div>
                  </div>,
                'bank': 
                    <div style = {{display: 'flex', flexDirection: 'column', margin: 10,padding: 10, border:'1px solid green', borderRadius: 3, fontSize: '0.8rem', lineHeight: 2}}>
                    <div style = {{display: 'flex', flexDirection: 'row'}}> 
                      <Grid xs = {3}>Tổng tiền thanh toán</Grid>
                      <Grid xs = {9} style = {{fontWeight: 'bold', color: 'red', paddingLeft: 10}}>{((this.props.SaleOrder.filter(item => item.selected).reduce((total, saleOrderItem) => { return total + (parseInt(saleOrderItem.productQty) * ((parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) ? parseInt(saleOrderItem.product.saleprice[saleOrderItem.product.saleprice.length - 1].value) : 0))) }, 0))*(100 - MainSaleOrder.discount || 100) / 100 ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' VNĐ'}</Grid>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                      <Grid xs = {3}>Ngân hàng</Grid>
                      <Grid xs = {3}>
                        <select name = 'bank_name' onChange = {this.onChangeText} style = {{paddingLeft:10}} value = {MainSaleOrder.bank_name}>
                          {BankName.map(item => (
                            <option value = {item} >{item}</option>
                          ))}
                        </select>
                      </Grid>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                      <Grid xs = {3}> Số tài khoản: </Grid>
                      <Grid xs = {3} style = {{border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, height: 24}}>
                        <input type = 'number' name = 'bank_number' placeholder = '192055411021' style = {{border:'0px', flexGrow: 1, width: 100}} onChange = {this.onChangeText} value = {MainSaleOrder.bank_number}/>
                      </Grid>
                    </div>
                  </div>,
              }[MainSaleOrder.payment_type]
            }
          </div>

          <div style={{ width: '80%', border: '2px solid #9dcaff', borderRadius: 5, margin: 20 }}>
            <div style={{ height: 30, fontSize: '1.2rem', fontWeight: 'bold', marginLeft: 20 }}>
              Thông tin giao hàng
            </div>
            <hr style = {{margin: 5}}></hr>
            <div style = {{display: 'flex', flexDirection: 'row',  margin: 10}}>
                <div style = {{marginRight: 40}}>Phương thức giao hàng: </div>
                <select style = {{flexGrow: 1, border: '1px solid purple', borderRadius: 3, marginLeft: 10, paddingLeft:20}} onChange = {this.onChangeText} name = 'shipment_type'>
                  {ShipmentType.map(item => (
                    <option value = {item.value}>{item.caption}</option>
                  ))} 
                </select>
            </div>
            {
              {
              'company_shipping':
                <div style = {{display: 'flex', flexDirection: 'column', margin: 10,padding: 10, border:'1px solid green', borderRadius: 3, fontSize: '0.8rem', lineHeight: 2}}>
                  <div style = {{display: 'flex', flexDirection: 'row'}}> 
                    <Grid xs = {3}>Ngày giao</Grid>
                    <Grid xs = {3} style = {{border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                      <input type = 'date' name = 'shipment_date' value = {moment(MainSaleOrder.shipment_date || (new Date())).format('YYYY-MM-DD')} placeholder = '0.00' style = {{border:'0px', flexGrow: 1, width: 100}} onChange = {this.onChangeText}/>
                    </Grid>
                    <Grid item xs= {7}/>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid xs = {3}>Địa chỉ giao</Grid>
                    <Grid xs = {10} style = {{ borderRadius: 3, display: 'flex', flexDirection: 'row'}}>
                      <input type = 'text' name = 'shipment_address' value = {MainSaleOrder.shipment_address} placeholder = 'Tổ 1 Hòa Khánh Nam, Đà Nẵng' style = {{border:'0px',borderBottom: '1px solid green', paddingLeft: 10, flexGrow: 1, width: 100}} onChange = {this.onChangeText}/>
                    </Grid>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid xs = {3}> Người nhận hàng: </Grid>
                    <Grid xs = {10} style = {{ borderRadius: 3, display: 'flex', flexDirection: 'row'}}>
                      <input type = 'text' name = 'receiver_name' value = {MainSaleOrder.receiver_name} placeholder = 'Đỗ Thanh Nhàn' style = {{border:'0px',borderBottom: '1px solid green', paddingLeft: 10, flexGrow: 1, width: 100}} onChange = {this.onChangeText}/>
                    </Grid>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid xs = {3}> Số điện thoại người nhận hàng: </Grid>
                    <Grid xs = {10} style = {{ borderRadius: 3, display: 'flex', flexDirection: 'row'}}>
                      <input type = 'text' name = 'receiver_phone_number' value = {MainSaleOrder.receiver_phone_number} placeholder = '01208944751' style = {{border:'0px',borderBottom: '1px solid green', paddingLeft: 10, flexGrow: 1, width: 100}} onChange = {this.onChangeText}/>
                    </Grid>
                  </div>
                </div>,
              'customer_shipping': 
                <div style = {{display: 'flex', flexDirection: 'column', margin: 10,padding: 10, border:'1px solid green', borderRadius: 3, fontSize: '0.8rem', lineHeight: 2}}>
                  <div style = {{display: 'flex', flexDirection: 'row'}}> 
                    <Grid xs = {3}>Ngày giao</Grid>
                    <Grid xs = {3} >
                      {moment(new Date()).format('DD/MM/YYYY')}
                    </Grid>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid xs = {3}>Địa chỉ giao</Grid>
                    <Grid xs = {8} style = {{ borderRadius: 3, display: 'flex', flexDirection: 'row'}}>
                      {MainSaleOrder.shipment_address}
                    </Grid>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid xs = {3}> Người nhận hàng: </Grid>
                    <Grid xs = {8} style = {{ borderRadius: 3, display: 'flex', flexDirection: 'row'}}>
                      {MainSaleOrder.receiver_name}
                    </Grid>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid xs = {3}> Số điện thoại người nhận hàng: </Grid>
                    <Grid xs = {8} style = {{ borderRadius: 3, display: 'flex', flexDirection: 'row'}}>
                      {MainSaleOrder.receiver_phone_number}
                    </Grid>
                  </div>
                </div>,
              }[MainSaleOrder.shipment_type]
            }
          </div>
        </div>
        
        <div style = {{display: 'flex',flexDirection:'row', margin: 10}}>
          <Grid xs = {8}>
              
          </Grid>
          <Grid xs = {4} style = {{ padding: 5}}>
                <div>
                  <StyledButton onClick = {this.props.goToOrderInfo} style = {{width:'100%'}}> Hoàn tất</StyledButton>
                </div>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    token: state.LoginReducer.token,
    customers: state.CustomerReducer.customers,
    customer: state.CustomerReducer.customer,
    SaleOrder: state.ProductReducer.SaleOrder,
    MainSaleOrder: state.ProductReducer.MainSaleOrder
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    updateMainSaleOrder: (data) => {
      dispatch({ type: 'UPDATE_MAIN_SALE_ORDER', payload: data})
    },
    loadCustomer: (token) => {
      dispatch({ type: 'GET_ALL_CUSTOMERS', token: token })
    },
    goToOrderInfo: () => {
      dispatch({type: 'SCREEN_ROUTER', payload: '/saleorder/info'})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(Payment);
