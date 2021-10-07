import React, { useCallback, useEffect, useState, useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BiShoppingBag } from "react-icons/bi"

import SEO from "../components/seo"
import StoreContext from "../context/store-context"
import { formatPrice, resetOptions } from "../utils/helper-functions"
import { createClient } from "../utils/client"
import * as styles from "../styles/product.module.css"

const Product = ({ product }) => {
  const { cart, addVariantToCart } = useContext(StoreContext)
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  })

  const [productStatus, setProductStatus] = useState(undefined)
  const client = createClient()

  useEffect(() => {
    const getProduct = async () => {
      const response = await client.products.retrieve(product.medusaId)
      setProductStatus(response.data.product)
    }

    getProduct()
  }, [product.medusaId])

  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product))
    }
  }, [product])

  const handleQtyChange = (action) => {
    if (action === "inc") {
      if (
        options.quantity <
        productStatus.variants.find(({ id }) => id === options.variantId)
          .inventory_quantity
      )
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity + 1,
          size: options.size,
        })
    }
    if (action === "dec") {
      if (options.quantity > 1)
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity - 1,
          size: options.size,
        })
    }
  }

  const handleAddToBag = () => {
    addVariantToCart({
      variantId: options.variantId,
      quantity: options.quantity,
    })
    if (product) setOptions(resetOptions(product))
  }

  const renderPrice = useCallback(
    (variant) => {
      if (!cart.id) return
      if (!variant) return

      const region = cart.region
      const currency = region.currency_code

      const price = variant.prices.find(
        (ma) => ma.currency_code.toLowerCase() === currency.toLowerCase()
      )
      return formatPrice(price.amount, price.currency_code)
    },
    [cart]
  )

  return (
    <div className={styles.container}>
      <SEO
        title={product.title}
        description={product.description?.description}
      />
      <div className={styles.controls}>
        <figure className={styles.image}>
          <div className={styles.placeholder}>
            <GatsbyImage
              style={{ maxHeight: "500px" }}
              imgStyle={{ margin: "0 auto", maxHeight: "500px", width: "auto" }}
              alt={product.title}
              image={getImage(product.thumbnail)}
            />
          </div>
        </figure>
        <div className={styles.info}>
          <span />
          <div>
            <div className="title">
              <h1>{product.title}</h1>
            </div>
            <p className="price">
              {renderPrice(
                product.variants.find((v) => v.medusaId === options.variantId)
              )}
            </p>
            <div className={styles.selection}>
              <p>Select Size</p>
              <div className="selectors">
                {product.variants
                  .slice(0)
                  .reverse()
                  .map((v) => {
                    return (
                      <button
                        key={v.medusaId}
                        className={`${styles.sizebtn} ${
                          v.title === options.size ? styles.selected : null
                        }`}
                        onClick={() =>
                          setOptions({
                            variantId: v.medusaId,
                            quantity: options.quantity,
                            size: v.title,
                          })
                        }
                      >
                        {v.title}
                      </button>
                    )
                  })}
              </div>
            </div>
            <div className={styles.selection}>
              <p>Select Quantity</p>
              <div className={styles.qty}>
                <button
                  className={styles.qtybtn}
                  onClick={() => handleQtyChange("dec")}
                >
                  -
                </button>
                <span className={styles.ticker}>{options.quantity}</span>
                <button
                  className={styles.qtybtn}
                  onClick={() => handleQtyChange("inc")}
                >
                  +
                </button>
              </div>
            </div>
            <button className={styles.addbtn} onClick={() => handleAddToBag()}>
              <span>Add to bag</span>
              <BiShoppingBag />
            </button>
            <div className={styles.tabs}>
              <div className="tab-titles">
                <button className={styles.tabtitle}>Product Description</button>
              </div>
              <div className="tab-content">
                <p>{product.description?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
