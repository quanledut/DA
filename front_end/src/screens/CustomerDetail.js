import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid} from '@material-ui/core'

export class CustomerDetail extends Component {
    componentWillMount(){
        console.log('Location: '+ window.location.href.split('/')[4]);
        this.props.getCustomerDetail(this.props.token, window.location.href.split('/')[4]);
    }
  render() {
      const {customer} = this.props;
    return (
      <div style = {{display: 'flex', flexDirection : 'column', padding:20, margin: 5, border: '1px solid green', borderRadius:5}}>
        <div style = {{fontWeight: 'bold', fontSize: '2rem'}}>CHI TIẾT KHÁCH HÀNG</div>
    {/* <div style = {{ fontSize: '2rem'}}>Thông tin khách hàng</div> */}
        <div style = {{display:'flex', flexDirection: 'row', border: '1px solid gray', borderRadius: 3}}>
            <Grid container xs = {4} style = {{display: 'flex', flexDirection: 'column'}}>
            <img src={`data:image/png;base64,${customer.avatar}`}  style = {{width:350, height: 350}}/>
            </Grid>
            <Grid container xs = {8} style = {{display: 'flex', flexDirection: 'column', marginTop: 15, fontSize: '0.8rem'}}>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30 }}>
                    <Grid item xs = {3}>Họ tên:</Grid>
                    <Grid item xs = {9}>{customer.name}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Số điện thoại</Grid>
                    <Grid item xs = {9}>{customer.phone_number}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Ngày sinh</Grid>
                    <Grid item xs = {9}>{customer.birthday}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Địa chỉ email</Grid>
                    <Grid item xs = {9}>{customer.email}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Giới tính</Grid>
                    <Grid item xs = {9}>{customer.gender == 'male' ? 'Nam' : customer.gender == 'female' ? 'Nữ' : 'Không xác định'}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {3}>Địa chỉ</Grid>
                    <Grid item xs = {9}>{customer.address}</Grid>
                </Grid>
            </Grid>
        </div>
        <div style = {{fontWeight: 'bold', fontSize: '1.2rem'}}>ĐƠN HÀNG ĐÃ THỰC HIỆN</div>
      </div>
    )
  }
}


const mapState2Props = (state) => {
    return {
      token: state.LoginReducer.token,
      customer: state.CustomerReducer.customer_detail
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        getCustomerDetail: (token, id) => {
            dispatch({type: 'GET_CUSTOMER_DETAIL', token: token, payload: id})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(CustomerDetail);