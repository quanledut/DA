import React, { Component } from 'react'
import {connect} from 'react-redux';
import {LineChart} from '../components/Chart'
import {Ranks, BackgroundColor} from '../data/Config'
import {Grid} from '@material-ui/core'
import chart_icon from '../data/chart_icon.png'

export class Report extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'DOANH THU ' + ((new Date()).getMonth()+1) + ' THÁNG ĐẦU NĂM ' + (new Date()).getFullYear()
        }
    }

    getChartData = () => {
        let currentMonth = (new Date()).getMonth() + 1;
        return {
            labels: [...(new Array(currentMonth)).keys()].map(item => {
                return item + 1 >= 10 ? `Tháng ${item + 1}` : `Tháng 0${item + 1}`
            }),
            datasets:[
            {
                label: 'Doanh số',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data:this.props.sale_report.map(item => {return item.total_amount}),
                // backgroundColor:BackgroundColor.slice(0,currentMonth + 1)
            }
            ]
        }
    }


    componentWillMount(){
        this.props.getSaleReport(this.props.token)
        this.props.getTopEmployee(this.props.token)
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('NextProps: '+ nextProps)
    //     if(nextProps.token){
    //         this.props.getSaleReport(nextProps.token)
    //         this.props.getTopEmployee(nextProps.token)
    //     }
    // }

    render() {
        return (
            <div style = {{backgroundColor:'rgba(159, 161, 165,0.4)', paddingBottom:10}}>
                <div style = {{display:'flex', flexDirection: 'row', flexDirection:'space-between'}}>
                    <Grid item xs = {4} style = {{backgroundColor:'white',  margin:15, borderRadius: 5, paddingTop: 5}}>
                        <div style = {{marginLeft:20, fontWeight:'bold'}}>
                            TỔNG SỐ SẢN PHẨM
                        </div>
                        <div style = {{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src = {chart_icon} style = {{width:50, height:50, marginLeft:15}}/>
                            <div style = {{marginRight:20}}>20 sản phẩm</div>
                        </div>
                    </Grid>
                    <Grid item xs = {4} style = {{backgroundColor:'white',  margin:15, borderRadius: 5, paddingTop: 5}}>
                        <div style = {{marginLeft:20, fontWeight:'bold'}}>
                            TỔNG SỐ KHÁCH HÀNG
                        </div>
                        <div style = {{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src = {chart_icon} style = {{width:50, height:50, marginLeft:15}}/>
                            <div style = {{marginRight:20}}>20 khách hàng</div>
                        </div>
                    </Grid>
                    <Grid item xs = {4} style = {{backgroundColor:'white',  margin:15, borderRadius: 5, paddingTop: 5}}>
                        <div style = {{marginLeft:20, fontWeight:'bold'}}>
                            TỔNG SỐ NHÂN VIÊN
                        </div>
                        <div style = {{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src = {chart_icon} style = {{width:50, height:50, marginLeft:15}}/>
                            <div style = {{marginRight:20}}>20 nhân viên</div>
                        </div>
                    </Grid>
                </div>
                {this.props.top_5_employee.length > 0 ? 
                    <div style = {{backgroundColor: 'white', borderRadius:5, margin:15}}>
                        <div style = {{width:'100%', textAlign: 'center', fontWeight: 'bold', color:'#0d47a1', fontSize:'1.5rem'}}>TOP NHÂN VIÊN ĐẠT DOANH SỐ CAO NHẤT</div>
                        <div style = {{ margin:15}}>
                            {this.props.top_5_employee.map((employee,index) => (
                                <div>
                                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                                        <div style = {{flex:1, display: 'flex', justifyContent: 'flex-start', alignItems:'center',color:'green', fontWeight:'bold'}}>
                                            #{index + 1}
                                        </div> 
                                        <a onClick = {() => {this.props.showUserDetail(this.props.token,employee.user_id[0]._id)}} href = 'javascript:;' style = {{flex:4, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', alignItems:'center'}}>{employee.user_detail_id[0] ? employee.user_detail_id[0].name : employee.user_id[0].email}</a>
                                        <div style = {{flex:2,  display: 'flex', justifyContent: 'center', alignItems:'center', fontWeight:'bold', color:employee.user_id[0].role == 'admin' ? 'red' : employee.user_id[0].role == 'manager' ? 'blue' : 'green'}}>{employee.user_id[0].role == 'admin' ? 'Vip' : employee.user_id[0].role == 'manager' ? 'Quản lý' : 'Nhân viên bán hàng'}</div>
                                        <div style = {{flex:2, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end', alignItems:'center', color:'green'}}>{employee.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VNĐ</div>
                                    </div>
                                    {index == this.props.top_5_employee.length ? <div/> : <hr style = {{margin:5}}/>}
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div></div>
                }
                <div style = {{margin: 15,marginTop: 30, backgroundColor: 'white', borderRadius:5}}>
                    <div style = {{display:'flex', justifyContent: 'center', alignItems: 'center', fontSize:'1.5rem', fontWeight:'bold', color:'#616161'}}>
                        {this.state.title}
                    </div>
                    <LineChart
                        height={500}
                        options={{ maintainAspectRatio: false }}
                        data = {this.getChartData()}
                        displayTitle = {false}
                        title = {this.state.title}
                    />
                </div>
            </div>
        )
    }
}

const mapState2Props = (state) => {
    return {
        top_5_employee: state.ReportReducer.top_5_employee,
        sale_report: state.ReportReducer.sale_report,
        token: state.LoginReducer.token
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        getSaleReport: (token) => {
            dispatch({type: 'GET_SALE_REPORT', token})
        },
        getTopEmployee: (token) => {
            dispatch({type: 'GET_TOP_EMPLOYEE', token})
        },
        showUserDetail: (token, id) => {
            dispatch({type:'SHOW_EMPLOYEE_DETAIL', token, payload:id})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(Report)
