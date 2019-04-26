import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

export class ProductDetail extends Component {
  render() {
    return (
      <div>
        Product Detail
        <button>About</button>
      </div>
    )
  }
}

export default withRouter(ProductDetail)
