import React from "react"
import { graphql } from "gatsby"

import Product from "../../views/product"

const ProductPage = ({ data }) => {
  return <Product product={data.product} />
}

export default ProductPage

export const query = graphql`
  query ($id: String!) {
    product: contentfulProduct(id: { eq: $id }) {
      medusaId
      title
      options {
        id
        title
      }
      thumbnail {
        gatsbyImageData
      }
      description {
        id
        description
      }
      variants {
        title
        medusaId
        prices {
          currency_code
          amount
        }
        options {
          option_id
          value
        }
      }
    }
  }
`
