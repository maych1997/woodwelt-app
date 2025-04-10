import {gql} from '@apollo/client';

export const PRODUCTS = gql`
  query GetProducts($category: String!, $productCount: Int!) {
    products(where: {category: $category}, first: $productCount) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      found
      nodes {
        type
        name
        ... on SimpleProduct {
          databaseId
          id
          sku
          name
          price(format: FORMATTED)
          regularPrice
          salePrice
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on SimpleProduct {
                databaseId
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              databaseId
              id
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                  label
                }
              }
              name
              image {
                link
              }
            }
          }
          attributes {
            nodes {
              options
              scope
              name
              visible
              label
              variation
            }
          }
          id
          sku
          name
          regularPrice
          salePrice
          price
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on VariableProduct {
                variations {
                  nodes {
                    databaseId
                    id
                    attributes {
                      nodes {
                        id
                        attributeId
                        name
                        value
                        label
                      }
                    }
                    name
                    image {
                      link
                    }
                  }
                }
                attributes {
                  nodes {
                    options
                    scope
                    name
                    visible
                    label
                    variation
                  }
                }
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FEATURED_PRODUCTS = gql`
  query GetProducts($productCount: Int!) {
    products(where: {featured: true}, first: $productCount) {
      found
      nodes {
        type
        name
        ... on SimpleProduct {
          databaseId
          id
          sku
          name
          price(format: FORMATTED)
          regularPrice
          salePrice
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on SimpleProduct {
                databaseId
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              databaseId
              id
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                  label
                }
              }
              name
              image {
                link
              }
            }
          }
          attributes {
            nodes {
              options
              scope
              name
              visible
              label
              variation
            }
          }
          id
          name
          regularPrice
          salePrice
          price
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on VariableProduct {
                variations {
                  nodes {
                    id
                    databaseId
                    attributes {
                      nodes {
                        id
                        attributeId
                        name
                        value
                        label
                      }
                    }
                    name
                    image {
                      link
                    }
                  }
                }
                attributes {
                  nodes {
                    options
                    scope
                    name
                    visible
                    label
                    variation
                  }
                }
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const LATEST_PRODUCTS = gql`
  query GetProducts($productCount: Int!) {
    products(first: $productCount) {
      found
      nodes {
        type
        name
        ... on SimpleProduct {
          databaseId
          id
          sku
          name
          price(format: FORMATTED)
          regularPrice
          salePrice
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on SimpleProduct {
                databaseId
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              id
              databaseId
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                  label
                }
              }
              name
              image {
                link
              }
            }
          }
          attributes {
            nodes {
              options
              scope
              name
              visible
              label
              variation
            }
          }
          id
          sku
          name
          regularPrice
          salePrice
          price
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on VariableProduct {
                variations {
                  nodes {
                    id
                    databaseId
                    attributes {
                      nodes {
                        id
                        attributeId
                        name
                        value
                        label
                      }
                    }
                    name
                    image {
                      link
                    }
                  }
                }
                attributes {
                  nodes {
                    options
                    scope
                    name
                    visible
                    label
                    variation
                  }
                }
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SALE_PRODUCTS = gql`
  query GetProducts($productCount: Int!) {
    products(where: {onSale: true}, first: $productCount) {
      found
      nodes {
        type
        name
        ... on SimpleProduct {
          databaseId
          id
          sku
          name
          price(format: FORMATTED)
          regularPrice
          salePrice
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on SimpleProduct {
                databaseId
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              databaseId
              id
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                  label
                }
              }
              name
              image {
                link
              }
            }
          }
          attributes {
            nodes {
              options
              scope
              name
              visible
              label
              variation
            }
          }
          id
          sku
          name
          regularPrice
          salePrice
          price
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on VariableProduct {
                variations {
                  nodes {
                    databaseId
                    id
                    attributes {
                      nodes {
                        id
                        attributeId
                        name
                        value
                        label
                      }
                    }
                    name
                    image {
                      link
                    }
                  }
                }
                attributes {
                  nodes {
                    options
                    scope
                    name
                    visible
                    label
                    variation
                  }
                }
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const NEW_PRODUCTS = gql`
  query GetProducts($productCount: Int!) {
    products(first: $productCount) {
      found
      nodes {
        type
        name
        ... on SimpleProduct {
          databaseId
          id
          sku
          name
          price(format: FORMATTED)
          regularPrice
          salePrice
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on SimpleProduct {
                databaseId
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              databaseId
              id
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                  label
                }
              }
              name
              image {
                link
              }
            }
          }
          attributes {
            nodes {
              options
              scope
              name
              visible
              label
              variation
            }
          }
          id
          sku
          name
          regularPrice
          salePrice
          price
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on VariableProduct {
                variations {
                  nodes {
                    databaseId
                    id
                    attributes {
                      nodes {
                        id
                        attributeId
                        name
                        value
                        label
                      }
                    }
                    name
                    image {
                      link
                    }
                  }
                }
                attributes {
                  nodes {
                    options
                    scope
                    name
                    visible
                    label
                    variation
                  }
                }
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query GetProducts($search: String!) {
    products(where: {search: $search}) {
      found
      nodes {
        type
        name
        ... on SimpleProduct {
          databaseId
          id
          sku
          name
          price(format: FORMATTED)
          regularPrice
          salePrice
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on SimpleProduct {
                databaseId
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              databaseId
              id
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                  label
                }
              }
              name
              image {
                link
              }
            }
          }
          attributes {
            nodes {
              options
              scope
              name
              visible
              label
              variation
            }
          }
          id
          sku
          name
          regularPrice
          salePrice
          price
          onSale
          description
          image {
            link
          }
          galleryImages(first: 100) {
            nodes {
              link
            }
          }
          related {
            nodes {
              ... on VariableProduct {
                variations {
                  nodes {
                    databaseId
                    id
                    attributes {
                      nodes {
                        id
                        attributeId
                        name
                        value
                        label
                      }
                    }
                    name
                    image {
                      link
                    }
                  }
                }
                attributes {
                  nodes {
                    options
                    scope
                    name
                    visible
                    label
                    variation
                  }
                }
                id
                sku
                name
                regularPrice
                salePrice
                price
                onSale
                description
                image {
                  link
                }
                galleryImages(first: 100) {
                  nodes {
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_CATEGORY = gql`
  {
    productCategories {
      nodes {
        id
        name
      }
    }
  }
`;

export const GET_CART = gql`
  {
    cart {
      contents {
        itemCount
        productCount
        nodes {
          key
          product {
            node {
              attributes {
                nodes {
                  options
                  scope
                  name
                  visible
                  label
                  variation
                }
              }
              galleryImages(first: 100) {
                nodes {
                  link
                }
              }
              type
              related {
                nodes {
                  ... on SimpleProduct {
                    databaseId
                    id
                    sku
                    name
                    regularPrice
                    salePrice
                    price
                    onSale
                    description
                    image {
                      link
                    }
                    galleryImages(first: 100) {
                      nodes {
                        link
                      }
                    }
                  }
                  ... on GroupProduct {
                    databaseId
                    id
                    sku
                    name
                    regularPrice
                    salePrice
                    price
                    onSale
                    description
                    image {
                      link
                    }
                    galleryImages(first: 100) {
                      nodes {
                        link
                      }
                    }
                  }
                  ... on VariableProduct {
                    databaseId
                    id
                    sku
                    name
                    regularPrice
                    salePrice
                    price
                    onSale
                    description
                    image {
                      link
                    }
                    galleryImages(first: 100) {
                      nodes {
                        link
                      }
                    }
                  }
                }
              }
              id
              description
              databaseId
              name
              image {
                sourceUrl
              }
            }
          }
          quantity
          total
        }
      }
      total
      subtotal
    }
  }
`;

export const GET_PROFILE_DETAILS = gql`
  query getCustomer {
    customer {
      availablePaymentMethods {
        id
        isDefault
        tokenId
        type
        gateway {
          description
          icon
          id
          title
        }
      }
      availablePaymentMethodsEC {
        id
        isDefault
        tokenId
        type
        gateway {
          description
          icon
          id
          title
        }
      }
      availablePaymentMethodsCC {
        id
        isDefault
        tokenId
        type
        gateway {
          description
          icon
          id
          title
        }
      }
      billing {
        state
        lastName
        firstName
        email
        country
        postcode
        city
        address1
        address2
        phone
        company
      }
      shipping {
        state
        lastName
        firstName
        email
        country
        postcode
        city
        address1
        address2
        phone
        company
      }
      id
      firstName
      lastName
      email
      username
      displayName
      isVatExempt
      refunds {
        nodes {
          amount
          title
        }
      }
      hasCalculatedShipping
      metaData {
        id
        value
      }
      orders(first: 10) {
        nodes {
          transactionId
          customer {
            firstName
            lastName
            email
          }
          lineItems {
            nodes {
              quantity
              subtotal
              total
              product {
                node {
                  name
                  image {
                    sourceUrl
                  }
                }
              }
            }
          }
          databaseId
          orderNumber
          orderKey
          customerIpAddress
          id
          total
          date
          status
        }
      }
    }
  }
`;

export const GET_PAYMENT_GATEWAYS = gql`
  {
    paymentGateways {
      nodes {
        id
        title
        icon
        description
      }
    }
  }
`;
