import React, { Component } from 'react';
import {connect} from 'react-redux';
import {GreenButton} from '../components/Components'
import customer_avatar from '../data/customer_avatar.png'
import {BarChart} from '../components/Chart';
import {BackgroundColor} from '../data/Config'

export class EmployeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phone_number: '',
            birthday: '',
            gender: '',
            avatar: '',
            chartTitle: 'BÁO CÁO DOANH SỐ NĂM ' + (new Date()).getFullYear() + ' NHÂN VIÊN ' + (props.user.user_detail_id ? props.user.user_detail_id.name.toUpperCase() : '')
        }
    }

    onChangeText = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    getChartData = () => {
        let monthArr = [...Array(new Date().getMonth() + 1).keys()]
        let data = monthArr.map(month => {
            let monthValue = this.props.chart_arr_value.filter(item => (new Date(item.createdAt)).getMonth() == month)
                                        .reduce((total, item) => {return total + parseFloat(item.total_amount)},0)
            return monthValue
        })
        let chartData = {
            labels:monthArr.map(item => {return item + 1 >= 10 ? `Tháng ${item + 1}` : `Tháng 0${item + 1}`}),
            datasets:[
                {
                    label: 'Doanh thu',
                    data,
                    backgroundColor:BackgroundColor.slice(0,(new Date()).getMonth() + 2)
                }
            ]
        }
        return chartData
    }

    componentWillReceiveProps(nextProps){
        const {name, address, phone_number, birthday, gender} = nextProps.user_detail || {}
        this.setState({
            name: name,
            address: address,
            phone_number: phone_number,
            birthday: birthday,
            gender: gender,
            avatar: nextProps.avatar
        })
    }

    componentDidMount(){
        const {name, address, phone_number, birthday, gender} = this.props.user_detail || {}
        this.setState({
            name: name,
            address: address,
            phone_number: phone_number,
            birthday: birthday,
            gender: gender
        })
    }

    updateUserDetail = () => {
        let {name, phone_number, address, gender, birthday} = this.state;
        this.props.updateUserDetail(this.props.token,{name, phone_number, address, gender, birthday});
        if(this.state.avatar != this.props.avatar){
            this.updateUserAvatar();
        }
    }

    updateUserAvatar = () => {
        let data = new FormData();
        data.append('file', this.state.avatar);
        this.props.updateUserAvatar(this.props.token,data);
    }

    changeAvatar = (event) => {
        this.setState({avatar: event.target.files[0]})
    }

  render() {
    return (
        <div style = {{padding: 15, width: '100%'}}>
            <div style = {{display: 'flex', flexDirection: 'row'}}>
                <div style = {{display: 'flex', border:'1px solid green',flexDirection: 'column', justifyContent: 'flex-start', flex: 3, borderRadius: 3}}>
                    <div style = {{height: 30, textAlign: 'left', paddingLeft: 15,display: 'flex', alignItems:'center', backgroundColor: '#009688', fontWeight: 'bold', color: 'white'}}>
                        ẢNH ĐẠI DIỆN
                    </div> 
                    <div>
                        <img src = {this.props.user && this.props.user.avatar ? `data:image/png;base64,${this.props.user.avatar}` : {customer_avatar}} style = {{height:400, width:400, overflow: 'hidden'}}/>
                    </div>
                </div>
                <div style = {{display: 'flex', border:'1px solid green', justifyContent: 'center',flexDirection: 'column', justifyContent: 'flex-start', flex: 7,marginLeft: 20, borderRadius: 3}}>
                    <div style = {{height: 30, textAlign: 'left', paddingLeft: 15,display: 'flex', alignItems:'center', backgroundColor: '#009688',  fontWeight: 'bold', color: 'white'}}>
                        THÔNG TIN CÁ NHÂN
                    </div> 
                    <div style = {{display: 'flex', padding: 15}}>
                        <div style = {{flex: 1}}>
                            <div style = {{display: 'flex', flexDirection: 'column'}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem'}}>Email:</div>
                                <div style = {{fontWeight:'bold',color: '#616161'}}>{this.props.user.email}</div>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem'}}>Họ tên:</div>
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.user_detail_id ? this.props.user.user_detail_id.name : 'Chưa cập nhật'}</div>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem'}}>Số điện thoại:</div>
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.user_detail_id ? this.props.user.user_detail_id.phone_number : 'Chưa cập nhật'}</div>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem'}}>Địa chỉ:</div>
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.user_detail_id ? this.props.user.user_detail_id.address : 'Chưa cập nhật'}</div>
                            </div>
                        </div>
                        <div style = {{flex: 1, marginLeft: 40}}>
                            <div style = {{display: 'flex', flexDirection: 'column'}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem', }}>Chức vụ:</div>
                                {/* <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.role == 'admin' ? 'Quản lý cấp cao' : this.props.user.role == 'manager' ? 'Quản lý' : 'Nhân viên'}</div> */}
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.role == 'admin' ? 'Quản lý' : this.props.user.role == 'manager' ? 'Quản lý' : 'Nhân viên'}</div>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem', }}>Giới tính:</div>
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{!this.props.user.user_detail_id ? 'Chưa cập nhật' : this.props.user.user_detail_id.gender == 'male' ? 'Nam' : this.props.user.user_detail_id.gender == 'female' ? 'Nữ' : 'Không xác định'}</div>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem', }}>Ngày sinh:</div>
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.user_detail_id ? this.props.user.user_detail_id.birthday.split('T')[0].replace(/-/g,'/') : 'Chưa cập nhật'}</div>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontStyle: 'italic', fontSize: '0.8rem', }}>Ngày tham gia:</div>
                                <div style = {{fontWeight:'bold', color: '#616161'}}>{this.props.user.createdAt.split('T')[0].replace(/-/g,'/')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style = {{margin: 15, marginBottom: 0,fontWeight: 'bold'}}>CÁC ĐƠN HÀNG GẦN ĐÂY</div>
                <div style = {{display: 'flex', flexDirection: 'column'}}>
                    {this.props.top_5_sale_orders.map(saleOrder => (
                        <div style = {{border:'1px solid green', marginTop:10, padding:5, borderRadius:3, display: 'flex', flexDirection: 'column'}}>
                            <a href = 'javascript:;' onClick = {() => {this.props.showSaleOrder(this.props.token, saleOrder._id)}}  style = {{fontWeight:'bold'}}>{saleOrder.no}</a>
                            <div>Ngày: {saleOrder.createdAt.split('T')[0].replace(/-/g,'/')}</div>
                            <div style = {{color:'green'}}>{saleOrder.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnđ</div>
                        </div>
                    ))}                    
                </div>
            </div>
            <div>
                <BarChart
                    data = {this.getChartData()}
                    displayLegend = {false}
                    title = {this.state.chartTitle}
                />
                </div>
        </div>
    )
  }
}

const mapState2Props = (state) => {
    return {
        user: state.EmployeeReducer.employee.user,
        top_5_sale_orders: state.EmployeeReducer.employee.top_5_sale_orders,
        token: state.LoginReducer.token,
        chart_arr_value: state.EmployeeReducer.employee.sale_reports
    }
}

const mapDispatch2Props = (dispatch) => {
    return{
        showSaleOrder: (token, id) => {
            dispatch({type:'LOAD_SALE_ORDER_DETAIL', token, payload:id})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(EmployeeDetail)
