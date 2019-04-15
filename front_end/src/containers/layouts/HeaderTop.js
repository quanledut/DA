import React, { Component } from 'react';
import {AppBar, Link, Toolbar, CardMedia} from '@material-ui/core'
import logo from '../../logo.png'
export class HeaderTop extends Component {
  render() {
    return (
        <div className = 'root'>
            <AppBar position = 'static' color = 'default' style = {{height:'5vh', boxSizing: 'border-box'}}>
                <Toolbar style = {{width:'100%', height:'100%', padding: '0px', display:'block'}}>
                <img src = {logo} alt = 'logo' style = {{float: 'left', height: 'auto', maxWidth:'auto', top:'0px'}}/>
                </Toolbar>
            </AppBar>
        </div>
      

    )
  }
}

export default HeaderTop
