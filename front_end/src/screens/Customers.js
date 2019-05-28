import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialStepper from '../components/MaterialStepper';
import { SaleOrderStatus, ShipmentType, PaymentType } from '../data/Config';
import Pagination from 'material-ui-flat-pagination';
import {numberOfCustomerPerPage} from '../config';
import employee from '../data/employee.png'
import customer_avatar from '../data/customer_avatar.png';
import {GreenButton, BlueButton, GrayButton} from '../components/Components';
import NewCustomerDialog from '../components/NewCustomerDialog'

export class SaleOrderInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            search_text: '',
            page: 1,
            openNewCustomerDialog: false
        }
    }

    componentWillMount() {
        this.props.loadCustomerList(this.props.token, {page: 1, limit: numberOfCustomerPerPage, search_text: ''});
    }

    onChangeText = (event) => {
        this.setState({ [event.target.name]: event.target.value, page: 1 }, () => {
            this.props.loadCustomerList(this.props.token , {search_text: this.state.search_text ,page: this.state.page, limit: numberOfCustomerPerPage})
        })
    }

    changePageOfCustomer = (number) => {
        this.setState({page: number}, () => {
            this.props.loadCustomerList(this.props.token , { search_text: this.state.search_text, page: this.state.page, limit: numberOfCustomerPerPage })
        })
    }

    render() {
        const {token, role} = this.props;
        return (
            <div style = {{height:window.innerHeight * 0.92}}>
            <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, display: 'flex', flexDirection: 'column'}}>
                <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white', width : '100%' , flex:1}}>
                    DANH SÁCH KHÁCH HÀNG
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' , width: '100%',padding: 10, flex:2}}>
                    <div style = {{flexGrow: 1, paddingRight:20}}>
                        <input type='text' onChange={this.onChangeText} style = {{width: '100%', paddingLeft: 10}} name = 'search_text' placeholder = 'Tìm theo tên khách hàng, số điện thoại, email'/>
                    </div>
                    {role && role != null ?  <GreenButton onClick = {() => {this.setState({openNewCustomerDialog:true})}} >Khách hàng mới</GreenButton> :<div/>}
                </div>
                <div style = {{display:'flex', flexDirection: 'column', flex:5}}>
                    <div>
						{this.props.customer_list.map(customer => (
                            <Grid item style = {{display: 'flex', flexDirection: 'row', border: '1px solid green', borderRadius: 3, padding:5, margin:10}}>   
                              <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <img src = {`data:image/png;base64,${customer.avatar}`} style = {{width: 100, height: 100}}/>
                                <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 15}}>
                                    <a href = 'javascript:;' onClick = {() => {this.props.showCustomer(token, customer._id)}} style = {{fontWeight: 'bold'}}> {customer.name}</a>
                                    <div>{customer.phone_number}</div>
                                    <div>{customer.address}</div>
                                </div>
                              </div>
							</Grid>
						))}
                    </div>
                    <div style = {{display: 'flex', flexDirection:'row', paddingRight:150}}>
                        <div style = {{width: 150, fontStyle: 'italic', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Khách hàng {(this.state.page - 1)* numberOfCustomerPerPage  + 1} - {(this.state.page)* numberOfCustomerPerPage < this.props.customer_count ? (this.state.page)* numberOfCustomerPerPage : this.props.customer_count} của {this.props.customer_count} </div>  
                        <div style = {{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Pagination   
                                limit={numberOfCustomerPerPage}
                                offset={numberOfCustomerPerPage * this.state.page - 1}
                                total={this.props.customer_count}
                                onClick={(e, offset, number) => this.changePageOfCustomer(number)}
                                otherPageColor='inherit'
                            />  
                        </div>    
                    </div>
                </div>


            </div>
            <NewCustomerDialog
                open = {this.state.openNewCustomerDialog}
                createNewCustomer = {this.props.createNewCustomer}
                closeDialog = {() => {this.setState({openNewCustomerDialog: false})}}
                token = {this.props.token}
            />
        </div>
    )}
}

const mapState2Props = (state) => {
    return {
        token: state.LoginReducer.token,
        customer_count: state.CustomerReducer.customer_count,
        customer_list: state.CustomerReducer.customer_list,
        role: state.LoginReducer.role
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        loadCustomerList: (token, data) => {
            dispatch({ type: 'LOAD_CUSTOMER_LIST', payload: data, token: token})
        },
        showSaleOrderInfo: (token, id) => {
            dispatch({ type: 'SHOW_SALE_ORDER_DETAIL', payload: id, token: token})
        },
        showCustomer: (token, id) => {
            dispatch({ type: 'GET_CUSTOMER_DETAIL', payload: id, token: token})
        },
        showUser: (token, id) => {
            dispatch({ type: 'SHOW_USER_INFO', payload: id, token: token})
        },
        createNewCustomer: (data, token) => {
            dispatch({ type: 'CREATE_NEW_CUSTOMER', payload: data, token: token })
        },
    }
}

export default connect(mapState2Props, mapDispatch2Props)(SaleOrderInfo);
