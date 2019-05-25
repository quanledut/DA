import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Paper, Button, IconButton, TextField, InputAdornment, Dialog, CircularProgress} from '@material-ui/core';
import { Edit as EditIcon, TrafficOutlined, FlashAuto } from '@material-ui/icons'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { StyledButton, TitleTypography, CaptionTypoGraphy } from '../components/Components'
import { CarouselPage } from '../components/Carousel'
import ResponsiveDialog from '../components/YesNoDialog'
//import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";

export class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			mainImage: this.props.product.subImage || '', 
			isEdit: false,
			description: this.props.product.description || '',
			name: this.props.product.name || '',
			length: this.props.product.length || 0,
			width: this.props.product.width || 0,
			height: this.props.product.height || 0,
			saleprice: this.props.product ? (parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value) ? parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value) : 0) : 0 ,
			openFullImageDialog: false,
			buyQty: 1,
			activeImage: 1,
			showDeleteDialog: false,
			showChangeDialog: false
		}
	}

	onChangeText = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	hideYesNoDialog = () => {
		this.setState({
			showChangeDialog: false,
			showDeleteDialog: false
		})
	}

	componentDidMount() {
		//this.props.getProduct(window.location.href.split('.')[2])
	}

	render() {
		const { product, role } = this.props;
		const { description, name, length, width, height, saleprice } = this.state;
		return (
			<div style = {{padding: 10, border:'1px solid green', padding:10, margin:5}}>
				<div>
					<Grid container>
						<Grid item xs={5}>
							<div style = {{margin: 15}}>
								<div style={{ display: 'flex', justifyContent: 'center', height: 400, overflowX: 'hidden', alignItems: 'center', align: 'center' }}>
									<img src={`data:image/png; base64,${this.state.mainImage}`} style={{ height: 400 }} />
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingTop:20 }}>
									{this.props.product.images.map((image, index) => (
										<div key={image} style={{ width: 100, backgroundColor: '#fafafa' }}>
											<img src={`data:image/png; base64,${image}`} style={{ width: '100%' }} onClick={() => { this.setState({ openFullImageDialog: true, activeImage: index + 1 }) }} />
										</div>))}
								</div>
							</div>
						</Grid>
						<Grid item container xs={7} direction='column' style = {{padding:15}}>
							{!this.state.isEdit ?
								<div style={{ paddingLeft: 30 }}>
									<div style={{ display: 'flex', flexDirection: 'row' , alignItems: 'center'}}>
										<div style={{ color: '#616161', flexGrow: 1 , fontWeight:'bold', fontSize:'1.5rem'}}>{product.name}</div>
										{(this.props.role === 'admin' || this.props.role === 'manager') ?
											<div>
												<div style={{ fontSize: '0.8rem' , fontStyle: 'italic', display: 'flex', alignItems: 'center'}}>
													<EditIcon style={{ height: 15 }} />
													<a href = 'javascript:;' onClick={() => { this.setState({ isEdit: true }) }}>Cập nhật thông tin sản phẩm</a>
												</div>
											</div>
											: (<div></div>)}
									</div>
									<div style={{ lineHeight: '100%' }}>
										<h3>{description}</h3>
										<p>{'Mã : '}{product.no}</p>
										<p>{'Kích thước: '}{(length || 'X') + 'mm x ' + (width || 'X') + 'mm x ' + (height || 'X') + ' mm'}</p>
									</div>
									{product.importqty > 0 ? (<h4 style={{ color: 'green' }}>Số lượng còn lại: {product.importqty}</h4>) : (<p3 style={{ color: 'red' }}>Hết hàng</p3>)}
									<h1 style={{ color: '#dd2c00' }}>{saleprice > 0 ? saleprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' VNĐ' : 'Liên hệ'}</h1>
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
										<TextField
											label='Số lượng'
											value={this.state.buyQty}
											style={{ width: '100' }}
											margin='normal'
											type='number'
											name='buyQty'
											onChange={this.onChangeText}
										/>
										<StyledButton style={{ bottom: 7, marginLeft: 20 }}
											onClick={() => this.props.addProductToOrders(product, this.state.buyQty)}
										> Thêm vào giỏ hàng</StyledButton>
									</div>
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
											<p style={{ fontSize: '0.6em' }}>
												<EditIcon style={{ height: 15 }} />{' Huỷ'}
											</p>
										</IconButton>
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
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>
										<StyledButton onClick={() => this.setState({ showDeleteDialog: true })}>Xóa sản phẩm</StyledButton>
										<StyledButton onClick={() => { this.setState({ showChangeDialog: true }) }}>Cập nhật sản phẩm</StyledButton>
									</div>
								</div>}
						</Grid>
						<Dialog
							open={this.state.openFullImageDialog}
							onClose={() => this.setState({ openFullImageDialog: false })}
						>
							<CarouselPage images={product.images} active={this.state.activeImage} />
						</Dialog>
					</Grid>
				</div>
				<div>
					<div>Khách hàng đã mua sản phẩm</div>
					<div style = {{display: 'flex', flexDirection: 'row'}}>
						{this.props.saleOrders.map(saleOrder => (
							<div>
								<img src={`data:image/png;base64,${saleOrder.customer_id.avatar}`} style = {{width:200, height: 200}}/>
							</div>
						))}
					</div>
				</div>
				<ResponsiveDialog
					fullScreen={true}
					open={this.state.showChangeDialog}
					handleClickNo={this.hideYesNoDialog}
					handleClickYes={() => {
						this.props.ChangeProductDetail({
							_id: product._id,
							name: this.state.name,
							description: this.state.description,
							width: this.state.width,
							height: this.state.height,
							length: this.state.length,
							saleprice: this.state.saleprice
						})
						this.hideYesNoDialog();
					}
					}
					title='Xác nhận thay đổi'
					content='Bạn có muốn thay đôỉ thông tin sản phẩm?'
					noLabel='Không'
					yesLabel='Thay đổi'
				/>
				<ResponsiveDialog
					fullScreen={true}
					open={this.state.showDeleteDialog}
					handleClickNo={this.hideYesNoDialog}
					handleClickYes={() => {
						this.props.DeleteProduct({
							_id: product._id
						})
						this.hideYesNoDialog();
					}}
					title='Xác nhận xóa'
					content='Bạn có muốn xóa sản phẩm này khỏi danh sách sản phẩm kinh doanh?'
					noLabel='Không'
					yesLabel='Xác nhận xóa'
				/>
			</div>
		)
	}
}

const CarouselPageDialog = (props) => {
	const { open, images, active } = props;
	return (
		<Dialog
			open={open}
		>
			<CarouselPage images={images} active={active} />
		</Dialog>
	)
}
const mapState2Props = (state) => {
	return {
		product: state.ProductReducer.product.product,
		role: state.LoginReducer.role,
		saleOrders: state.ProductReducer.product.saleOrder
	}
}

const mapDispatch2Props = (dispatch) => {
	return {
		getProduct: (data) => {
			dispatch({ type: 'GET_PRODUCT', payload: data })
		},
		addProductToOrders: (product, productQty) => {
			dispatch({ type: 'ADD_PRODUCT_TO_ORDERS', payload: { product, productQty } })
		},
		ChangeProductDetail: (product) => {
			dispatch({ type: 'CHANGE_PRODUCT_DETAIL', payload: product })
		},
		DeleteProduct: (data) => {
			dispatch({ type: 'DELETE_PRODUCT', payload: data._id })
		}
	}
}

export default connect(mapState2Props, mapDispatch2Props)(ProductDetail)