import React, { Component } from 'react';
import './App.css';
import { Header } from './Components/Header.js';
import { ProductsGrid } from './Components/ProductsGrid.js';
import { Clothes } from './Components/Clothes.js';
import { Tech } from './Components/Tech.js'
import { Checkout } from './Components/Checkout.js'
import { Bag } from './Components/Bag.js'
import { Product } from './Components/Product.js'
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: 'all',
      selectedCurrency: '$',
      numberOfItems: 0,
      selectedItems: [],
      countTotal: 0,
      pickedProduct: {},
      pickedAttributes: {}
    }

    this.setCurrency = this.setCurrency.bind(this)
    this.setItemCount = this.setItemCount.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.countTotal = this.countTotal.bind(this)
    this.pickedProduct = this.pickedProduct.bind(this)
    this.pickedAttributes = this.pickedAttributes.bind(this)
    this.receiveAttributesFromBag = this.receiveAttributesFromBag.bind(this)
    this.setCategoryTitle = this.setCategoryTitle.bind(this)
  }


  setCurrency = (data) => {
    return this.setState({...this.state, selectedCurrency: data}) // receives data on currency from Header & giving it to ProductsGrid via props

  }

  setItemCount = (data) => {
    return this.setState((state) => ({...state, selectedItems: [...data]}))
  }

  handleSelect = (data) => {

    if (this.state.selectedItems.length >= 1) {
      
      for (let item = 0; item < this.state.selectedItems.length; item++) {
        
        if (this.state.selectedItems[item]["id"] === data["id"]) { // if received item is already in the cart
          let foundProduct = this.state.selectedItems[item]
          let allAttributes = foundProduct["attributes"] // array with objects
          let attributesCheck = []

          for (let i = 0; i < allAttributes.length; i++) {
            let id = allAttributes[i]["id"] // finds the attribute object in the received item ("product")
                if (foundProduct[id][0] === data[id][0]) {
                  attributesCheck.push('true')
                } else {
                  attributesCheck.push('false')
                }
          }

          if (attributesCheck.every((attr) => attr === 'true')) { 
            // if all attributes match
            // copies state.selectedItems arrays in order to replace the indexed one with quantity property + 1
            let copiedSelectedItems = [...this.state.selectedItems]
            copiedSelectedItems[item] = {...data, quantity: copiedSelectedItems[item]["quantity"] + 1}
            this.setState((state) => ({...state, selectedItems: [...copiedSelectedItems]}))
            break; // if all attributes match, we break the for loop in order to stop the iteration throught the cart
          } else {
            this.setState((state) => ({...state, selectedItems: [...state.selectedItems, {...data}]}))
          }
      } else if (this.state.selectedItems[item]["id"] !== data["id"] && !this.state.selectedItems.find((o) => o["id"] === data["id"])) {
        this.setState((state) => ({...state, selectedItems: [...state.selectedItems, {...data}]}  ))
      }

      }
    } else {
      this.setState((state) => ({...state, selectedItems: [...state.selectedItems, {...data}]}))
    }
  }

  countTotal = (data) => {
    // counts total amount of items in the bag
    return this.setState((state) => ({...state, total: state.total + data}))
  }

  pickedProduct = (data) => {
    // picked product from listing page
    return this.setState((state) => ({...state, pickedProduct: {...data}}))
  }

  pickedAttributes = (data) => {
    // receives picked attributes in order to sen the data to Header Component
    return this.setState((state) => ({...state, pickedAttributes: {...data}}))
  }

  receiveAttributesFromBag = (index, attributes) => {
    // receives picked attributes on product's page
    let copiedItems = [...this.state.selectedItems]
    copiedItems[index] = {...copiedItems[index], ...attributes}
    this.setState((state) => ({...state, selectedItems: [...copiedItems]}))
  }

  setCategoryTitle = (data) => {
    this.setState((state) => ({...state, categoryName: data}))
  }
    
  render() {
  
    return (
      <div className = "App">
        <div id = "overlay"></div>
        <Header 
          attributes = {this.state.pickedAttributes} 
          itemsTotal = {this.setItemCount} 
          currency = {this.setCurrency} 
          currencyToCart = {this.state.selectedCurrency} 
          itemsToCart = {this.state.selectedItems} 
          total = {this.state.countTotal}/> 
        
        <p className = "category-title">{this.state.categoryName}</p>
        <Routes>
          <Route path = '/' element = 
            {<ProductsGrid 
              defaultAttributes = {this.pickedAttributes} 
              currency = {this.state.selectedCurrency} 
              itemCount = {this.setItemCount} 
              gridSelectedItems = {this.handleSelect} 
              count = {this.countTotal} 
              pick = {this.pickedProduct}
              category = {this.setCategoryTitle}/>}/>
          <Route path = '/clothes' element = 
            {<Clothes
              defaultAttributes = {this.pickedAttributes} 
              currency = {this.state.selectedCurrency} 
              itemCount = {this.setItemCount} 
              clothesSelectedItems = {this.handleSelect} 
              count = {this.countTotal}
              pick = {this.pickedProduct}
              category = {this.setCategoryTitle}/>}/>
          <Route path = '/tech' element = 
            {<Tech 
              currency = {this.state.selectedCurrency} 
              itemCount = {this.setItemCount} 
              techSelectedItems = {this.handleSelect} 
              count = {this.countTotal}
              category = {this.setCategoryTitle}/>}/>
          <Route path = '/check-out' element = 
            {<Checkout 
              currency = {this.state.selectedCurrency} 
              checkOut = {this.state.selectedItems} 
              itemCount = {this.setItemCount} 
              count = {this.countTotal}
              category = {this.setCategoryTitle}/>}/>
          <Route path = '/bag' element = 
            {<Bag 
              attributesFromBag = {this.receiveAttributesFromBag} 
              currency = {this.state.selectedCurrency} 
              bag = {this.state.selectedItems} 
              itemCount = {this.setItemCount} 
              count = {this.countTotal}
              category = {this.setCategoryTitle}/>}/>
          <Route path = '/product/:id' element = 
            {<Product 
            pickAttributes = {this.pickedAttributes} 
            addFromProduct = {this.handleSelect} 
            currency = {this.state.selectedCurrency} 
            isInCart = {this.state.selectedItems} 
            product = {this.state.pickedProduct}
            category = {this.setCategoryTitle}/>}/>
        </Routes>
      </div>
    )
  }
}

