import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
    query {
        categories {
          name
        }
      }
`;

export const GET_PRODUCTS = gql `
query {
    categories {
      products {
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes {
          id,
          name,
          type,
          items {
            displayValue,
            value,
            id
          }
        },
        prices {
          currency {
            label,
            symbol
          },
          amount
        },
        brand
      }
    }
  }
`

export const GET_CURRENCY = gql `
  query {
    currencies {
      label,
      symbol
    }
  }
`