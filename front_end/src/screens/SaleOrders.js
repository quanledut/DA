import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialStepper from '../components/MaterialStepper';
import { SaleOrderStatus, ShipmentType, PaymentType } from '../data/Config';
import Pagination from 'material-ui-flat-pagination';
import {numberOfSaleOrderPerPage} from '../config';
import { ToggleCheckBoxOutlineBlank } from 'material-ui/svg-icons';
import employee from '../data/employee.png'
import customer_avatar from '../data/customer_avatar.png';
import {GreenButton, BlueButton, GrayButton} from '../components/Components';
import moment from 'moment';

export class SaleOrderInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            search_text: '',
            status: '',
            page: 1
        }
    }

    componentDidMount() {
        this.props.loadSaleOrderList(this.props.token, {page: 1, limit: numberOfSaleOrderPerPage, search_text: '', status: 'all'});
    }

    onChangeText = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.props.loadSaleOrderList(this.props.token , { status: this.state.status, search_text: this.state.search_text ,page: this.state.page, limit: numberOfSaleOrderPerPage})
        })
    }

    changePageOfSaleOrder = (number) => {
        this.setState({page: number}, () => {
            this.props.loadSaleOrderList(this.props.token , { status: this.state.status, search_text: this.state.search_text, page: this.state.page, limit: numberOfSaleOrderPerPage })
        })
    }

    render() {
        return (
            <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%' }}>
                <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white', width : '100%' }}>
                    DANH SÁCH ĐƠN HÀNG
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' , width: '100%',padding: 20}}>
                    <div style = {{flexGrow: 1, paddingRight:20}}>
                        <input type='text' onChange={this.onChangeText} style = {{width: '100%', paddingLeft: 10}} name = 'search_text' placeholder = 'Tìm theo mã hóa đơn, tên khách hàng'/>
                    </div>
                    <select name='status' value={this.state.status} onChange={this.onChangeText} style = {{width:220}}>
                        {SaleOrderStatus.map(item => (
                            <option value={item.value}>{item.caption}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div>
						{this.props.SaleOrders.map(saleOrder => (
                            <Grid item style = {{display: 'flex', flexDirection: 'row', border: '1px solid green', borderRadius: 3, padding:5, margin:10}}>   
                                <Grid item xs = {1} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <a href="javascript:;" onClick = {() => {this.props.showSaleOrderInfo(this.props.token, saleOrder._id)}}>{saleOrder.no}</a> </Grid>
                                <Grid item xs = {2} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}> {moment(saleOrder.createdAt).format('DD/MM/YYYY')} </Grid>
                                <Grid item xs = {3} style = {{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}><img src = {customer_avatar} alt = '' style = {{width:45, marginRight:10}}/> 
                                    <a href = 'javascript:;' onClick = {() => {this.props.showCustomer(this.props.token, saleOrder.customer_id._id)}}>{saleOrder.customer_id.name}</a> 
                                </Grid>
                                <Grid item xs = {3} style = {{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}><img src = {employee} alt = '' style = {{width:45, marginRight:10}}/> <a href = 'javascript:;' >
                                    {saleOrder.seller_id.user_detail_id && saleOrder.seller_id.user_detail_id.name ? saleOrder.seller_id.user_detail_id.name : saleOrder.seller_id.email}</a> </Grid>
                                <Grid item xs = {2} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}> {{
                                    'New':
                                        <GreenButton>Chưa duyệt</GreenButton>,
                                    'Confirmed':
                                        <BlueButton>Đã duyệt</BlueButton>,
                                    'Done': 
                                        <GrayButton>Xong</GrayButton>
                                    }[saleOrder.status]}
                                </Grid>
                                <Grid item xs = {1} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', color:'red'}}> {saleOrder.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </Grid>
							</Grid>
						))}
                    </div>
                    <div style = {{display: 'flex', flexDirection:'row', paddingRight:150}}>
                        <div style = {{width: 150, fontStyle: 'italic', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Đơn hàng {(this.state.page - 1)*numberOfSaleOrderPerPage + 1} - {(this.state.page)*numberOfSaleOrderPerPage < this.props.SaleOrderCount ? (this.state.page)*numberOfSaleOrderPerPage : this.props.SaleOrderCount} của {this.props.SaleOrderCount} </div>  
                        <div style = {{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Pagination   
                                limit={numberOfSaleOrderPerPage}
                                offset={numberOfSaleOrderPerPage * this.state.page - 1}
                                total={this.props.SaleOrderCount}
                                onClick={(e, offset, number) => this.changePageOfSaleOrder(number)}
                                otherPageColor='inherit'
                            />  
                        </div>    
                    </div>
                    
                </div>
            </div>
    )}
}

const mapState2Props = (state) => {
    return {
        token: state.LoginReducer.token,
        SaleOrderCount: state.SaleOrderReducer.SaleOrderCount,
        SaleOrders: state.SaleOrderReducer.SaleOrders,
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        loadSaleOrderList: (token, data) => {
            dispatch({ type: 'LOAD_SALE_ORDER_LIST', payload: data, token: token})
        },
        showSaleOrderInfo: (token, id) => {
            dispatch({ type: 'LOAD_SALE_ORDER_DETAIL', payload: id, token: token})
        },
        showCustomer: (token, id) => {
            dispatch({ type: 'GET_CUSTOMER_DETAIL', payload: id, token: token})
        },
        showUser: (token, id) => {
            dispatch({ type: 'SHOW_USER_INFO', payload: id, token: token})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(SaleOrderInfo);
