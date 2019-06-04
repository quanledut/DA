import React, { Component } from 'react';
import { Dialog, IconButton, Grid, GridList, GridListTile } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {StyledButton} from '../components/Components'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class NewCustomerDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: 'male',
      email: '',
      emailErr:false,
      phone_number: '',
      birthday: '',
      address: '',
      file: {},
      filePath: ''
    }
  }

  chooseAvatar = (event) => {
    this.setState({
      file: event.target.files[0],
      filePath: URL.createObjectURL(event.target.files[0])
    })
  }

  onChangeText = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  createCustomer = async () => {
    var data = await new FormData();
    await data.append('name',this.state.name);
    await data.append('gender',this.state.gender);
    await data.append('email',this.state.email);
    await data.append('phone_number',this.state.phone_number);
    await data.append('birthday',this.state.birthday);
    await data.append('address',this.state.address);
    await data.append('file',this.state.file);
    this.props.createNewCustomer(data, this.props.token);
    this.props.closeDialog();
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <div style={{ width: 550, height: 800, fontFamily: 'Helvetica Neue",Helvetica,Arial,sans-serif', color: '#333' }}>
          <div style={{ backgroundColor: '#0d878b', height: 50, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space_between', alignItems: 'center' }}>
            <div style={{ color: 'white', fontSize: '1.2em', paddingLeft: 20, flexGrow: 1 }}>Thêm mới khách hàng</div>
            <div style={{}}><IconButton onClick = {this.props.closeDialog}><CloseIcon /></IconButton></div>
          </div>
          <Grid container style={{ padding: 10, fontSize: '0.8em' }}>
            <Grid item xs={12} style={{ padding: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <input type='file' id='avatar-input' accept='image/*' style={{ display: 'none' }} onChange = {this.chooseAvatar}/>
                <label htmlFor='avatar-input'>
                  <img style = {{height: 200, width:200}} src={ this.state.filePath || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfR8X74rkrhWpxqkeNUjMR71RTB2tLljU_-TlBXdPJ9qhJzcLWPA'} />
                </label>
                <label htmlFor='avatar-input'>
                <div>Chọn ảnh đại diện</div>
                </label>
              </div>
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>Họ tên</Grid>
            <Grid item xs={9} style={{ padding: 10 }}>
              <input value={this.state.name} placeholder='Đinh Trần Anh Khoa' style={ this.state.name != '' ? { border: '1px solid #bdbdbd' , paddingLeft: 5, width: '100%', borderRadius: 1 } : { border: '1px solid red' , paddingLeft: 5, width: '100%', borderRadius: 1 }} name = 'name' onChange = {this.onChangeText} />
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>Giới tính</Grid>
            <Grid item xs={9} style={{ padding: 10 }}>
              <select value={this.state.gender} style={{ border: '1px solid #bdbdbd', paddingLeft: 5, width: '50%', borderRadius: 1 }} onChange = {this.onChangeText} name = 'gender'>
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
                <option value='undefine'>Không xác định</option>
              </select>
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>Email</Grid>
            <Grid item xs={9} style={{ padding: 10 }}>
              <input value={this.state.email} placeholder='your_name@example.com' style={ emailRegex.test(this.state.email) ? { border: '1px solid #bdbdbd', paddingLeft: 5, width: '100%', borderRadius: 1 } : { border: '1px solid red', paddingLeft: 5, width: '100%', borderRadius: 1 }} name = 'email' onChange = {this.onChangeText}/>
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>Số điện thoại</Grid>
            <Grid item xs={9} style={{ padding: 10 }}>
              <input type = 'number' value={this.state.phone_number} placeholder='0120123356' style={this.state.phone_number.length > 8 ? { border: '1px solid #bdbdbd', paddingLeft: 5, width: '100%', borderRadius: 1 } : { border: '1px solid red', paddingLeft: 5, width: '100%', borderRadius: 1 }} name = 'phone_number' onChange = {this.onChangeText}/>
              </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>Ngày sinh </Grid>
            <Grid item xs={9} style={{ padding: 10 }}><input type="date" data-date="" data-date-format="DD MM YYYY" value={this.state.birthday} style={{ border: '1px solid #bdbdbd', paddingLeft: 5, width: '100%', borderRadius: 1 }} name = 'birthday' onChange = {this.onChangeText}/></Grid>
            <Grid item xs={3} style={{ padding: 10 }}>Địa chỉ </Grid>
            <Grid item xs={9} style={{ padding: 10 }}><input type="text" value={this.state.address} name = 'address' style={{ border: '1px solid #bdbdbd', paddingLeft: 5, width: '100%', borderRadius: 1 }} onChange = {this.onChangeText}/></Grid>
            </Grid>
            <div style = {{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
              <StyledButton onClick = {(this.state.name && emailRegex.test(this.state.email) && this.state.phone_number.length > 8) ? this.createCustomer : () => {alert('Vui lòng nhập đầy đủ các trường')}}>Tạo khách hàng</StyledButton></div>
        </div>
      </Dialog>
    )
  }
}

export default NewCustomerDialog
