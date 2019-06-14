import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../assets/styles/Sale1.css';
import add_icon from '../data/add_icon.png'


export class Sale1 extends Component {
    render() {
        return (
            <div className = 'sale-container'>
                <div className = 'content'>
                    <div className = 'title'>
                        TOP KHUYẾN MÃI NỔI BẬT
                        <img className = 'add-btn' src = {add_icon}/>
                    </div>
                </div>
                ABC
            </div>
        )
    }
}

const mapState2Props = (state) => {
    return {
        role: state.LoginReducer.role,
    }
} 

const mapDispatch2Props = (dispatch) => {
    return{

    }
}

export default connect(mapState2Props, mapDispatch2Props)(Sale1)
