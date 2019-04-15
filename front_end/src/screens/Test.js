import React, { Component } from 'react'
import LoginDialog from '../components/LoginDialog'

export class Text extends Component {
  render() {
    return (
      <div>
        ABC
        <LoginDialog
            open = {true}
        />
      </div>
    )
  }
}

export default Text
