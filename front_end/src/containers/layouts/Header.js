
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Avatar, Button, IconButton, Menu, MenuItem, Badge, Divider } from '@material-ui/core';
import {
  Menu as MenuIcon, Mail as MailIcon, MoreVert as MoreIcon, Notifications as NotificationsIcon,
  ShoppingCart as ShoppingCartIcon, BubbleChart, Person
} from '@material-ui/icons';
import { blue, red, purple } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  appBar: {
    color: purple
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
    border: `2px solid ${theme.palette.type == 'light' ? theme.palette.grey[200] : theme.palette.grey[2000]}`
  },
});

class ButtonAppBar extends Component {
  state = {
    mobileMoreAnchorEl: {}
  }
  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      palette: {
        primary: { main: blue[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        type: 'dark'
      },
      typography: { useNextVariants: true },
    });

    return (
      <div>
        <MuiThemeProvider className={classes.root} theme={theme} position='fixed'>
          <AppBar className={classes.appBar} position='static'>
            <Toolbar >
              <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.props.toggleMenuDisplay}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="default" className={classes.grow}>
                Vinmus Community
                </Typography>
              <div className={classes.isDesktopMenu}>
                <IconButton>
                  <Badge badgeContent={this.props.order} color='secondary' classes={{ badge: classes.badge }}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={this.handleUserOpen}>
                  <Avatar alt='User' src={this.props.isLoggedIn ? '' : 'https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png'} />
                </IconButton>
              </div>
              <div className={classes.isMobileMenu}>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
        {renderAccountMenu}
      </div>
    );

    const handleUserOpen = e => {
      this.setState({ mobileMoreAnchorEl: e.currentTarget },(err,done) => {
        this.props.toggleAccountDisplay();
      }); 
    }

    const renderAccountMenu = (this.props.isLoggedIn ?
      (<Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.props.isUserPopupOpen}
      // onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.props.toggleAccountDisplay}>
          <IconButton color="inherit">
            <Person />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.props.toggleAccountDisplay}>
          <IconButton color="inherit">
            <BubbleChart />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>)
      :
      ((<Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.props.isUserPopupOpen}
        onClose={this.handleMenuClose}
      >
        <Divider />
        <MenuItem onClick={this.props.toggleAccountDisplay}>
          <IconButton color="inherit">
            <BubbleChart />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>))
    );

  }
}

const mapState2Props = (state) => {
  return {
    mail: state.PageReducer.mail,
    order: state.PageReducer.order,
    isLoggedIn: state.LoginReducer.isLoggedIn,
    isAdmin: state.LoginReducer.isAdmin,
    isUserPopupOpen: state.PageReducer.isUserPopupOpen
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    toggleMenuDisplay: () => {
      console.log('Menu pressed')
      return dispatch({ type: 'TOGGLE_MENU_DISPLAY' })
    },
    toggleAccountDisplay: () => {
      return dispatch({ type: 'TOGGLE_ACCOUNT_DISPLAY' })
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(withStyles(styles)(ButtonAppBar));
