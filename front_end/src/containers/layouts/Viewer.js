import React, { Component } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { withStyles, Paper } from '@material-ui/core';
import classNames from 'classnames'
import { Menu } from '../../data/MenuBar'
import ScreenRouter from '../../screens/router';
import {baseUrl} from '../../config'

const styles = (theme) => ({
	root: {
		display: 'flex', 
	},
	content: {
		flexGrow: 1,
		padding: 2,
		height: 680,
		overflowY: 'scroll'
	},
	drawer: {
		flexShrink: 0,
		width: theme.spacing.unit * 22,
		height: '100%',
		whiteSpace: 'nowrap',
		position: 'relative',
		display: 'flex'
	},
	drawerOpen: {
		width: theme.spacing.unit * 22,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 5 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 7 + 1,
		},
	}
})

export class Viewer extends Component {
	render() {
		const { classes } = this.props
		const theme = createMuiTheme({
			palette: {
				primary: { main: blue[500] }, // Purple and green play nicely together.
				secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
				type: 'light'
			},
			typography: { useNextVariants: true },
		});
		return (
			<div style = {{height: window.innerHeight, overflow: 'hidden', display:'flex', flexDirection: 'row'}}>
					<Drawer
						classes={{
							paper: classes.drawer
						}}
						variant='permanent'
						className={classNames(classes.drawer,
							{
								[classes.drawerOpen]: !this.props.open,
								[classes.drawerClose]: !this.props.open
							})
						}
						classes={{ paper: classNames(classes.drawer, { [classes.drawerOpen]: this.props.open, [classes.drawerClose]: !this.props.open }) }}
						open={this.props.open}
					>
						<List>
							{(Menu[this.props.role || 'guess']).map((data, index) => (
								data.icon?
								<div>
									<ListItem selected={(window.location.href == `${baseUrl}/` && data.name == '/') || (data.name != '/' && window.location.href.indexOf(data.name) >= 0)} button key={data.name} onClick={() => this.props.router(data.name, this.props.token)}>
										<ListItemIcon>{data.icon}</ListItemIcon>
										{/*<ListItemText primary={data.caption} />*/}
										<ListItemText>
											<div style = {{fontWeight: 'bold', color:'#999999'}}>
												{data.caption}
											</div>
										</ListItemText>
									</ListItem>
									<hr style = {{margin:0, color:'green'}}/>
								</div>
								:
								<ListItem disabled>
									<div style = {{height: '100%'}}></div>
								</ListItem>
							))}
						</List>
					</Drawer>
					<div style = {{flexGrow: 1, overflow: 'scroll', height: window.innerHeight*0.92}}>
						<ScreenRouter />
					</div>
			</div>
		)
	}
}

Viewer.propTypes = {
	open: PropTypes.bool.isRequired
}

const mapState2Props = (state) => {
	return {
		open: state.PageReducer.isShowFullMenu,
		role: state.LoginReducer.role,
		screen: state.PageReducer.screen,
		token: state.LoginReducer.token
	}
}
const mapDispatch2Props = (dispatch) => {
	return {
		router: (screenName, token) => {
			dispatch({ type: 'SCREEN_ROUTER', payload: screenName , token})
		}
	}
}
export default connect(mapState2Props, mapDispatch2Props)(withStyles(styles)(Viewer))
