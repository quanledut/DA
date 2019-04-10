import React, { Component } from 'react';
import {TextField , SelectField, MenuItem} from 'material-ui';
import Axios from 'axios';
import ProductGridView from '../components/ProductGridView';
 
export class ProductShow extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '12139360-3ed8cea9be791129340f6026f', 
        images: [],
    }

    onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            Axios.get(`${this.state.apiUrl}\?key=${this.state.apiKey}&q=${this.state.searchText}
                &image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => {
                    this.setState({images: res.data.hits})
                })
                .catch(err => console.log(err));
        });
        console.log(this.state);
    }

    changeAmount = (e, index, value) => {
        this.setState({ amount:value })
    }

    render() {
        
        return (
        <div>
            <TextField
                fullWidth = {true}
                onChange = {this.onChangeText}
                floatingLabelText = 'Search Product'
                value = {this.state.searchText}
                name = 'searchText'
                type = 'text'
                style = {{width: 350, left: 100}}
            />
            <br/>
            <SelectField
                name = 'amount'
                floatingLabelText = 'Amount'
                value = {this.state.amount}
                onChange = {this.changeAmount}
            >
                <MenuItem primaryText = '10' value = {10}/>
                <MenuItem primaryText = '20' value = {20}/>
                <MenuItem primaryText = '40' value = {40}/>
            </SelectField>
            <ProductGridView images = {this.state.images} cols = {4}/>
        </div>
        )
    }
}

export default ProductShow
