import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { Grid, Paper, Button, IconButton, TextField, InputAdornment, Dialog } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons'
import { red, blue, green } from '@material-ui/core/colors';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { GridList } from 'material-ui';
import ReactImageMagnify from 'react-image-magnify';
import { StyledButton, TitleTypography, CaptionTypoGraphy } from '../components/Components'
import { CarouselPage } from '../components/Carousel'
import { Products } from './Products';
//import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";

const styles = (theme) => ({
	image: {

	},
	productName: {
		textColor: '#424242',
		colors: '#424242'
	},
	paper: {
		position: 'relative', width: '100%', height: '100%', mar: '0.2%', paddingLeft: '0.2%'
	},
	button: {
		height: 20
	}
})

const theme = createMuiTheme({
	palette: {
		inherit: {
			main: '#424242'
		}
	}
})

export class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			mainImage: this.props.product.subImage,
			isEdit: false,
			description: this.props.product.description,
			name: this.props.product.name,
			length: this.props.product.length,
			width: this.props.product.width,
			height: this.props.product.height,
			saleprice: parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value) ? parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value) : 0,
			openFullImageDialog: true
		}
	}

	onChangeText = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	componentDidMount() {
		//this.props.getProduct(window.location.href.split('.')[2])
	}

	render() {
		const { classes, product, role } = this.props;
		const { description, name, length, width, height, saleprice } = this.state;
		return (
			<MuiThemeProvider theme={theme}>
				<Paper className={classes.paper}>
					<Grid container>
						<Grid item xs={5}>
							<div>
								<div style={{ width: '100%', height: 400, overflowY: 'scroll', alignItems: 'center', align: 'center' }}>
									{/* <ReactImageMagnify {...{
										smallImage: {
											alt: 'Wristwatch by Ted Baker London',
											isFluidWidth: true,
											src: `data:image/png; base64,${this.state.mainImage}`,
										},
										largeImage: {
											src: `data:image/png; base64,${this.state.mainImage}`,
											width: 1200,
											height: 1800
										}
									}} /> */}
									<img src={`data:image/png; base64,${this.state.mainImage}`} />
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
									{this.props.product.images.map(image => (
										<div style={{ width: 100, backgroundColor: '#fafafa' }}>
											<img src={`data:image/png; base64,${image}`} style={{ width: '100%' }} onClick={() => { this.setState({ mainImage: image }) }} />
										</div>))}
								</div>
							</div>
						</Grid>
						<Grid item container xs={7} direction='column'>
							{!this.state.isEdit ?
								<div style={{ paddingLeft: 30 }}>
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										<h1 style={{ color: '#616161', flexGrow: 1 }}>{product.name}</h1>
										{(this.props.role === 'admin' || this.props.role === 'manager') ? <IconButton onClick={() => { this.setState({ isEdit: true }) }}><EditIcon style={{ height: 15 }} /><p style={{ fontSize: '0.6em' }}>{' Cập nhật thông tin sản phẩm'}</p></IconButton> : (<ul></ul>)}
									</div>
									<div style={{ lineHeight: '100%' }}>
										<h3>{description}</h3>
										<p>Mã :{product.no}</p>
										<p>Kích thước: {(length || 'X') + ' x ' + (width || 'X') + ' x ' + (height || 'X') + ' mm'}</p>
									</div>
									{product.importqty > 0 ? (<h4 style={{ color: 'green' }}>Số lượng còn lại: {product.importqty}</h4>) : (<p3 style={{ color: 'red' }}>Hết hàng</p3>)}
									<h1 style={{ color: '#dd2c00' }}>{saleprice > 0 ? saleprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' VNĐ' : 'Liên hệ'}</h1>
								</div>
								:
								<div style={{ paddingLeft: 30, lineHeight: 1.6, marginTop: 20 }}>
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										<TextField
											required
											label='Tên sản phẩm'
											value={name}
											name='name'
											onChange={this.onChangeText}
											style={{ marginRight: 30, flexGrow: 1 }}
											error={name === ''}
										/>
										<IconButton
											onClick={() => {
												this.setState({
													isEdit: false,
													description: this.props.product.description,
													name: this.props.product.name,
													length: this.props.product.length,
													width: this.props.product.width,
													height: this.props.product.height,
													saleprice: parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value) ? parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value) : 0
												})
											}}>
											<EditIcon style={{ height: 15 }} /><p style={{ fontSize: '0.6em' }}>{' Huỷ'}</p></IconButton>
									</div>
									<TextField
										required
										label='Mô tả'
										value={description}
										name='description'
										onChange={this.onChangeText}
										style={{ marginRight: 30, flexGrow: 1 }}
										error={description === ''}
										multiline
										fullWidth
									/>
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
										<TextField
											required
											type='number'
											label='Dài'
											value={length}
											name='length'
											onChange={this.onChangeText}
											style={{ width: '30%' }}
											error={length === ''}
											InputProps={{
												endAdornment: <InputAdornment position='end'>mm</InputAdornment>
											}}
										/>
										<TextField
											required
											type='number'
											label='Rộng'
											value={width}
											name='width'
											onChange={this.onChangeText}
											style={{ width: '30%' }}
											error={width === ''}
											InputProps={{
												endAdornment: <InputAdornment position='end'>mm</InputAdornment>
											}}
										/>
										<TextField
											required
											type='number'
											label='Cao'
											value={height}
											name='height'
											onChange={this.onChangeText}
											style={{ width: '30%' }}
											error={height === ''}
											InputProps={{
												endAdornment: <InputAdornment position='end'>mm</InputAdornment>
											}}
										/>
									</div>
									<TextField
										required
										type='number'
										label='Giá bán'
										value={saleprice}
										name='saleprice'
										onChange={this.onChangeText}
										style={{ marginRight: 30, flexGrow: 1, paddingTop: 20 }}
										error={saleprice === ''}
										InputProps={{
											endAdornment: <InputAdornment position='end'>VNĐ</InputAdornment>
										}}
										fullWidth
									/>
								</div>}
						</Grid>
						<Dialog
						open = {this.state.openFullImageDialog}
						onClose = {() => this.setState({openFullImageDialog: false})}
						>
							<CarouselPage images = {product.images} active = {1}/>
						</Dialog>
					</Grid>

				</Paper>
			</MuiThemeProvider>
		)
	}
}

const CarouselPageDialog = (props) => {
	const { open, images, active } = props;
	return (
		<Dialog
			open = {open}
		>
			<CarouselPage images = {images} active = {active}/>
		</Dialog>
	)
}
const mapState2Props = (state) => {
	return {
		product: state.ProductReducer.product,
		role: state.LoginReducer.role
	}
}

const mapDispatch2Props = (dispatch) => {
	return {
		getProduct: (data) => {
			dispatch({ type: 'GET_PRODUCT', payload: data })
		},
	}
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(ProductDetail)))