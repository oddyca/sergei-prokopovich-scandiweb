import React, { Component } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GET_PRODUCTS, GET_CATEGORIES } from '../gql/Query.js';
import { Query } from '@apollo/client/react/components';
import { Currency } from './Currency.js';
import { Cart } from './Cart.js'
import './Header.css';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.getCurrency = this.getCurrency.bind(this);
    }

    getCurrency = (childData) => {
        return this.props.currency(childData) //pushing data on selected currency to App.js (from there to ProductGrid.js)
    }

    handleIsClicked(data) {
        return this.props.isCartClicked(data)
    }

    render() {
      return (
        <div className = "header">
            <div className = "categories-menu">
                <nav>
                <div id = "categories">
                    
                    <Query query={GET_CATEGORIES}>
                    {
                        ({ error, loading, data }) => {
                            if (error) console.log('something went wrong');
                            if (loading) console.log('loading...');
                            if (data) {
                                return data["categories"].map((elem) => {return (
                                <NavLink 
                                    to = { elem.name === 'all' 
                                        ? '/' 
                                            : elem.name === 'clothes' 
                                        ? '/clothes' 
                                            : '/tech' } 
                                    key = {elem.name} 
                                    className = "navbar">{elem.name.toUpperCase()}
                                </NavLink>)}) 
                            }
                        }
                    }
                    </Query>
                    
                </div>
                </nav>
            </div>
            <div className = "logo"><img alt = "logo" src = {require('./logo.png')} /></div>
            <div className = "currency-cart">
                <div id = "currency">
                    <Currency toParent = {this.getCurrency} />
                    
                </div>
                <div id = "cart">
                <Cart 
                    receivedAttributes = {this.props.attributes} 
                    isClicked = {this.handleIsClicked} 
                    addToCart = {this.props.itemsToCart} 
                    cartCurrency = {this.props.currencyToCart} 
                    cartTotal = {this.props.total} 
                    countItems = {this.props.itemsTotal}/>
                </div>
            </div>
        </div>
      )
    }
  }