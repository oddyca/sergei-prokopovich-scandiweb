import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { GET_PRODUCTS, GET_CATEGORIES } from '../gql/Query.js';
import './ProductsGrid.css';


export class Tech extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount() {
    this.props.category('TECH')
  }
  
  render() {
    return (
      <div className = "grid">
        <Query query={GET_PRODUCTS}>
          {
              ({ error, loading, data }) => {
              if (error) console.log('something went wrong');
              if (loading) console.log('loading...');
              if (data) if (data) {
                //this.copiedData = data
                return data['categories'][0]['products'].map((elem) => { // elem - objects in 'products' array in our database
                  if (elem["category"] === "tech") {
                  let productAttributes = elem["attributes"] //array with objects
                  const generateDefaultAttributes = (attributesArray) => {
                    let attributes = {}
                    for (let i = 0; i < attributesArray.length; i++) {
                      // itterates through existing attributes and creates an object where
                      // key = attribute.name
                      // value = attribute's first value
                      // for them to be selected as default attributes when adding an item to cart from listing page
                      attributes[`${attributesArray[i]['id']}`] = [`${attributesArray[i]["items"][0]["value"]}`, "active"]
                    }
                    return attributes
                  }

                  return (
                    <div key = {elem.id} className = "cards" id = {elem.id} 
                      onMouseEnter = {(e) => {document.getElementById(e.currentTarget.id).querySelector('.add-button').classList.remove('toggle')}} 
                      onMouseLeave = {(e) => {document.getElementById(e.currentTarget.id).querySelector('.add-button').classList.add('toggle')}}>
                      <button className = "add-button toggle" onClick = {() => {
                          const inStock = elem.inStock
                          if (inStock) {
                            // if it's in stock, we send the temporary cart through props to App.js to Cart.js
                            // with selected first attributes (by default)
                            this.props.techSelectedItems({...elem, quantity: 1, ...generateDefaultAttributes(productAttributes)})
                            this.props.defaultAttributes({...generateDefaultAttributes(productAttributes)}) // sends default attributes to select
                          }
                        }
                        }>
                        <svg className = "cart-image" filter = "invert(100%) sepia(5%) saturate(7485%) hue-rotate(227deg) brightness(200%) contrast(200%)" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z" fill="#43464E"/>
                            <path d="M8.44437 13.9816C7.2443 13.9816 6.25488 14.9279 6.25488 16.0754C6.25488 17.2228 7.24439 18.1691 8.44437 18.1691C9.64445 18.1698 10.6339 17.2236 10.6339 16.076C10.6339 14.9283 9.64436 13.9814 8.44437 13.9814V13.9816ZM8.44437 16.9013C7.9599 16.9013 7.58071 16.5387 7.58071 16.0754C7.58071 15.6122 7.9599 15.2495 8.44437 15.2495C8.92885 15.2495 9.30804 15.6122 9.30804 16.0754C9.30722 16.519 8.90748 16.9013 8.44437 16.9013Z" fill="#43464E"/>
                            <path d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z" fill="#43464E"/>
                          </svg>
                      </button>
                      {elem.inStock === true
                        ? <Link to = {`/product/${elem.id}`} onClick = {() => this.props.pick(elem)}><div style = {{backgroundImage: 'url(' + elem["gallery"][0] + ')'}}></div> </Link>
                        : <Link to = {`/product/${elem.id}`} onClick = {() => this.props.pick(elem)} className = "out-of-stock-link"><div className = "out-of-stock" style = {{backgroundImage: 'url(' + elem["gallery"][0] + ')'}}></div></Link>}
                      <h3>{elem.name}</h3>
                      <p className = 'price-tag'>
                        {elem["prices"].map((x) => x["currency"].symbol === this.props.currency ? `${x["currency"].symbol}${x["amount"]}` : '')}
                      </p>
                    </div>
                )
              }}) 
              }
              }
          }
        </Query>
      </div>
    )
  }
}