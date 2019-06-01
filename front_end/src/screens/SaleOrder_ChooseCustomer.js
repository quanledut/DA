import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { GreenButton } from '../components/Components';
import NewCustomerDialog from '../components/NewCustomerDialog';
import { connect } from 'react-redux';
import SelectAutoComplete from '../components/SelectAutoComplete';
import MaterialStepper from '../components/MaterialStepper';
import {StepperData} from '../data/Config';
import {StyledButton} from '../components/Components'

export class SaleOrder_ChooseCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCustomerDialog: false
    }
  }

  componentDidMount() {
    this.props.loadCustomer(this.props.token);
  }

  onChangeCustomer = (event) => {
    if (event && event.value) {
      let selectedCustomer = this.props.customers.filter(customer => customer.name == event.value)[0];
      if (selectedCustomer) {
        this.props.changeCustomer(selectedCustomer)
      }
    }
    console.log(typeof(this.props.customer.birthday))
  }

  render() {
    return (
      <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%' }}>
        <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white' }}>
          Thông tin khách hàng
        </div>
        <MaterialStepper
          data = {StepperData}
          activeStep = {1}
        />
        <div style={{ margin: 20, display: 'flex', height: 65, flexDirection: 'row', justifyContent: 'space-around' }}>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.8em', color: 'rgba(0, 0, 0, 0.54)' }}>Chọn khách hàng</div>
            <div style = {{width: '100%'}}>
              <SelectAutoComplete
                suggestions={this.props.customers.map(customer => { return { value: customer.name, label: customer.name } })}
                onChangeSelect={this.onChangeCustomer}
                customer={this.props.customer}
              />
            </div>
          </div>
          <GreenButton style={{ margin: 20 }} onClick={() => { this.setState({ showAddCustomerDialog: true }) }}>
            Khách hàng mới
          </GreenButton>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>

          <div style={{ width: '60%', border: '2px solid #9dcaff', borderRadius: 5 }}>
            <div style={{ height: 30, fontSize: '1.2rem', fontWeight: 'bold', marginLeft: 20 }}>
              Thông tin khách hàng
            </div>
            <hr style = {{height:5, margin: 0}}></hr>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column',justifyContent:'center', flexGrow: 1 ,marginLeft:10, fontSize:'0.8em'}}>
                <Grid xs={12} style = {{height: 15, fontWeight: 'bold'}}>
                  {this.props.customer.gender == 'female' ? 'Chị ' : 'Anh '}{this.props.customer.name}
                </Grid>
                <Grid xs={12} style = {{height: 15}}>
                  Email : {this.props.customer.email}
                </Grid>
                <Grid xs={12} style = {{height: 15}}>
                  Điện thoại : {this.props.customer.phone_number}
                </Grid>
                <Grid xs={12} style = {{height: 15}}>
                  Địa chỉ : {this.props.customer.address}
                </Grid>
                <Grid xs={12} style = {{height: 15}}>
                  Ngày sinh : {this.props.customer.birthday && this.props.customer.birthday.split('T')[0].replace(/-/g,'/')}
                </Grid>
              </div>
              <div style = {{overflowY:'hidden',overflowX:'hidden', border: '1px solid #009688', padding: 2, height:150, width:150, margin:5}}>
                <img src={this.props.customer.avatar ? `data:image/png;base64,${this.props.customer.avatar}` : 'http://imgt.taimienphi.vn/cf/Images/tt/2018/5/29/tong-hop-avatar-facebook-dep-doc-la-17.jpg'} style = {{height:'100%'}}/>
              </div>
            </div>
          </div>

          <div style={{ width: '36%', border: '2px solid #9dcaff', borderRadius: 5 }}>
            <div style={{ height: 30, fontSize: '1.2rem', fontWeight: 'bold', marginLeft: 20 }}>
              Thông tin đơn hàng
            </div>
            <hr style = {{height:5, margin: 0}}></hr>
            <div style = {{flexGrow: 1}}>
              {this.props.SaleOrder.filter(item => item.selected).map(item => (
                <div style = {{display:'flex', flexDirection: 'row'}}>
                  <div style = {{margin:3,width:50, height:50}}>
                    <img src={`data:image/png;base64,${item.product.subImage}`} style = {{width:48}}/>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'column', alignItems:'flex-start', flexGrow:1,  fontSize: '0.8rem'}}>
                    <div style = {{fontWeight: 'bold',}}>
                      {item.product.name}
                    </div>
                    <div style = {{color:'red'}}>
                      {(parseFloat(item.product.saleprice[item.product.saleprice.length - 1].value) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnđ
                    </div>
                  </div>
                  <div style = {{width:30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:'0.8rem'}}>
                    x {item.productQty}
                  </div>
                </div>
              ))}
              </div>
              <hr style = {{margin:5}}></hr>
              <div style = {{display: 'flex', flexDirection: 'row', fontSize:'0.8rem', height: 30, paddingLeft: 5, paddingRight: 5}}>
                  <Grid xs = {2} style = {{height: 25, fontWeight: 'bold'}}>Tổng cộng</Grid>
                  <Grid xs = {5} style = {{height: 25}} >
                  </Grid>
                  <Grid style = {{height: 25, textAlign: 'right', color: 'red'}} xs = {5}>{this.props.MainSaleOrder.sub_total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
              </div>
              <div style = {{display: 'flex', flexDirection: 'row', fontSize:'0.8rem', height: 30, paddingLeft: 5, paddingRight: 5}}>
                  <Grid xs = {2} style = {{height: 25, fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>Chiết khấu</Grid>
                  <Grid xs = {5} style = {{height: 25}} >
                    <div style = {{border:'1px solid green', display:'flex', flexDirection: 'row', height: '100%', padding:1, borderRadius: 3}}>
                      <input type = 'number' value = {this.props.MainSaleOrder.discount}
                         onChange = {(event) => this.props.changeDiscount(event, this.state.subTotalAmount * event.target.value)}
                         placeholder = '0.00' style = {{width:'100%', border:'0px', flexGrow: 1, paddingLeft: 10}}/>
                      <div style = {{border:'0px', display: 'flex', justifyContent:'center', alignItems: 'center', paddingLeft: 3, paddingRight: 3}}>%</div>
                    </div>  
                  </Grid>
                  <Grid item xs = {5} style = {{height: 25, textAlign: 'right', color: 'green', alignItems: 'center'}}>{'- '}{(this.props.MainSaleOrder.sub_total_amount * this.props.MainSaleOrder.discount / 100 || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
              </div>
            </div>
        </div>
        
        <div style = {{display: 'flex',flexDirection:'row', margin: 10}}>
          <Grid xs = {7}>
              
          </Grid>
          <Grid xs = {5} style = {{ padding: 5}}>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                  <div>Tổng thanh toán</div>
                  <div style = {{flexGrow:1, textAlign: 'right', color:'red', fontWeight: 'bold'}}>
                  {this.props.MainSaleOrder.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  {' VNĐ'}</div>
                </div>
                <div>
                  <StyledButton onClick = {this.props.customer.name ? () => this.props.goToPayment() : () => {alert('Vui lòng chon khách hàng')}}  style = {{width:'100%'}}> Thanh toán</StyledButton>
                </div>
          </Grid>
        </div>
        <NewCustomerDialog
          open={this.state.showAddCustomerDialog}
          createNewCustomer={this.props.handleCreateNewCustomer}
          closeDialog={() => this.setState({ showAddCustomerDialog: false })}
          token={this.props.token}
        />
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
    handleCreateNewCustomer: (data, token) => {
      dispatch({ type: 'CREATE_NEW_CUSTOMER', payload: data, token: token })
    },
    loadCustomer: (token) => {
      dispatch({ type: 'GET_ALL_CUSTOMERS', token: token })
    },
    changeCustomer: (customer) => {
      dispatch({ type: 'SELECT_CUSTOMER', payload: customer })
    },
    changeDiscount: (event) => {
      dispatch({type: 'CHANGE_DISCOUNT', payload: event.target.value})
    },
    goToPayment: () => {
      dispatch({type: 'SCREEN_ROUTER', payload: '/saleorder/payment'})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(SaleOrder_ChooseCustomer);
