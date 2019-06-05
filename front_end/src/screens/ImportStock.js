import React, { Component } from 'react';
import '../assets/styles/ImportStock.css';
import {connect} from 'react-redux';
import ProductSelectAutoComplete from '../components/ProductSelectAutoComplete';
import {StyledButton, GreenButton} from '../components/Components';
import {AddCircleOutline} from '@material-ui/icons';
import {Grid} from '@material-ui/core';
import {DeleteForever} from '@material-ui/icons';

export class ImportStock extends Component {
    constructor(props){
        super(props);
        this.state = {
            import_name:'',
            supplier_name: '',
            openNewProductDialog: false,
            product_list:[],
            currentSelectProduct:{}
        }
    }

    onChangeSelect = (product) => {
        if(product){
            this.setState({currentSelectProduct: this.props.list_all_product.filter(item => item.name == product.value)[0]})
        }
        else {
            this.setState({currentSelectProduct:null})
        }
        
    }

    componentDidMount(){
        this.props.loadAllProductList();
    }

    onChangeText = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    addProductToList = () => {
        if(this.state.currentSelectProduct){
            if(this.state.product_list.filter(item => item.name == this.state.currentSelectProduct.name).length > 0){
                this.setState({product_list: this.state.product_list.map(item => {
                    if(item.name == this.state.currentSelectProduct.name) item.qty = item.qty + 1;
                    return item;
                })})
            }
            else {
                this.setState({product_list: [...this.state.product_list,{...this.state.currentSelectProduct, qty:1}]})
            }
        }
    }

    decreaseItemQty = (name) => {
        this.setState({product_list: this.state.product_list.map(item => {
            if(item.name == name) {
                item.qty = parseFloat(item.qty) > 0 ? parseFloat(item.qty) - 1 : 0 ; 
            }
            return item;
        })})
    }

    increaseItemQty = (name) => {
        this.setState({product_list: this.state.product_list.map(item => {
            if(item.name == name) {
                item.qty = item.qty + 1; 
            }
            return item;
        })})
    }
  
    updateItemQty = (name, event) => {
        this.setState({product_list: this.state.product_list.map(item => {
            if(item.name == name){
                if(event.target.value == ''){
                    item.qty = '';
                }
                else{
                    item.qty = parseFloat(event.target.value) ? parseFloat(event.target.value) : item.qty; 
                }
            }
            return item;
        })})
    }

    deleteProductFromList = (name) => {
        this.setState({product_list:this.state.product_list.filter(item => item.name != name)})
    }

    onChangeUnitPrice = (name, event) => {
        this.setState({product_list: this.state.product_list.map(item => {
            if(item.name == name) {
                if(event.target.value == ''){
                    item.unitprice = ''
                }
                else {
                    item.unitprice = parseFloat(event.target.value) ? parseFloat(event.target.value) : item.unitprice;
                }
            }
            return item;
        })})
    }

    importInventoryStock = () => {
        let data = {
            description: this.state.import_name,
            supplier_name: this.state.supplier_name,
            items: this.state.product_list
        }
        this.props.completeImportStock(this.props.token, data);
    }
    
    render() {
        let {import_name, supplier_name, openNewProductDialog,product_list, currentSelectProduct} = this.state;
        let {list_all_product} = this.props;
        return (
            <div className = 'import_container'>
                <div className = 'container_border'>
                    <div className = 'page_title'>
                        Nhập kho
                    </div>
                    <div className = 'field_input'>
                        <div className = 'desctiption_area'>
                            <div>Tên nhập kho</div>
                            <input name = 'import_name' type = 'text' value = {import_name} onChange = {this.onChangeText}/>
                        </div>
                        <div className = 'supplier_area'>
                            <div>Nhà cung cấp </div>
                            <input name = 'supplier_name' type = 'text' value = {supplier_name} onChange = {this.onChangeText}/>
                        </div>
                        <div className = 'choose_product_area'>
                            <p>Chọn sản phẩm</p>
                            <div className = 'select_product'>
                                <ProductSelectAutoComplete
                                style = {{height:50}}
                                suggestions={list_all_product.map(product => { return { value: product.name, label: product.name } })}
                                onChangeSelect={this.onChangeSelect}
                                />
                            </div>
                            <GreenButton className = 'add_to_list' onClick = {this.addProductToList}>Thêm</GreenButton>
                            <AddCircleOutline className = 'add_btn' onClick = {() => {this.props.showAddProduct()}}/>
                        </div>
                        <div className = 'list_product_title'>
                            Danh sách sản phẩm
                        </div>
                        <div className = 'list_product'>
                            <Grid item xs = {12} className = 'title'>
                                <Grid className = 'column_title' item xs = {1}>STT</Grid>
                                <Grid className = 'column_title' item xs = {1}>Mã sản phẩm</Grid>
                                <Grid className = 'column_title' item xs = {4}>Tên sản phẩm</Grid>
                                <Grid className = 'column_title' item xs = {1}>Số lượng</Grid>
                                <Grid className = 'column_title' item xs = {2}>Giá nhập</Grid>
                                <Grid className = 'column_title' item xs = {2}>Tổng cộng</Grid>
                                <Grid className = 'column_title' item xs = {1}>Xóa</Grid>
                            </Grid>
                            {product_list.map((item, index) => (
                                <div style = {{width:'100%'}}>
                                    <Grid item xs = {12} className = 'list_item_product'>
                                        <Grid className = 'column_item index' item xs = {1}>{index + 1}</Grid>
                                        <Grid className = 'column_item' item xs = {1}>{item.no}</Grid>
                                        <Grid className = 'column_item name' item xs = {4}>
                                            <a >{item.name.toUpperCase()}</a>
                                        </Grid>
                                        <Grid className = 'column_item qty' item xs = {1}>
                                            <div className = 'qty_area'>
                                                <div 
                                                    onClick = {() => {this.decreaseItemQty(item.name)}}
                                                    style = {{width:35, height:24, display: 'flex', justifyContent:'center', alignItems: 'center', border: '1px solid #999', borderTopLeftRadius: 3, borderBottomLeftRadius:3}}
                                                >
                                                    -
                                                </div>
                                                <input 
                                                    value = {item.qty} 
                                                    onChange={(event) => {this.updateItemQty(item.name, event)}}
                                                    style = {{width:30, height:24, display: 'flex', justifyContent:'center', alignItems: 'center', border: '1px solid #999', textAlign:'center', fontWeight: 'bold'}}
                                                />
                                                <div 
                                                    onClick = {() => {this.increaseItemQty(item.name)}} 
                                                    style = {{width:35, height:24, display: 'flex', justifyContent:'center', alignItems: 'center', border: '1px solid #999',  borderTopRightRadius: 3, borderBottomRightRadius:3}}
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid className = 'column_item price' item xs = {2}>
                                            <input value = {item.unitprice} onChange = {(event) => {this.onChangeUnitPrice(item.name, event)}}/> 
                                        </Grid>
                                        <Grid className = 'column_title' item xs = {2}>{(item.unitprice * item.qty || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                                        <Grid className = 'column_item del' item xs = {1}><DeleteForever onClick = {() => this.deleteProductFromList(item.name)}/></Grid>
                                    </Grid>
                                    <hr style = {{margin:3}}/>
                                </div>
                            ))}
                        </div>
                        <Grid item xs = {12} className = 'total_products'>
                            <Grid className = 'column_total' item xs = {1}></Grid>
                            <Grid className = 'column_total' item xs = {1}></Grid>
                            <Grid className = 'column_total label' item xs = {4}>Tổng cộng</Grid>
                            <Grid className = 'column_total total_qty' item xs = {1}>{product_list.reduce((total, item) => {return total + (item.qty == '' ? 0 : item.qty)},0)}</Grid>
                            <Grid className = 'column_total' item xs = {2}></Grid>
                            <Grid className = 'column_total total_' item xs = {2}>{product_list.reduce((total, item) => {return total + (item.qty * item.unitprice || 0)},0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Grid>
                            <Grid className = 'column_total' item xs = {1}></Grid>
                        </Grid>
                    </div>
                    <div className = 'button_area'>
                        <StyledButton onClick = {this.importInventoryStock}> HOÀN TẤT</StyledButton>
                    </div>
                </div>               
            </div>
        )
    }
}

const mapState2Props = (state) => {
    return {
        role: state.LoginReducer.role, 
        list_all_product: state.ProductReducer.list_all_product,
        token: state.LoginReducer.token
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        loadAllProductList: () => {
            dispatch({type:'LOAD_ALL_PRODUCT'})
        },
        showAddProduct: () => {
            dispatch({type:'SCREEN_ROUTER', payload:'/product/new'})
        },
        completeImportStock: (token, data) => {
            dispatch({type:'IMPORT_INVENTORY_STOCK', token:token, payload: data})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(ImportStock)
