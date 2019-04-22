import React, { Component } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { withStyles, Paper } from '@material-ui/core'
import PageReducer from '../../redux/reducers/PageReducer';
import classNames from 'classnames'
import { Inbox as InboxIcon, Mail as MailIcon } from '@material-ui/icons'
const styles = (theme) => ({
	container: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 2,
	},
	drawer: {
		flexShrink: 0,
		width: theme.spacing.unit * 25,
		whiteSpace: 'nowrap',
		position: 'relative',
	},
	drawerOpen: {
		width: theme.spacing.unit * 25,
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
				primary: { main: blue[400] }
			}
		})
		return (
			<MuiThemeProvider theme={theme} classes={{ paper: classes.container }}>
				<div className={classes.container}>
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
							{['Inbox', 'Starred', 'Send email', 'Drafts', 'ABC', 'DEF', 'GHU','','','','','','','','','','','',''].map((text, index) => (
								<ListItem button key={text}>
									<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							))}
						</List>
					</Drawer>
					<main className = {classes.content}>

					</main>
				</div>
			</MuiThemeProvider>
		)
	}
}

Viewer.propTypes = {
	open: PropTypes.bool.isRequired
}

const mapState2Props = (state) => {
	console.log(state.PageReducer.isShowFullMenu)
	return {
		open: state.PageReducer.isShowFullMenu
	}
}
const mapDispatch2Props = (dispatch) => {

}
export default connect(mapState2Props, mapDispatch2Props)(withStyles(styles)(Viewer))
