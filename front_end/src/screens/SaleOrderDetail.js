import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { ShipmentType, PaymentType, SaleOrderStatus} from '../data/Config';
import {StyledButton} from '../components/Components';
import {Dialog} from '@material-ui/core';
import ReactToPrint from 'react-to-print';

export class SaleOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {openPrintDialog: false}
  }

  componentDidMount() {
      const currentUrl = window.location.href;
      console.log(currentUrl);
  }

  render() {
      const {SaleOrder, token} = this.props
    return (
      <div style={{ margin: 2, border: '1px solid #9e9d24', borderRadius: 3, height: '100%' , overflow:'scroll'}}>
        <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 30, color: 'white' }}>
          Thông tin đơn hàng
        </div>
        <div style = {{marginLeft: 20, fontWeight: 'bold', color: '#212121'}}>Thông tin chung</div>
        <div style = {{margin: 20, marginTop: 5, border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', fontSize: '14px'}}>
            <Grid item xs = {6} style = {{padding: 10, display: 'flex', flexDirection: 'column', lineHeight: 2}}>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Tên khách hàng:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.customer_id.name}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Số điện thoại:
                    </Grid>
                    <Grid item xs = {8}>
                    {SaleOrder.customer_id.phone_number}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Địa chỉ email:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.customer_id.email}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Giới tính:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.customer_id.gender == 'male' ? 'Nam' : SaleOrder.customer_id.gender == 'female' ? 'Nữ' : 'Không xác định'}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Địa chỉ:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.customer_id.address}
                    </Grid>
                </div>               
            </Grid>

            <Grid item xs = {6} style = {{paddingLeft: 10, paddingBottom: 10, display: 'flex', flexDirection: 'column', lineHeight: 2, borderLeft: '1px solid green'}}>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4} style = {{ marginTop: 10}}>
                        Hình thức giao hàng:
                    </Grid>
                    <Grid item xs = {6} style = {{ marginTop: 10}}>
                        {ShipmentType.filter(type => type.value == SaleOrder.shipment_type)[0].caption}
                    </Grid>
                    <Grid item xs = {2} style = {{height:30, backgroundColor:  this.props.SaleOrder.status == 'New' ? 'green' : this.props.SaleOrder.Status == 'Confirmed' ? 'blue' : 'gray', borderBottomLeftRadius: 8, textAlign: 'center', color: 'white', fontWeight:'bold'}}>
                        {SaleOrderStatus.filter(p => p.value == this.props.SaleOrder.status)[0].caption}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Hình thức thanh toán:
                    </Grid>
                    <Grid item xs = {8}>
                        {PaymentType.filter(type => type.value == SaleOrder.payment_type)[0].caption}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Người nhận:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.receiver_name}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Số điện thoại người nhận:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.receiver_phone_number}
                    </Grid>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <Grid item xs = {4}>
                        Địa chỉ nhận hàng:
                    </Grid>
                    <Grid item xs = {8}>
                        {SaleOrder.shipment_address}
                    </Grid>
                </div>
                
            </Grid>
        </div>
        <div style = {{marginLeft: 20, fontWeight: 'bold', color: '#212121'}}>Danh sách sản phẩm</div>
        <div style = {{margin:20, marginTop: 5, border:'1px solid green', borderRadius: 3,  paddingLeft:10, paddingRight:10, fontSize:'0.8rem'}}>
            <div style = {{display: 'flex', flexDirection: 'row'}}>
                <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Hình ảnh</Grid>
                <Grid item xs = {4} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Tên sản phẩm</Grid>
                <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Đơn giá</Grid>
                <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Số lượng</Grid>
                <Grid item xs = {2} style = {{textAlign: 'center'}}>Thành tiền</Grid>
            </div>
            <hr style = {{margin: 2, color: 'red'}}></hr>
            {SaleOrder.items.map((item, index) => (
                <div style = {{display: 'flex', flexDirection: 'row', backgroundColor: index % 2 == 0 ? '#e0e0e0' : 'white'}}>                  
                    <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575', display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                        <img style={{ width: 50, height: 50 }} src={`data:image/png;base64,${item.product_id.subImage}`} />
                    </Grid>
                    <Grid item xs = {4} style = {{textAlign: 'center', borderRight:'1px dotted #757575',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                        <a href = 'javascript:;'  onClick = {() => this.props.showProduct(item.product_id._id)}>{item.product_id.name}</a>
                    </Grid>
                    <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                        {(parseFloat(item.sale_price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </Grid>
                    <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575', display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                        {item.qty}
                    </Grid>
                    <Grid item xs = {2} style = {{textAlign: 'center',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center', justifyContent:'center' }}>
                        {(item.sale_price * item.qty).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </Grid>
                </div> 
                ))}
            
                <hr style = {{margin: 2, color:'red'}}></hr>
                <div style = {{display: 'flex', flexDirection: 'row', padding: 5, fontWeight: 'bold'}}>
                    <Grid item xs = {8}></Grid>
                    <Grid item xs = {4} style = {{ display:'flex', flexDirection: 'column'}}>
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {6}>Tổng thành tiền</Grid>
                            <Grid item xs = {6}  style = {{textAlign: 'center'}}>{SaleOrder.sub_total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>   
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {4} style = {{textAlign: 'left'}}>Chiết khấu</Grid>
                            <Grid item xs = {2} style = {{textAlign: 'center'}}>{SaleOrder.discount}%</Grid>
                            <Grid item xs = {6} style = {{textAlign: 'center'}}>{(SaleOrder.discount * SaleOrder.sub_total_amount/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>    
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {6}  style = {{textAlign: 'left', borderLeft: 10}}>Đã thanh toán</Grid>
                            <Grid item xs = {6}  style = {{textAlign: 'center'}}>{SaleOrder.paid_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>   
                        <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Grid item xs = {6}  style = {{textAlign: 'left'}}>Còn lại</Grid>
                            <Grid item xs = {6}  style = {{textAlign: 'center'}}>{(SaleOrder.total_amount - SaleOrder.paid_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                        </div>    
                    </Grid>
                </div>
        </div>
        <Grid item xs = {12} style = {{display: 'flex', flexDirection: 'row'}}>
            <Grid item xs = {2}/>
            <Grid item xs = {3} style = {{marginLeft:30, marginRight: 30, display: this.props.SaleOrder.status == 'Confirmed' || this.props.SaleOrder.status == 'Done' ? 'flex' : 'none'}}> <StyledButton onClick = {() => {this.setState({openPrintDialog: true})}} fullWidth> In đơn hàng </StyledButton> </Grid>
            <Grid item xs = {2}/>
            <Grid item xs = {3} style = {{marginLeft:30, marginRight: 30, display: this.props.role == 'admin' || this.props.role == 'manager' ? 'flex' : 'none'}}>
                <StyledButton fullWidth onClick = {() => this.props.goToNextState(this.props.token, this.props.SaleOrder._id)} style = {{display: this.props.SaleOrder.status == 'Done' ? 'none' : 'flex'}}>
                    {this.props.SaleOrder.status == 'New' ? 'Xác nhận' : 'Hoàn tất'}
                </StyledButton>
            </Grid>
            <Grid item xs = {2}/>
        </Grid>

        <Dialog
            open = {this.state.openPrintDialog}
        >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', marginLeft: 50, marginRight: 50}}>
                <StyledButton variant = 'contained' color = 'secondary' onClick = {() => this.setState({openPrintDialog: false})}>Hủy</StyledButton>
                <ReactToPrint
                    trigger={() => (<StyledButton>In</StyledButton>)}
                    content={() => this.componentRef}
                />
            </div>
            <div ref={ref => this.componentRef = ref}>
                <div style={{ backgroundColor: '#00695c', textAlign: 'center', height: 80, color: 'white', display: 'flex', flexDirection: 'column' , margin: 5}}>
                    <div>Thông tin đơn hàng</div>
                    <div>Số: {this.props.SaleOrder.no}</div>
                    <div style = {{fontStyle: 'italic', fontSize: '0.8rem'}}>Ngày: {this.props.SaleOrder.createdAt.split('T')[0]}</div>
                </div>
                <div style = {{marginLeft: 20, fontWeight: 'bold', color: '#212121'}}>Thông tin chung</div>
                <div style = {{margin: 20, marginTop: 5, border: '1px solid green', borderRadius: 3, display: 'flex', flexDirection: 'row', fontSize: '14px'}}>
                    <Grid item xs = {6} style = {{padding: 10, display: 'flex', flexDirection: 'column', lineHeight: 2}}>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Tên khách hàng:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.customer_id.name}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Số điện thoại:
                            </Grid>
                            <Grid item xs = {8}>
                            {SaleOrder.customer_id.phone_number}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Địa chỉ email:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.customer_id.email}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Giới tính:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.customer_id.gender == 'male' ? 'Nam' : SaleOrder.customer_id.gender == 'female' ? 'Nữ' : 'Không xác định'}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Địa chỉ:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.customer_id.address}
                            </Grid>
                        </div>               
                    </Grid>

                    <Grid item xs = {6} style = {{paddingLeft: 10, paddingBottom: 10, display: 'flex', flexDirection: 'column', lineHeight: 2, borderLeft: '1px solid green'}}>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4} style = {{ marginTop: 10}}>
                                Hình thức giao hàng:
                            </Grid>
                            <Grid item xs = {6} style = {{ marginTop: 10}}>
                                {ShipmentType.filter(type => type.value == SaleOrder.shipment_type)[0].caption}
                            </Grid>
                            <Grid item xs = {2} style = {{height:30, backgroundColor:  this.props.SaleOrder.status == 'New' ? 'green' : this.props.SaleOrder.Status == 'Confirmed' ? 'blue' : 'gray', borderBottomLeftRadius: 8, textAlign: 'center', color: 'white', fontWeight:'bold'}}>
                                {SaleOrderStatus.filter(p => p.value == this.props.SaleOrder.status)[0].caption}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Hình thức thanh toán:
                            </Grid>
                            <Grid item xs = {8}>
                                {PaymentType.filter(type => type.value == SaleOrder.payment_type)[0].caption}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Người nhận:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.receiver_name}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Số điện thoại người nhận:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.receiver_phone_number}
                            </Grid>
                        </div>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs = {4}>
                                Địa chỉ nhận hàng:
                            </Grid>
                            <Grid item xs = {8}>
                                {SaleOrder.shipment_address}
                            </Grid>
                        </div>
                        
                    </Grid>
                </div>
                <div style = {{marginLeft: 20, fontWeight: 'bold', color: '#212121'}}>Danh sách sản phẩm</div>
                <div style = {{margin:20, marginTop: 5, border:'1px solid green', borderRadius: 3,  paddingLeft:10, paddingRight:10, fontSize:'0.8rem'}}>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                        <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Hình ảnh</Grid>
                        <Grid item xs = {4} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Tên sản phẩm</Grid>
                        <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Đơn giá</Grid>
                        <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575'}}>Số lượng</Grid>
                        <Grid item xs = {2} style = {{textAlign: 'center'}}>Thành tiền</Grid>
                    </div>
                    <hr style = {{margin: 2, color: 'red'}}></hr>
                    {SaleOrder.items.map((item, index) => (
                        <div style = {{display: 'flex', flexDirection: 'row', backgroundColor: index % 2 == 0 ? '#e0e0e0' : 'white'}}>                  
                            <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575', display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                                <img style={{ width: 50, height: 50 }} src={`data:image/png;base64,${item.product_id.subImage}`} />
                            </Grid>
                            <Grid item xs = {4} style = {{textAlign: 'center', borderRight:'1px dotted #757575',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                                {item.product_id.name}
                            </Grid>
                            <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                                {(parseFloat(item.sale_price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                            </Grid>
                            <Grid item xs = {2} style = {{textAlign: 'center', borderRight:'1px dotted #757575', display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center'}}>
                                {item.qty}
                            </Grid>
                            <Grid item xs = {2} style = {{textAlign: 'center',display: 'flex',flexGrow:1, alignItems: 'center', justifyContent:'center', justifyContent:'center' }}>
                                {(item.sale_price * item.qty).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                            </Grid>
                        </div> 
                        ))}
                    
                        <hr style = {{margin: 2, color:'red'}}></hr>
                        <div style = {{display: 'flex', flexDirection: 'row', padding: 5, fontWeight: 'bold'}}>
                            <Grid item xs = {8}></Grid>
                            <Grid item xs = {4} style = {{ display:'flex', flexDirection: 'column'}}>
                                <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Grid item xs = {6}>Tổng thành tiền</Grid>
                                    <Grid item xs = {6}  style = {{textAlign: 'center'}}>{SaleOrder.sub_total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                                </div>   
                                <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Grid item xs = {4} style = {{textAlign: 'left'}}>Chiết khấu</Grid>
                                    <Grid item xs = {2} style = {{textAlign: 'center'}}>{SaleOrder.discount}%</Grid>
                                    <Grid item xs = {6} style = {{textAlign: 'center'}}>{(SaleOrder.discount * SaleOrder.sub_total_amount/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                                </div>    
                                <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Grid item xs = {6}  style = {{textAlign: 'left', borderLeft: 10}}>Đã thanh toán</Grid>
                                    <Grid item xs = {6}  style = {{textAlign: 'center'}}>{SaleOrder.paid_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                                </div>   
                                <div  style = {{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Grid item xs = {6}  style = {{textAlign: 'left'}}>Còn lại</Grid>
                                    <Grid item xs = {6}  style = {{textAlign: 'center'}}>{(SaleOrder.total_amount - SaleOrder.paid_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                                </div>    
                            </Grid>
                        </div>
                </div>           
            </div>
        </Dialog>
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    token: state.LoginReducer.token,
    SaleOrder: state.SaleOrderReducer.SaleOrder,
    role: state.LoginReducer.role
  }
}

const mapDispatch2Props = (dispatch) => {
  return {
    loadSaleOrderDetail: (token, id) => {
        return dispatch({type:'LOAD_SALE_ORDER_DETAIL', token: token, payload: id})
    },
    goToNextState: (token, id) => {
        console.log('WHY ?????????')
        return dispatch({type:'NEXT_STATE_SALE_ORDER', token: token, payload: id})
    },
    showProduct: (id) => {
        return dispatch({type:'HANDLE_SHOW_PRODUCT_DETAIL', payload: id})
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(SaleOrderDetail);
