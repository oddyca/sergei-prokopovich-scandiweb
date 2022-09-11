import { VariablesInAllowedPositionRule } from 'graphql';
import React, { Component } from 'react';
import './Bag.css'

export class Bag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      total: 0,
      attributes: {},
      pictureScroll: 0
    }
    this.quantity = 0;
    this.total = 0;
    this.tax = 0
  }

  selectBagAttribute = (itemIndex, attributeGroup, attributeValue) => {
    this.setState((state) => ({...state, attributes: {...state.attributes, [attributeGroup]: [attributeValue, "active"]}}), () => this.props.attributesFromBag(itemIndex, this.state.attributes))
}

  componentDidMount() {
    this.props.category('')
  }
  render() {
    let bag = this.props.bag

    // index of selected currency
    let currency = bag[0]['prices'].findIndex((x) => this.props.currency === x['currency']['symbol']) 
    
    // total sum of prices
    let totalResult = Object.keys(bag).reduce((sum, elem) => {
      sum += (bag[elem]["prices"][currency]["amount"] * bag[elem]['quantity'])
      return Math.round(sum  * 100) / 100
   }, 0)
   
   // total quantity of items in the bag
   let totalQuantity = Object.keys(bag).reduce((sum, elem) => {
    return sum += bag[elem]["quantity"]
    }, 0)

    bag.reduce((sum, elem) => {
      return this.tax = (sum += (elem["prices"][currency]["amount"] * elem['quantity']))
   }, 0)
    return (
      <div className = 'bag'>
        <h1>CART</h1>
        {
        Object.keys(bag).map((product) => {
          return (
            <>
            <hr />
            <div className = 'bag-product'>
              <div className = "bag-product-info">
                <p>{bag[product].brand}</p>
                <p>{bag[product].name}</p>
                <div className = 'bag-attributes'>
                  {bag[product]["attributes"].map((attr) =>
                    <>
                      <p>{attr.id}:</p>
                      <div className = {attr.id === 'Color' ? 'bag-color-selector' : 'bag-attribute-selector'}>{attr.items.map((val) => 
                        <button
                          onClick = {() => {
                            this.selectBagAttribute(product, attr.id, val.value)
                            return }}
                          key = {val.value} 
                          value = {val.id} 
                          className = {attr.id === 'Color' && bag[product][attr.id].includes('active') && bag[product][attr.id].includes(val.value) //checks if attribute's value matches the value in the attribute object of an added item and if the array has element "active" 
                            ? 'bag-color-block active' 
                              : attr.id === 'Color' && !bag[product][attr.id].includes(val.value) 
                            ? 'bag-color-block' 
                              : attr.id !== 'Color' && bag[product][attr.id].includes('active') && bag[product][attr.id].includes(val.value)
                            ? 'bag-attribute-block active'
                              : 'bag-attribute-block'}  
                          style = {attr.id === 'Color' ? {backgroundColor: val.value } : {}}>{attr.id !== 'Color' ? val.value : ''}
                        </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div> 
              <div className = 'bag-img-amount'>
                <div className = "bag-amount">
                  <div className = 'bag-increase' onClick = {() => {
                    let copy = [...bag]
                    copy[product] = {...bag[product], quantity: bag[product]["quantity"] + 1}
                    this.props.itemCount(copy)
                    }}>+</div>
                  <p>{bag[product]["quantity"]}</p>
                  <div className = 'bag-decrease' onClick = {() => {
                    let copy = [...bag]
                    copy[product] = {...copy[product], quantity: copy[product]["quantity"] > 0 ? copy[product]["quantity"] - 1 : 0}
                    this.props.itemCount(copy)
                    }}>—</div>
                </div>
                <div className = "bag-img" style = {{backgroundImage: 'url(' + bag[product]["gallery"][this.state.pictureScroll] + ')'}}></div>
                <div className = "bag-img-scroll">
                  <button className = 'bag-scroll-left' onClick = {() =>
                    this.state.pictureScroll === 0 ? this.setState((state) => ({...state, pictureScroll: bag[product]["gallery"].length - 1}))
                    : this.setState((state) => ({...state, pictureScroll: state.pictureScroll - 1}))
                    }>{'<'}</button>
                  <button className = 'bag-scroll-right' onClick = {() =>
                    this.state.pictureScroll > bag[product]["gallery"].length ? this.setState((state) => ({...state, pictureScroll: 0}))
                    : this.setState((state) => ({...state, pictureScroll: state.pictureScroll + 1}))
                    }>{'>'}</button>
                </div>
              </div>
          </div>
              
            
          </>
          )
          })
        }
        <hr/>
        <div className = 'bag-calc'>
          <p className = "bag-calc-tax">Tax 21%:</p>
          <p className = "bag-calc-tax-result">
            {this.props.currency}{Math.round(this.tax * 0.21 * 100) / 100}
            </p>
          <p className = "bag-calc-qt">Quantity:</p>
          <p className = "bag-calc-qt-result">{totalQuantity}
          </p>
          <p className = "bag-calc-total">Total:</p>
          <p className = "bag-calc-total-result">{this.props.currency}{totalResult}
          </p>
          <button className = "bag-order">ORDER</button>
        </div>
        
      </div>
    )
  }
}
