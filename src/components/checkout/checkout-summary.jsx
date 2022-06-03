import * as itemStyles from "../../styles/cart-view.module.css"
import * as styles from "../../styles/checkout-summary.module.css"

import React, { useContext } from "react"
import { quantity, sum } from "../../utils/helper-functions"

import DisplayContext from "../../context/display-context"
import { Link } from "gatsby"
import { PuffLoader } from "react-spinners"
import { formatPrice } from "../../utils/helper-functions"

const CheckoutSummary = ({ cart }) => {
  const { orderSummary, updateOrderSummaryDisplay } = useContext(DisplayContext)
  return cart ? (
    <div className={`${styles.container} ${orderSummary ? styles.active : ""}`}>
      <div className={itemStyles.top}>
        <p>
          <strong>Order Summary</strong>
        </p>
        <p>
          {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}{" "}
          {cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
            ? "item"
            : "items"}
        </p>
        <button
          className={styles.closeBtn}
          onClick={() => updateOrderSummaryDisplay()}
        >
          X
        </button>
      </div>
      <div className={itemStyles.overview}>
        {cart.items
          .sort((a, b) => {
            const createdAtA = new Date(a.created_at),
              createdAtB = new Date(b.created_at)

            if (createdAtA < createdAtB) return -1
            if (createdAtA > createdAtB) return 1
            return 0
          })
          .map((i) => {
            return (
              <div key={i.id} className={itemStyles.product}>
                <figure>
                  <Link to={`/product/${i.variant.product.id}`}>
                    <img src={i.thumbnail} alt={i.title} />
                    <div className={itemStyles.placeholder} />
                  </Link>
                </figure>
                <div className={itemStyles.controls}>
                  <div>
                    <div>
                      <Link to={`/product/${i.variant.product.id}`}>
                        {i.title}
                      </Link>
                      <p className={itemStyles.size}>Size: {i.variant.title}</p>
                      <p className={itemStyles.size}>
                        Price:{" "}
                        {formatPrice(i.unit_price, cart.region.currency_code)}
                      </p>
                      <p className={itemStyles.size}>Quantity: {i.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className={styles.breakdown}>
        <p>Subtotal (incl. taxes)</p>
        <span>
          {cart.region
            ? formatPrice(cart.subtotal, cart.region.currency_code)
            : 0}
        </span>
      </div>
      <div className={styles.breakdown}>
        <p>Shipping</p>
        <span>
          {cart.region
            ? formatPrice(cart.shipping_total, cart.region.currency_code)
            : 0}
        </span>
      </div>
      <div className={styles.total}>
        <p>Total</p>
        <span>
          {cart.region ? formatPrice(cart.total, cart.region.currency_code) : 0}
        </span>
      </div>
    </div>
  ) : (
    <div className={styles.spinnerContainer}>
      <PuffLoader />
    </div>
  )
}

export default CheckoutSummary
