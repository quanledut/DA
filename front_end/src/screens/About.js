import React, { Component } from 'react'
import FilterLink from '../components/FilterLink'
import { Button } from '@material-ui/core';
import showroom from '../data/images/showroom.jpeg';
import factory from '../data/images/factory.jpg';
import GoogleMap from '../components/GoogleMap'
import {Grid} from '@material-ui/core';
import {Home, PhoneCallback, MailOutline, AccessAlarm} from '@material-ui/icons'
import {ShowroomLocation, FactoryLocation} from '../data/Config'

export class About extends Component {
  render() {
    return (
      <div style = {{width:'100%', height:'100%', margin: 5}}>
          <div style = {{width:'100%', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style = {{fontFamily:'Dancing Script, cursive', fontSize: '3rem', fontWeight:'bold'}}>Nội thất Vinmus</div>
            <div style = {{fontStyle:'italic', fontFamily:'EB Garamond, serif', fontSize:'2rem'}}>-- Sáng tạo, trẻ trung, đa dạng --</div>
          </div>
          <div style = {{display:'flex', flexDirection: 'row', alignItems: 'center', marginTop:30}}>
            <img src = {showroom} style = {{width:'35%', height:'40vh'}}/>
            <div style = {{width:'30%', height:'40vh', display:'flex', flexDirection:'column', fontSize:'0.9rem', padding:10, lineHeight:2, color:'#666666'}}>
              <Grid style = {{fontWeight:'bold', fontSize:'1.5rem'}}>SHOW ROOM PHÂN PHỐI</Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><Home style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>{ShowroomLocation.address}</Grid>
              </Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><PhoneCallback style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>(0236) 3837 111 - (0236) 3690 111</Grid>
              </Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><MailOutline style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>quanle.ddk@gmail.com - quanle.dut@gmail.com</Grid>
              </Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><AccessAlarm style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>8:30 - 20:30 (Thứ hai - Chủ nhật)</Grid>
              </Grid>
            </div>
            <div style = {{width:'35%', height:'40vh'}}>
              <GoogleMap
                lat = {ShowroomLocation.latitude}
                lng = {ShowroomLocation.longitude}
                location = {ShowroomLocation.address}
              />
            </div>
          </div>
          <hr style = {{margin:2}}/>
          <div style = {{display:'flex', flexDirection: 'row', alignItems: 'center', marginTop:30}}>
            <div style = {{width:'35%', height:'40vh'}}>
              <GoogleMap
                lat = {FactoryLocation.latitude}
                lng = {FactoryLocation.longitude}
                location = {FactoryLocation.address}
              />
            </div>
            <div style = {{width:'30%', height:'40vh', display:'flex', flexDirection:'column', fontSize:'0.9rem', padding:10, lineHeight:2, color:'#666666'}}>
              <Grid style = {{fontWeight:'bold', fontSize:'1.5rem'}}>NHÀ MÁY SẢN XUẤT</Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><Home style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>{FactoryLocation.address}</Grid>
              </Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><PhoneCallback style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>(0236) 3837 111 - (0236) 3690 111</Grid>
              </Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><MailOutline style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>quanle.ddk@gmail.com - quanle.dut@gmail.com</Grid>
              </Grid>
              <Grid item style = {{display: 'flex'}}>
                <Grid item xs = {1} style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}><AccessAlarm style = {{width:20, height:20}}/></Grid>
                <Grid item xs = {11} style = {{display: 'flex',justifyContent:'flex-start', alignItems: 'center', marginLeft:5}}>8:30 - 20:30 (Thứ hai - Chủ nhật)</Grid>
              </Grid>
            </div>
            <img src = {factory} style = {{width:'35%', height:'40vh'}}/>
          </div>
      </div>
    )
}
}
