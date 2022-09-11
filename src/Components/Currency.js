import React from 'react'
import { Query } from '@apollo/client/react/components';
import { GET_CURRENCY } from '../gql/Query';

export class Currency extends React.Component {

    tellCurrency = () => {
        let currentCurrency = document.getElementById("symbol")
        return this.props.toParent(currentCurrency.options[currentCurrency.selectedIndex].text) //gives data on selected currency to Header.js
    }

    render() {

        return (
            <Query query={GET_CURRENCY}>
                {
                    ({ error, loading, data }) => {
                    if (error) console.log('something went wrong');
                    if (loading) console.log('loading...');
                    if (data) {
                    
                    // iterating in case new currency is added or removed
                    let currencyId = 0;
                    
                    return (<div>
                    <select id = "symbol" onChange = {this.tellCurrency}>
                        {data["currencies"].map((elem) => {
                            currencyId++;
                            return <option key = {`option-${currencyId}`} id = {`option-${currencyId}`}>{elem.symbol}</option>
                        })}
                    </select>
                    </div>)
                    }}
                }
            </Query>
        )
    }
}