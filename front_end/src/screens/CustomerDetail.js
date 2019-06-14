import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid} from '@material-ui/core';
import Loading from '../components/Loading';
import moment from 'moment'

export class CustomerDetail extends Component {
    componentWillMount(){
        this.props.getCustomerDetail(this.props.token, window.location.href.split('/')[4]);
    }
  render() {
    const {customer} = this.props;
    return (
      <div style = {{display: 'flex', flexDirection : 'column', padding:20, margin: 5, border: '1px solid green', borderRadius:5}}>
        <div style = {{fontWeight: 'bold', fontSize: '2rem'}}>CHI TIẾT KHÁCH HÀNG</div>
    {/* <div style = {{ fontSize: '2rem'}}>Thông tin khách hàng</div> */}
        {!customer ? <Loading title = 'Đang lấy thông tin khách hàng'/> :
            <div style = {{display:'flex', flexDirection: 'row', border: '1px solid gray', borderRadius: 3}}>
            <Grid container xs = {5} style = {{display: 'flex', flexDirection: 'column'}}>
            <img src={`data:image/png;base64,${customer.avatar}`}  style = {{width:350, height: 350}}/>
            </Grid>
            <Grid container xs = {7} style = {{display: 'flex', flexDirection: 'column', marginTop: 15, fontSize: '1.2rem', lineHeight:1.3}}>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30 }}>
                    <Grid item xs = {3}>Họ tên:</Grid>
                    <Grid item xs = {5}>{customer.name}</Grid>
                    <Grid item xs = {4}><a href = 'javascript:;' style = {{fontStyle:'italic', fontSize:'1rem'}}>Chỉnh sửa thông tin khách hàng</a></Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Số điện thoại:</Grid>
                    <Grid item xs = {9}>{customer.phone_number}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Ngày sinh:</Grid>
                    <Grid item xs = {9}>{moment(customer.birthday).format('DD/MM/YYYY')}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Địa chỉ email:</Grid>
                    <Grid item xs = {9}>{customer.email}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row', height: 30}}>
                    <Grid item xs = {3}>Giới tính:</Grid>
                    <Grid item xs = {9}>{customer.gender == 'male' ? 'Nam' : customer.gender == 'female' ? 'Nữ' : 'Không xác định'}</Grid>
                </Grid>
                <Grid item cs = {12} style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {3}>Địa chỉ:</Grid>
                    <Grid item xs = {9}>{customer.address}</Grid>
                </Grid>
            </Grid>
        </div>
    }
    
        <div style = {{fontWeight: 'bold', fontSize: '1.2rem', marginTop: 15}}>ĐƠN HÀNG ĐÃ THỰC HIỆN ({this.props.customer && customer.sale_orders ? this.props.customer.sale_orders.length : '0'})</div>
            {!customer || !customer.sale_orders ? <div/> :
            <div style = {{ marginTop: 15}}>
            
                {this.props.customer.sale_orders.map(item => (
                    <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', border:'1px solid green', borderRadius:3, padding: 10, fontSize:'0.8rem'}}>
                        <a href = 'javascript:;' style = {{fontWeight: 'bold', fontSize: '0.8rem',color:'blue'}} onClick = {() => {this.props.showSaleOrderInfo(this.props.token, item._id)}}>{item.no}</a>
                        <div>Ngày mua: {item.createdAt.replace('T',' ')}</div>
                        <div>Tổng hóa đơn: {item.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VNĐ</div>
                    </div>
                ))}
            </div> 
        }
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
        },
        showSaleOrderInfo: (token, id) => {
            dispatch({ type: 'LOAD_SALE_ORDER_DETAIL', payload: id, token: token})
        },
    }
}

export default connect(mapState2Props, mapDispatch2Props)(CustomerDetail);