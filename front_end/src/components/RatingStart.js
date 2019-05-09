import React, { Component } from 'react';
import Rating from 'material-ui-rating';
import { withStyles } from '@material-ui/core/styles'

const ratingStyle = {
    iconButton: {
      width: 15,
      height: 15,
      padding: 10
    },
    icon: {
      width: 10,
      height: 10
    }
  };
  
  class MyRate extends Component{
    render(){
        const {classes} = this.props
      return (
        <Rating
          max = {this.props.max}
          value = {this.props.value}
          onChange = {this.props.onChange}
          classes = {classes}
        />
      )
    }
  }

  export default withStyles(ratingStyle)(MyRate)