import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Paper, Button, IconButton, TextField, InputAdornment, Dialog, CircularProgress} from '@material-ui/core';
import { Edit as EditIcon, TrafficOutlined, FlashAuto } from '@material-ui/icons'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { StyledButton, TitleTypography, CaptionTypoGraphy } from '../components/Components'
import { CarouselPage } from '../components/Carousel'
import ResponsiveDialog from '../components/YesNoDialog'
import { white } from 'material-ui/styles/colors';
import sold_out from '../data/sold_out.png'
//import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";

export class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			mainImage: '',
			isEdit: false,
			description: '',
			name: '',
			length:  0,
			width: 0,
			height: 0,
			saleprice: 0,
			openFullImageDialog: false,
			buyQty: 1,
			activeImage: 1,
			showDeleteDialog: false,
			showChangeDialog: false
		}
	}

	onChangeText = (event) => {
		if(event.target.name == 'buyQty'){
			if(parseInt(event.target.value)){
				this.setState({buyQty: parseInt(event.target.value)})
			} 
		}
		else{
			this.setState({
				[event.target.name]: event.target.value
			})
		}
	}

	increaseBuyQty = () => {
		this.setState({buyQty: this.state.buyQty + 1})
	}

	decreaseBuyQty = () => {
		this.setState({buyQty: this.state.buyQty - 1 > 0 ? this.state.buyQty - 1 : 1})
	}


	hideYesNoDialog = () => {
		this.setState({
			showChangeDialog: false,
			showDeleteDialog: false
		})
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.product && nextProps.product.subImage != this.state.mainImage) this.setState({mainImage:nextProps.product.subImage});
		if(nextProps.product && nextProps.product.description != this.state.description) this.setState({description:nextProps.product.description});
		if(nextProps.product && nextProps.product.name != this.state.name) this.setState({name:nextProps.product.name});
		if(nextProps.product && nextProps.product.length != this.state.length) this.setState({length:nextProps.product.length});
		if(nextProps.product && nextProps.product.width != this.state.width) this.setState({width:nextProps.product.width});
		if(nextProps.product && nextProps.product.height != this.state.height) this.setState({height:nextProps.product.height});
		if(nextProps.product && parseFloat(nextProps.product.saleprice[nextProps.product.saleprice.length-1].value) != this.state.saleprice) this.setState({saleprice:parseFloat(nextProps.product.saleprice[nextProps.product.saleprice.length-1].value)});
	}

	compo

	componentWillMount() {
		this.props.loadProduct(window.location.href.split('/')[4])
	}

	render() {
		const { product, role, customer_buyed, product_buy_with } = this.props;
		const { description, name, length, width, height, saleprice } = this.state;
		return (
			<div style = {{padding: 10, border:'1px solid green', padding:10, margin:5}}>

				{!product ? <div></div> : 
				<div>
					<Grid container>
						<Grid item xs={5}>
							<div style = {{margin: 15}}>
								<div style={{ display: 'flex', justifyContent: 'center', height: 400, overflowX: 'hidden', alignItems: 'center', align: 'center' }}>
									<img src={`data:image/png; base64,${this.state.mainImage}`} style={{ height: 400 }} />
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingTop:20 }}>
									{product.images.map((image, index) => (
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
									<div style={{ lineHeight: 2 }}>
										<div>{'Mã : '}{product.no}</div>
										<div>{'Kích thước: '}{(length || 'X') + ' x ' + (width || 'X') + ' x ' + (height || 'X') + ' mm'}</div>
										<hr style = {{margin:5}}/>
										<div style = {{fontSize:'0.8rem', wordWrap: 'break-word'}}>
											{description.split('-').filter(item => item != '').map(item => (<div>- {item}</div>))}
										</div>
										<hr style = {{margin:5}}/>
									</div>
									<div style = {{display:'flex'}}>
										<div style = {{fontStyle:'italic', fontSize: '1rem', marginRight:10, display: 'flex', alignItems: 'flex-end', marginBottom: 2}}>Giá:</div>
										<div style={{ color: '#dd2c00', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'flex-end' }}>
											{saleprice > 0 ? saleprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' VNĐ' : 'Liên hệ'}
										</div>
									</div>
									{this.props.product.saleprice.length >= 2 && this.props.product.saleprice[this.props.product.saleprice.length - 1].value < this.props.product.saleprice[0].value ? 
										<div style = {{display: 'flex', fontSize:'0.8rem'}}>
											<div style = {{textDecoration: 'line-through'}}>{parseFloat(this.props.product.saleprice[0].value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnđ</div>
											<div style = {{color: 'green', marginLeft:30}}>- {Math.round((parseFloat(this.props.product.saleprice[0].value)-parseFloat(this.props.product.saleprice[this.props.product.saleprice.length - 1].value))/parseFloat(this.props.product.saleprice[0].value)*100)}%</div>
										</div>
										: <div></div>
									}
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end' , marginTop:10}}>
										<div style = {{display: 'flex', alignItems: 'center'}}>
											<div style = {{marginRight:30, color: '#6c757d', fontSize: '0.8rem', display: 'flex', alignItems: 'center'}}>Số lượng:</div>
											<div style = {{width:120, display: 'flex', justifyContent: 'center'}}>
												<div onClick = {this.decreaseBuyQty} style = {{width:30, height:25,color:'#6c757d', border:'1px solid rgba(0,0,0,.4)', borderRight: '0px', borderTopLeftRadius:5, borderBottomLeftRadius: 5, display:'flex', alignItems:'center', justifyContent: 'center',fontWeight:'bold', fontSize:'1.5rem'}}>
													-
												</div>
												<input name='buyQty' onChange={this.onChangeText} value = {this.state.buyQty} style = {{width:40,height:25, border:'1px solid rgba(0,0,0,.4)', textAlign: 'center', fontSize:'0.8rem', fontWeight:'bold'}}></input>
												<div onClick = {this.increaseBuyQty} style = {{width:30, height:25,color:'#6c757d', border:'1px solid rgba(0,0,0,.4)', borderLeft: '0px', borderTopRightRadius:5, borderBottomRightRadius: 5, display:'flex', alignItems:'center', justifyContent: 'center',fontWeight:'bold', fontSize:'1.5rem'}}>
													+
												</div>
												{}
											</div>
											{product.importqty > 0 ? 
												(<div style={{ color: 'green', fontSize:'0.8rem', display: 'flex', alignItems: 'center' }}>(Số lượng còn lại: {product.importqty})</div>) :
												(<img src = {sold_out} style = {{height:50, paddingLeft:20}}/>)
											}
										</div>
									</div>
									<StyledButton disabled = {product.importqty <= 0} style={{width:'80%', margin:30, color: 'white', fontWeight: 'bold'}} onClick={() => this.props.addProductToOrders(product, this.state.buyQty)}>
										{product.importqty <= 0 ? 'SOLD OUT !!!' : 'THÊM VÀO GIỎ HÀNG'}
									</StyledButton>
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
					<ResponsiveDialog
						fullScreen={true}
						open={this.state.showChangeDialog}
						handleClickNo={this.hideYesNoDialog}
						handleClickYes={() => {
							this.props.ChangeProductDetail(this.props.token,{
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
				}
				<hr style = {{margin:5}}/>
				{!customer_buyed || role == 'guess' || role == null ? <div></div> :
				<div>
					<div style = {{fontWeight:'bold', fontSize: '0.8rem'}}>KHÁCH HÀNG ĐÃ MUA</div>
					<div style = {{display: 'flex', flexDirection: 'row',  marginTop: 10, width: '100%'}}>
						{customer_buyed.map(saleOrder => (
							<div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center',border: '1px solid green', borderRadius: 3,marginRight:15}}>
								<img src={`data:image/png;base64,${saleOrder.customer_id.avatar}`} style = {{width:150, height: 150, margin: 10}}/>
								<a href = 'javascript:;' onClick = {() => {this.props.showCustomer(this.props.token,saleOrder.customer_id._id)}}>{saleOrder.customer_id.name}</a>
							</div>
						))}
					</div>
				</div>
				}
				<hr style = {{margin:5}}/>
				{!product_buy_with ? <div></div>:
				<div>
					<div style = {{fontWeight:'bold', fontSize: '0.8rem'}}>SẢN PHẨM ĐƯỢC MUA CÙNG: </div>
					<div style = {{display: 'flex', flexDirection: 'row',  marginTop: 10, width: '100%'}}>
						{product_buy_with.map(product => 
							<div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3,marginRight:15}}>
								<img src={`data:image/png;base64,${product._id.subImage}`} style = {{width:150, height: 150, margin: 10}}/>
								<a style = {{fontSize:'0.8rem', fontWeight: 'bold'}} href = 'javascript:;' onClick = {() => {this.props.loadProduct(product._id._id)}}>{product._id.name}</a>
							</div>
						)}
					</div>
				</div>
				}

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
		customer_buyed: state.ProductReducer.product.customer_buyed,
		token: state.LoginReducer.token,
		product_buy_with: state.ProductReducer.product.top_product_buy_with
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
		ChangeProductDetail: (token,product) => {
			dispatch({ type: 'CHANGE_PRODUCT_DETAIL', token: token,payload: product })
		},
		DeleteProduct: (token,data) => {
			dispatch({ type: 'DELETE_PRODUCT', token,payload: data._id })
		},
		showCustomer:(token, id) => {
			dispatch({type:'GET_CUSTOMER_DETAIL',payload:id, token: token})
		}, 
		loadProduct:(id) => {
			dispatch({type: 'HANDLE_SHOW_PRODUCT_DETAIL', payload:id})
		}
	}
}

export default connect(mapState2Props, mapDispatch2Props)(ProductDetail)