import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Avatar, Button, IconButton, Menu, MenuItem, Badge, Divider } from '@material-ui/core';
import {
  Menu as MenuIcon, Mail as MailIcon, MoreVert as MoreIcon, Notifications as NotificationsIcon,
  ShoppingCart as ShoppingCartIcon, BubbleChart, Person, TrainRounded
} from '@material-ui/icons';
import { blue, red, purple } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import LoginDialog from '../../components/LoginDialog';
import ForgotPasswordDialog from '../../components/ForgotPasswordDialog';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Roles} from '../../data/Role'
import menu_icon from '../../data/menu_icon_1.png' 
import logo from '../../data/logo.png'
import wood_background from '../../data/wood.png' 
import {GreenButton} from '../../components/Components'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  appBar: {
    color: purple,
    width:'100%',
    height: '6%'
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  isDesktopMenu: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  isMobileMenu: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    right: -10
  },
  badge: {
    border: `2px solid ${theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[2000]}`
  },
  toolBar:{
    height:40
  }
});

class Header extends React.Component {
  state = {
    accountAnchorEl: null,
    isShowMenu: false,
    isShowAccount: false,
    isShowLogin: false,
    showForgotPasswordForm: false
  }

  handleUserOpen = e => {
    this.setState({ accountAnchorEl: e.currentTarget })
  }

  profilePressHandle = () => {
    this.handleAccountClose();
    this.props.showUserDetail();
  }

  logoutPressHandle = () => {
    this.handleAccountClose();
    this.props.handleLogout();
    //this.props.showSignUpDialog();
  }

  handleAccountClose = () => {
    this.setState({ accountAnchorEl: null })
  }

  componentWillReceiveProps(nextProps){
    console.log('NextProps: ' +JSON.stringify(nextProps));
  }

  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      palette: {
        primary: { main: blue[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        type: 'light'
      },
      typography: { useNextVariants: true },
    });

    const renderAccountMenu = (this.props.role ?
      (<Menu
        anchorEl={this.state.accountAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        getContentAnchorEl={null}
        open={Boolean(this.state.accountAnchorEl)}
        onClose={this.handleAccountClose}
      >
        <MenuItem onClick={this.profilePressHandle}>
          <IconButton color="inherit">
            <Person />
          </IconButton>
          <p>Thông tin cá nhân</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.logoutPressHandle}>
          <IconButton color="inherit">
            <BubbleChart />
          </IconButton>
          <p>Đăng xuất</p>
        </MenuItem>
      </Menu>)
      :
      ((<Menu
        anchorEl={this.state.accountAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        // transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        getContentAnchorEl={null}
        open={Boolean(this.state.accountAnchorEl)}
        onClose={this.handleAccountClose}
      >
        <MenuItem onClick={this.props.showLoginForm}>
          <IconButton color="inherit">
            <Person />
          </IconButton>
          <p>Đăng nhập</p>
        </MenuItem>
      </Menu>))
    );

    return (
        <div style = {{position: 'relative', display: 'flex', flexDirection:'row', width:'100%', justifyContent: 'center', alignItems: 'center', height:'8%', borderBottom: '2px solid green', 
        // backgroundImage:`url(${wood_background})`, 
        backgroundColor:'#fff',
        backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
          <div onClick={this.props.toggleMenuDisplay} style = {{margin: 10,paddingRight:10, height:'100%', display:'flex',justifyContent: 'center', alignItems: 'center'}}>
              <img src = {menu_icon} style = {{height: '80%', }}/>
              {/*} <MenuIcon style = {{height:100}}/>*/}
          </div>
          <div style = {{flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', height:'100%'}}>
            <img src= {logo} style = {{height:'100%'}}/>
          </div>
          <IconButton onClick = {() => {
            this.props.reloadSaleOrder(this.props.SaleOrder);
            this.props.showCards(this.props.SaleOrder);
          }}>
            <Badge badgeContent={this.props.SaleOrder.length} color='secondary' classes={{ badge: classes.badge }}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {this.props.email ? 
          <div onClick={this.handleUserOpen} style = {{height:'100%', display:'flex', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginLeft:10}}>
            <div style = {{height:40, width: 40, borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src={this.props.email ? `data:image/png;base64,${this.props.userAvatar}` : 'https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png'} style = {{height: '100%'}}/> 
            </div>
            <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',height: '100%', marginRight:25, marginLeft: 15}}>
                <div style = {{fontWeight: 700, fontSize: '0.9rem', fontStyle:'Helvetica Neue",Helvetica,Arial,sans-serif'}}>{this.props.user_detail && this.props.user_detail.name && this.props.user_detail.name != '' ? this.props.user_detail.name.toUpperCase() : this.props.email}</div>
                <div style = {{ fontSize: '0.7rem'}}>{Roles.filter(role => role.name === this.props.role)[0] != null ? Roles.filter(role => role.name === this.props.role)[0].caption : 'Khách hàng'}</div>
            </div>
          </div>
          :
          <GreenButton onClick = {this.props.showLoginForm} style = {{marginRight: 15}}>Đăng nhập</GreenButton>
          }
          
          
          {/*<AppBar className={classes.appBar} position='static'>
            <Toolbar className = {classes.toolBar}>
              <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.props.toggleMenuDisplay}>
                <MenuIcon />
              </IconButton>
              <div style = {{display: 'flex', flexGrow: 1, color: 'white', fontWeight: 'bold', fontSize: '2.0rem'}}>
                Nội thất Vinmus
                </div>
              <div className={classes.isDesktopMenu}>
                <IconButton onClick = {() => {
                  this.props.reloadSaleOrder(this.props.SaleOrder);
                  this.props.showCards(this.props.SaleOrder);
                }}>
                  <Badge badgeContent={this.props.SaleOrder.length} color='secondary' classes={{ badge: classes.badge }}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns='material-appbar'
                  aria-haspopup="true"
                  onClick={this.handleUserOpen}
                  color="inherit"
                  display='flex'
                  style = {{height:50}}
                >
                  <Avatar style = {{top: -5}} id='userAvatar' alt='User' src={this.props.email ? `data:image/png;base64,${this.props.userAvatar}` : 'https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png'} />
                  <div style={{ display: 'flex', flexDirection: 'column',right: -10, marginLeft: 10, justifyContent: 'left', lineHeight: 0.8 }}>
                    <label htmlFor='userAvatar' style={{ fontSize: 15 }}>{!this.props.email ? 'example@gmail.com' : this.props.email}</label>
                    <label htmlFor='userAvatar' style={{ fontSize: 20 }}>{Roles.filter(role => role.name === this.props.role)[0] != null ? Roles.filter(role => role.name === this.props.role)[0].caption : 'Khách hàng'}</label>
                  </div>
                </IconButton>
              </div>
              <div className={classes.isMobileMenu}>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
              */}
          <LoginDialog
            open={this.props.loginFormState}
            hideLoginForm={this.props.hideLoginForm}
            requestLogin = {this.props.requestLogin}
            showForgotPassForm = {() => {
              this.setState({showLoginForm: false,
                            showForgotPasswordForm: true})
            }}
          />
          <div><NotificationContainer/></div>
          <ForgotPasswordDialog/>
          {renderAccountMenu}
        </div>
    );
  }
}

const mapState2Props = (state) => {
  return {
    mail: state.PageReducer.mail,
    role: state.LoginReducer.role,
    userAvatar: state.LoginReducer.avatar,
    SaleOrder: state.ProductReducer.SaleOrder,
    email: state.LoginReducer.email,
    token: state.LoginReducer.token,
    loginFormState: state.PageReducer.loginFormState,
    user_detail: state.LoginReducer.user_detail
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    showLoginForm: () => {dispatch({type: 'SHOW_LOGIN_FORM'})},
    hideLoginForm: () => {dispatch({type: 'HIDE_LOGIN_FORM'})},
    toggleMenuDisplay: () => { return dispatch({ type: 'TOGGLE_MENU_DISPLAY' }) },
    handleLogout: () => {return dispatch({type: 'HANDLE_LOGOUT'})},
    showCards: () => {return dispatch({type:'SCREEN_ROUTER',payload:  '/cards'})},
    reloadSaleOrder: (SaleOrder) => {return dispatch({type: 'RELOAD_SALE_ORDER', payload: SaleOrder})},
    requestLogin: (data) => {return dispatch({type: 'REQUEST_LOGIN', payload:data})},
    showUserDetail: () => {return dispatch({type:'SCREEN_ROUTER',payload:'/users/detail'})}
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withStyles(styles)(Header));
