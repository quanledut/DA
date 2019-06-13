import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialStepper from '../components/MaterialStepper';
import { EmployeeRole} from '../data/Config';
import {Roles} from '../data/Role'
import Pagination from 'material-ui-flat-pagination';
import {numberOfEmployeePerPage} from '../config';
import employee from '../data/employee.png'
import customer_avatar from '../data/customer_avatar.png';
import {GreenButton, BlueButton, GrayButton, RedButton} from '../components/Components'
import add_icon from '../data/add_icon.svg';
import SignUpDialog from '../components/SignUpDialog'

export class Employees extends Component {
    constructor(props){
        super(props);
        this.state = {
            search_text: '',
            role: '',
            page: 1
        }
    }

    componentDidMount() {
        this.props.loadEmployeeList(this.props.token, {page: 1, limit: numberOfEmployeePerPage, search_text: '', role: ''});
    }

    onChangeText = (event) => {
        this.setState({ [event.target.name]: event.target.value, page:1 }, () => {
            this.props.loadEmployeeList(this.props.token , { role: this.state.role, search_text: this.state.search_text ,page: this.state.page, limit: numberOfEmployeePerPage})
        })
    }

    changePageOfEmployee = (number) => {
        this.setState({page: number}, () => {
            this.props.loadSaleOrderList(this.props.token , { status: this.state.status, search_text: this.state.search_text, page: this.state.page, limit: numberOfEmployeePerPage })
        })
    }

    render() {
        return (
            <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%', overflow: 'scroll' }}>
                <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white', width : '100%' ,display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style = {{flexGrow: 1}}>DANH SÁCH NHÂN VIÊN</div>
                    {this.props.role == 'admin' || this.props.role == 'manager' ? <div style = {{display: 'flex', alignItems:'center', marginRight:20}}><img src = {add_icon} style = {{width:20, height:20}} onClick = {this.props.openSignUpDialog}/></div> : <div></div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' , width: '100%',padding: 20}}>
                    <div style = {{flexGrow: 1, paddingRight:20}}>
                        <input type='text' onChange={this.onChangeText} style = {{width: '100%', paddingLeft: 10}} name = 'search_text' placeholder = 'Tìm theo tên, email, số điện thoại'/>
                    </div>
                    <select name='role' value={this.state.status} onChange={this.onChangeText} style = {{paddingLeft: 15,width:220}}>
                        {Roles.map(item => (
                            <option value={item.name}>{item.caption}</option>
                        ))}
                    </select>

                </div>
                <div>
                    <div>
						{this.props.employees.map(employee => (
                            <Grid item style = {{display: 'flex', flexDirection: 'row', border: '1px solid green', borderRadius: 3, margin:10}}>   
                                <Grid item xs = {1} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                                  <div style = {{width: 60, height:60, display: 'flex'}}>
                                    <img src={`data:image/png;base64,${employee.avatar}`} style = {{width: 60, height:60}}/>
                                  </div>               
                                </Grid>
                                <Grid item xs = {2} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}> 
                                  <a href = 'javascript:;' onClick = {() => {this.props.showEmployeeDetail(this.props.token,employee._id)}}>{employee.user_detail_id && employee.user_detail_id.name ? employee.user_detail_id.name : 'Chưa cập nhật'} </a>
                                </Grid>
                                <Grid item xs = {3} style = {{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}><img src = '' alt = '' style = {{width:45, marginRight:10}}/> 
                                    <a href = 'javascript:;' onClick = {() => {this.props.showEmployeeDetail(this.props.token,employee._id)}}>{employee.email}</a>
                                </Grid>
                                <Grid item xs = {3} style = {{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}><img src = '' alt = '' style = {{width:45, marginRight:10}}/>
                                   {employee.user_detail_id && employee.user_detail_id.phone_number ? employee.user_detail_id.phone_number : 'Chưa cập nhật'}
                                </Grid>
                                <Grid item xs = {2} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}> {{
                                    'seller':
                                        <GreenButton disabled style = {{width:220, color: 'white'}}>Nhân viên bán hàng</GreenButton>,
                                    'manager':
                                        <BlueButton disabled style = {{width:220, color: 'white'}}>Quản lý</BlueButton>,
                                    'admin': 
                                        <RedButton disabled style = {{width:220, color: 'white'}}>Quản lý</RedButton>
                                        //<RedButton disabled style = {{width:220, color: 'white'}}>Quản lý cấp cao</RedButton>
                                    }[employee.role]}
                                </Grid>
                                <Grid item xs = {1} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', color:'red'}}>{employee.user_detail_id && employee.user_detail_id.birthday ? employee.user_detail_id.birthday.split('-')[0] : 'YYYY'} </Grid>
							</Grid>
						))}
                    </div>
                    <div style = {{display: 'flex', flexDirection:'row', paddingRight:150}}>
                        <div style = {{width: 150, fontStyle: 'italic', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Nhân viên {(this.state.page - 1)*numberOfEmployeePerPage + 1} - {(this.state.page)*numberOfEmployeePerPage < this.props.employee_count ? (this.state.page)*numberOfEmployeePerPage : this.props.employee_count} của {this.props.employee_count} </div>  
                        <div style = {{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Pagination   
                                limit={numberOfEmployeePerPage}
                                offset={numberOfEmployeePerPage * this.state.page - 1}
                                total={this.props.employee_count}
                                onClick={(e, offset, number) => this.changePageOfEmployee(number)}
                                otherPageColor='inherit'
                            />  
                        </div>    
                    </div>
                    
                </div>
              <SignUpDialog/>
            </div>
    )}
}

const mapState2Props = (state) => {
    return {
        token: state.LoginReducer.token,
        employees: state.EmployeeReducer.employees,
        employee_count: state.EmployeeReducer.employee_count,
        role: state.LoginReducer.role
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        loadEmployeeList: (token, data) => {
            dispatch({ type: 'LOAD_EMPLOYEE_LIST', payload: data, token: token})
        },
        openSignUpDialog: () => {
          dispatch({type:'SHOW_SIGNUP_DIALOG'})
        },
        showEmployeeDetail: (token, payload) => {
            dispatch({type: 'SHOW_EMPLOYEE_DETAIL', token, payload})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(Employees);
