import React, { Component } from 'react';
import {connect} from 'react-redux';
import {GreenButton} from '../components/Components'

export class SelfInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phone_number: '',
            birthday: '',
            gender: '',
            avatar: ''
        }
    }

    onChangeText = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        const {name, address, phone_number, birthday, gender} = nextProps.user_detail
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
        const {name, address, phone_number, birthday, gender} = this.props.user_detail
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
                        Hình đại diện
                    </div> 
                    <div>
                        <input type = 'file' accept = '*.jpg/*.png' id = 'avatar' style = {{display: 'none'}} onChange = {this.changeAvatar}/>
                        <label htmlFor = 'avatar'>
                            <img src = {this.state.avatar && this.state.avatar != '' && this.state.avatar != this.props.avatar ? URL.createObjectURL(this.state.avatar) : `data:image/png;base64,${this.props.avatar}`} style = {{height:400, width:400, overflow: 'hidden'}}/>
                        </label>
                    </div>
                </div>
                <div style = {{display: 'flex', border:'1px solid green', justifyContent: 'center',flexDirection: 'column', justifyContent: 'flex-start', flex: 7,marginLeft: 20, borderRadius: 3}}>
                    <div style = {{height: 30, textAlign: 'left', paddingLeft: 15,display: 'flex', alignItems:'center', backgroundColor: '#009688',  fontWeight: 'bold', color: 'white'}}>
                        THÔNG TIN CÁ NHÂN
                    </div> 
                    <div style = {{display: 'flex', padding: 15}}>
                        <div style = {{flex: 1}}>
                            <div style = {{display: 'flex', flexDirection: 'column'}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem'}}>Email</div>
                                <input type = 'text' disabled style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, backgroundColor:'white'}} value = {this.props.email}/>                     
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem'}}>Họ tên</div>
                                <input type = 'text' onChange = {this.onChangeText} name = 'name' value = {this.state.name} style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, backgroundColor:'white'}} />                     
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem'}}>Số điện thoại</div>
                                <input type = 'number' onChange = {this.onChangeText} name = 'phone_number' value = {this.state.phone_number} style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, backgroundColor:'white'}} />                     
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem'}}>Địa chỉ</div>
                                <input type = 'text' onChange = {this.onChangeText} name = 'address' value = {this.state.address} style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, backgroundColor:'white'}}/>                     
                            </div>
                        </div>
                        <div style = {{flex: 1, marginLeft: 40}}>
                            <div style = {{display: 'flex', flexDirection: 'column'}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem', }}>Chức vụ</div>
                                <input type = 'text' disabled style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, paddingBottom:-5, backgroundColor: 'white'}} value = {this.props.role == 'admin' || this.props.role == 'manager' ? 'Quản lý' : 'Nhân viên kinh doanh'}/>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem', }}>Giới tính</div>
                                <select name = 'gender' style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, paddingBottom:-5, backgroundColor: 'white'}} value = {this.state.gender} onChange = {this.onChangeText}>
                                    <option value = 'male'>Nam</option>
                                    <option value = 'female'>Nữ</option>
                                    <option value = 'undefined'>Không xác định</option>
                                </select>
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                                <div style = {{fontWeight:'bold', fontSize: '0.8rem', }}>Ngày sinh</div>
                                <input type = 'date' name = 'birthday' style = {{border: '0px',borderBottom: '1px solid #c4c2c2', paddingLeft:15, paddingBottom:-5, backgroundColor: 'white'}} value = {this.state.birthday ? this.state.birthday.split('T')[0] : ''} onChange = {this.onChangeText}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style = {{width:'100%', display: 'flex', justifyContent: 'flex-end', marginTop: 20, paddingRight: 50}}>
                <GreenButton onClick = {this.updateUserDetail}>Cập nhật</GreenButton>
            </div>
        </div>
    )
  }
}

const mapState2Props = (state) => {
    return {
        user_detail: state.LoginReducer.user_detail,
        email: state.LoginReducer.email,
        role: state.LoginReducer.role,
        avatar: state.LoginReducer.avatar,
        token: state.LoginReducer.token
    }
}

const mapDispatch2Props = (dispatch) => {
    return{
        updateUserDetail:(token, data) => {
            dispatch({type: 'UPDATE_USER_DETAIL',token: token,payload:data})
        },
        updateUserAvatar: (token, data) => {
            dispatch({type: 'UPDATE_USER_AVATAR',token: token, payload: data})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(SelfInfo)
