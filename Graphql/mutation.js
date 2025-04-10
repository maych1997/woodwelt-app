import {gql} from '@apollo/client';

export const REGISTER_CUSTOMER = gql`
  mutation REGISTER_CUSTOMER(
    $email: String!
    $password: String!
    $username: String!
  ) {
    registerCustomer(
      input: {email: $email, password: $password, username: $username}
    ) {
      customer {
        username
        email
      }
    }
  }
`;
export const UPDATE_CUSTOMER = gql`
  mutation UPDATE_CUSTOMER(
    $displayName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    updateCustomer(
      input: {
        displayName: $displayName
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      customer {
        username
        email
        firstName
        lastName
        displayName
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART($productId: Int!, $quantity: Int!) {
    addToCart(input: {productId: $productId, quantity: $quantity}) {
      cart {
        subtotal
        shippingTax
        subtotalTax
        shippingTotal
        displayPricesIncludeTax
        discountTax
        discountTotal
        total
        totalTax
        totalTaxes {
          id
          label
          isCompound
          amount
        }
        contents {
          itemCount
          productCount
          nodes {
            key
            product {
              node {
                name
                id
                image {
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation REMOVE_FROM_CART($keys: [ID]!) {
    removeItemsFromCart(input: {keys: $keys}) {
      cart {
        subtotal
        shippingTax
        subtotalTax
        shippingTotal
        displayPricesIncludeTax
        discountTax
        discountTotal
        total
        totalTax
        totalTaxes {
          id
          label
          isCompound
          amount
        }
        contents {
          itemCount
          productCount
          nodes {
            product {
              node {
                name
                id
                image {
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UPDATE_CART($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: {items: {key: $key, quantity: $quantity}}) {
      updated {
        product {
          node {
            name
            id
            image {
              uri
            }
          }
        }
      }
      cart {
        subtotal
        shippingTax
        subtotalTax
        shippingTotal
        displayPricesIncludeTax
        discountTax
        discountTotal
        total
        totalTax
        totalTaxes {
          id
          label
          isCompound
          amount
        }
        contents {
          itemCount
          productCount
          nodes {
            key
            product {
              node {
                name
                id
                image {
                  uri
                }
              }
            }
            quantity
            total
          }
        }
      }
    }
  }
`;

export const UPDATE_CUSTOMER_BILLING = gql`
  mutation UPDATE_CUSTOMER_ADDRESS_BILLING(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $postCode: String!
    $address1: String!
    $address2: String
    $state: String!
    $city: String!
    $country: CountriesEnum!
  ) {
    updateCustomer(
      input: {
        billing: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          postcode: $postCode
          city: $city
          address1: $address1
          address2: $address2
          state: $state
          country: $country
        }
      }
    ) {
      customer {
        firstName
      }
    }
  }
`;
export const UPDATE_CUSTOMER_SHIPPING = gql`
  mutation UPDATE_CUSTOMER_ADDRESS_SHIPPING(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $postCode: String!
    $address1: String!
    $address2: String
    $state: String!
    $city: String!
    $country: CountriesEnum!
  ) {
    updateCustomer(
      input: {
        shipping: {
          firstName: $firstName
          lastName: $lastName
          phone: $phone
          postcode: $postCode
          city: $city
          address1: $address1
          address2: $address2
          state: $state
          country: $country
        }
      }
    ) {
      customer {
        firstName
      }
    }
  }
`;
