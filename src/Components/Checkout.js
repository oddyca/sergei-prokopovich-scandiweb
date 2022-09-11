import React, { Component } from 'react'
import './Checkout.css'

export class Checkout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {Object.keys(this.props.checkOut).map ((x) => {
          return (
            <div>
              <p>{this.props.checkOut[x].name}</p>
              <p></p>
            </div>
          )
        })}
      </div>
    )
  }
}
