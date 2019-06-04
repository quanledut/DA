import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { GreenButton } from '../components/Components';
import NewCustomerDialog from '../components/NewCustomerDialog';
import { connect } from 'react-redux';
import SelectAutoComplete from '../components/SelectAutoComplete';
import MaterialStepper from '../components/MaterialStepper';
import {StepperData, ShipmentType, PaymentType} from '../data/Config';
import {StyledButton} from '../components/Components';
import Success from '../data/success.png'

export class SaleOrderSuccess extends Component {

  render() {
      const {customer, SaleOrder, MainSaleOrder} = this.props
    return (
      <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%' , overflow:'scroll'}}>
        <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white' }}>
          Trạng thái đơn hàng
        </div>
        <MaterialStepper
          data = {StepperData}
          activeStep = {3}
        />
        <div style = {{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 50}}>
            <img src = {Success}/>
            {this.props.role == 'admin' || this.props.role == 'manager' ? 
                <div style = {{margin:30}}>
                    <div style = {{width:'100%', textAlign:'center', fontWeight: 'bold'}}>Đơn hàng đã được tạo thành công</div>
                    <div style = {{width:'100%', textAlign:'center'}}>Kiểm tra và xác nhận ...</div>
                </div> : 
                <div style = {{margin:30}}>
                    <div style = {{width:'100%', textAlign:'center', fontWeight: 'bold'}}>Đơn hàng đã được tạo thành công</div>
                    <div style = {{width:'100%', textAlign:'center'}}>Đang chờ xác nhận ...</div>
                </div> 
            }
        </div>     
        <div style = {{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <StyledButton style = {{marginRight:20, width: 240}} onClick = {this.props.goToSaleOrders}>Danh sách đơn bán hàng</StyledButton>
            <StyledButton style = {{marginLeft:20, width: 240}} onClick = {this.props.goToProducts}>Danh sách sản phẩm</StyledButton>
        </div> 
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    token: state.LoginReducer.token,
    customer: state.CustomerReducer.customer,
    SaleOrder: state.ProductReducer.SaleOrder,
    MainSaleOrder: state.ProductReducer.MainSaleOrder
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    goToSaleOrders: () => {
      dispatch({type: 'SCREEN_ROUTER', payload:'/saleorders'})
    },
    goToProducts: () => {
      dispatch({type: 'SCREEN_ROUTER', payload:'/'})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(SaleOrderSuccess);
