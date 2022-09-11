import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clicked: false
        }
        this.showMiniCart = this.showMiniCart.bind(this)
        this.countTotal = this.countTotal.bind(this)
        this.isAttributeSelected = this.isAttributeSelected.bind(this)

        this.selectedItemsObj = {...this.props.addToCart}
        this.quantity = 0
        this.total = () => {
          let price = document.querySelector('.mini-cart-price').innerHTML
          return price
        }


    }
        
    countTotal = () => {
      let values = Object.values(this.selectedItemsObj)
      let filtered = values.filter((x) => x[0]["amount"])
      return filtered
    }

    showMiniCart = () => {
      this.setState((state) => ({...state, clicked: !state.clicked}), () => {
        if (this.state.clicked ){
          document.getElementById('overlay').addEventListener('wheel', (e) => e.preventDefault(), {passive: false})
          //document.querySelector('.App').addEventListener('wheel', (e) => e.preventDefault(), {passive: false})
          document.getElementById('overlay').style.visibility = 'visible'  
        } else {
          //document.getElementById('overlay').removeEventListener('wheel', (e) => e.preventDefault())
          document.getElementById('overlay').style.visibility = 'hidden'
        }
      })
      
    }

    isAttributeSelected = (attributeId, attributeValue) => {
      let check = Object.keys(this.props.receivedAttributes).some((attributeGroup) => attributeGroup === attributeId && this.props.receivedAttributes[attributeGroup] === attributeValue)
      return check
    } // checks if the attribute is already selected
  


  render() {
    let addedItems = this.props.addToCart
    let currencyId = addedItems.length > 0 ? addedItems[0]['prices'].findIndex((x) => this.props.cartCurrency === x['currency']['symbol']) : 0 // index of selected currency
    let itemsCount = Object.keys(addedItems).reduce((sum, elem) => {return sum += addedItems[elem]["quantity"]}, 0)
    return (
      <>
        <div id = "cart-icon" onClick = {this.showMiniCart}>
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z" fill="#43464E"/>
            <path d="M8.44437 13.9816C7.2443 13.9816 6.25488 14.9279 6.25488 16.0754C6.25488 17.2228 7.24439 18.1691 8.44437 18.1691C9.64445 18.1698 10.6339 17.2236 10.6339 16.076C10.6339 14.9283 9.64436 13.9814 8.44437 13.9814V13.9816ZM8.44437 16.9013C7.9599 16.9013 7.58071 16.5387 7.58071 16.0754C7.58071 15.6122 7.9599 15.2495 8.44437 15.2495C8.92885 15.2495 9.30804 15.6122 9.30804 16.0754C9.30722 16.519 8.90748 16.9013 8.44437 16.9013Z" fill="#43464E"/>
            <path d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z" fill="#43464E"/>
          </svg>
          <div style = {Object.keys(addedItems).length > 0 ? {visibility: "visible"} : {visibility: "hidden"}}>
            {
            itemsCount <= 9 
              ? itemsCount 
                : itemsCount > 9 
              ? '9+'
                : ''  
          }</div>
        </div>
        <div id = 'mini-cart' className = {this.state.clicked ? '' : 'show-cart'}>
        {
          Object.keys(addedItems).length === 0 ? <p className = 'minicart-empty'>The cart is empty</p> : 
            <>
                <p id = "bag-title"><strong>My Bag,</strong> {Object.keys(addedItems).length} items</p>
                {Object.keys(addedItems).map((obj) => { //obj - indexes of objects in our "products" array
                    return (
                      
                      <div className = "mini-cart-items">
                        <div className = "mini-cart-card">
                          <div className = "mini-cart-info">
                            <p className = "mini-cart-title">{addedItems[obj].name}</p>
                            <p className = "mini-cart-price"><strong>{
                              addedItems[obj]["prices"][currencyId]["currency"].symbol
                            }{addedItems[obj]["prices"][currencyId]['amount']}</strong>
                            </p>
                              {addedItems[obj]["attributes"].map((attr) => 
                                <div className = {attr.id === 'Color' ? 'mini-cart-color-selector' : 'mini-cart-attributes'}>
                                  <p>{attr.name}</p>
                                  <div className = {`attribute-selector`}>{attr.items.map((val) => 
                                    <div
                                      key = {val.value} 
                                      value = {val.id} 
                                      className = {attr.id === 'Color' && addedItems[obj][attr.id].includes('active') && addedItems[obj][attr.id].includes(val.value) //checks if attribute's value matches the value in the attribute object of an added item and if the array has element "active" 
                                        ? 'color-block active' 
                                          : attr.id === 'Color' && !addedItems[obj][attr.id].includes(val.value) 
                                        ? 'color-block' 
                                          : attr.id !== 'Color' && addedItems[obj][attr.id].includes('active') && addedItems[obj][attr.id].includes(val.value)
                                        ? 'attribute-block active'
                                          : 'attribute-block'}  
                                      style = {attr.id === 'Color' ? {backgroundColor: val.value } : {}}>{attr.id !== 'Color' ? val.value : ''}
                                    </div>)}
                                  </div>
                                </div>
                              )}
                              
                          </div>
                          <div className = "mini-cart-quantity">
                            <button className = "increase" onClick = {() => {
                              let copy = [...addedItems]
                              copy[obj] = {...copy[obj], quantity: copy[obj]["quantity"] + 1}
                              this.props.countItems(copy)
                            }}>+</button>
                            <p>{addedItems[obj]["quantity"]}</p>
                            <button className = "decrease" onClick = {() => {
                              let copy = [...addedItems]
                              copy[obj] = {...copy[obj], quantity: copy[obj]["quantity"] > 0 ? copy[obj]["quantity"] - 1 : 0}
                              this.props.countItems(copy)
                            }}>-</button>
                          </div>
                          <div className = "mini-cart-images" style = {{backgroundImage: 'url(' + addedItems[obj]["gallery"][0] + ')'}}>
                          </div>
                        </div>
                      </div>
                    )
                  
                })
                
                }
              <div className='mini-cart-total'> 
                <p><strong>Total:</strong></p>
                <p><strong>{this.props.cartCurrency}{
                  Object.keys(addedItems).reduce((sum, elem) => {
                    sum += (addedItems[elem]["prices"][currencyId]["amount"] * addedItems[elem]['quantity'])
                    return Math.round(sum  * 100) / 100
                  }, 0)
                }</strong>
                </p>
              </div> 
            </>
          }
          <div id = "buttons">
            { Object.keys(addedItems).length > 0 ?
            <>  
              <Link to = '/bag' className = "mini-cart-buttons" id = "mc-button-to-cart" onClick = {() => this.clicked = false}>VIEW BAG</Link>
              <Link to = '/check-out' className = "mini-cart-buttons" id = "mc-button-checkout" onClick = {() => this.clicked = false}>CHECK OUT</Link>
            </>
            : <></>
            }
          </div>
        </div>
      </>
    )
  }
}


/*this.props.cartCurrency */