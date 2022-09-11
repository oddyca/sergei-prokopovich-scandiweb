import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.product["gallery"][0],
            attributes: {}
        }

        this.imgStyle = {}
        this.selectAttribute = this.selectAttribute.bind(this)
        this.isSelected = this.isSelected.bind(this)
    };

    selectAttribute = (attributeGroup, attributeValue) => {
        this.setState((state) => ({...state, attributes: {...state.attributes, [attributeGroup]: [attributeValue, "active"]}}))
    }

    isSelected = (attributeId, attributeValue) => {
        let check = Object.keys(this.state.attributes).some((attributeGroup) => attributeGroup === attributeId && this.state.attributes[attributeGroup][0] === attributeValue)
        return check
    } // checks if the attribute is already selected

    componentDidMount() {
        this.props.category('')
    }

    render() {
        let product = this.props.product
        let currency = this.props.currency
        return (
            <div className = "product-page">
                <div className = "product-page-img">
                    <div className = "img-selector">
                        {product["gallery"].map((x) => {
                            return (
                                <div style = {{backgroundImage: 'url(' + x + ')'}} onClick = {() => this.setState({picture: x})}></div>
                            )
                        })}
                    </div>
                    <div className = "main-img" style = {{backgroundImage: 'url(' + this.state.picture + ')'}}></div>
                </div>
                <div className = "product-page-info">
                    <p className = "pp-brand"><strong>{product.brand}</strong></p>
                    <p className = "pp-title">{product.name}</p>
                    <div className = 'pp-attribute-selection'>
                        {product["attributes"].map((attr) => 
                        <>
                        <p>{attr.id}</p>
                        <div className = {attr.id === "Color" ? "pp-color-selector" : "pp-attribute-selector"}>{attr.items.map((val) => 
                            <button onClick = {() => this.selectAttribute(attr.id, val.value)} 
                                className = {attr.id === 'Color' && this.isSelected(attr.id, val.value) 
                                    ? 'pp-color-block active' 
                                        : attr.id === 'Color' && !this.isSelected(attr.id, val.value) 
                                    ? 'pp-color-block' 
                                        : attr.id !== 'Color' && this.isSelected(attr.id, val.value) 
                                    ? 'pp-attribute-block active'
                                        : 'pp-attribute-block'} 
                                style = {attr.id === 'Color' ? {backgroundColor: val.value, border: 'none' } : {}} id = {val.value}>{attr.id !== 'Color' ? val.value : ''}</button>)}
                        </div>
                        </>
                        )}
                    </div>
                    <p className = "pp-price"><strong>{product["prices"].map((x) => x['currency']["symbol"] === currency ? `${x['currency']['symbol']}${x['amount']}` : '')}</strong></p>
                        {!product.inStock 
                        ? <button id = "pp-out-of-stock" disabled>OUT OF STOCK</button>
                            : product["attributes"].length === Object.keys(this.state.attributes).length
                        ? <button id = "pp-add-button" onClick = {() => {
                                this.props.addFromProduct({...product, ...this.state.attributes, quantity: 1})
                            }}>ADD TO CART</button>
                            : <button id = "pp-add-button" disabled style = {{backgroundColor: "lightgrey"}}>ADD TO CART</button>}
                    <div className = "pp-description" dangerouslySetInnerHTML={{__html: product.description}}></div>
                </div>
            </div>
        )
    }
}
