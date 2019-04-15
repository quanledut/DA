import React, { Component } from 'react'
import FilterLink from '../components/FilterLink'
import { Button } from '@material-ui/core';
export class About extends Component {
  render() {
    return (
      <div>
        <FilterLink
            filter = '/'
            children = {(<Button>ABC</Button>)}
        >
        </FilterLink>
      </div>
    )
}
}
