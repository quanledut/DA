import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../assets/styles/Sale1.css'


export class Sale1 extends Component {
    render() {
        return (
            <div className = 'sale-container'>
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
