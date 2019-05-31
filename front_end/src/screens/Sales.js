import React, { Component } from 'react';
import {connect} from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
import sale from '../data/images/sale.png'

export class Sales extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          index: 0,
          direction: null,
        };
      }

      componentDidMount(){
        this.props.loadDiscountProduct();
      }
    
      handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction,
        });
      }
    
      render() {
        const { index, direction } = this.state;
        const {top_product_discount, top_product_sale} = this.props;
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
          };
        return (
            <div style = {{width:'100%'}}>
                {top_product_discount && 
                <div>
                    <div>TOP SẢN PHẨM GIẢM GIÁ</div>
                    <div style = {{width:'100%'}}>
                        <Carousel
                            activeIndex={index}
                            direction={direction}
                            onSelect={this.handleSelect}
                        >
                            {top_product_discount.map(product => (
                                <Carousel.Item>
                                    <div style = {{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow:'hidden', height:400}}>
                                        <img 
                                            style = {{ height:400}}
                                            className="d-block w-100"
                                            src={`data:image/png;base64,${product.product.subImage}`}
                                            alt="First slide"
                                        />
                                    </div>
                                        <Carousel.Caption>
                                        <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width:'100%'}}>
                                            <div style = {{fontWeight:'bold', color:'red', fontSize:'3rem', marginRight:15, paddingTop:7, display:'flex', alignItems:'center', justifyContent: 'center'}}>{Math.round((product.product.saleprice[product.product.saleprice.length -1].value - product.product.saleprice[0].value)/ product.product.saleprice[0].value * 100)} %</div>
                                            <img src = {sale} style = {{height:60, width:60}}/> 
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>}

                {top_product_sale && 
                <div>
                    <div>TOP SẢN PHẨM BÁN CHẠY</div>
                    <div>
                        <Slider {...settings}>
                            {top_product_sale.map(product => (
                                <div style = {{height:400}} onClick = {() => this.props.showProduct(product.product_id[0]._id)}> 
                                    <img
                                        style = {{height:400}}
                                        src={`data:image/png;base64,${product.product_id[0].subImage}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>}
            </div>
        );
      }
}

const mapState2Props = (state) => {
    return {
        top_product_sale: state.SaleReducer.top_product_sale,
        top_product_discount: state.SaleReducer.top_product_discount
    }   
}

const mapDispatch2Props = (dispatch) => {
    return {
        loadDiscountProduct: () => {
            dispatch({type:'GET_TOP_DISCOUNT_PRODUCT'})
        },
        showProduct: (id) => {
            dispatch({type:'SCREEN_ROUTER', payload: `/products/${id}`})
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(Sales)
  
