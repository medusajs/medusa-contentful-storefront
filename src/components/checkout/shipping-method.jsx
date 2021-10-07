import React from "react"
import * as styles from "../../styles/shipping-method.module.css"
import { formatPrice } from "../../utils/helper-functions"

const ShippingMethod = ({ handleOption, option, chosen }) => {
  return (
    <button
      className={`${styles.shippingOption} ${
        option.id === chosen?.id ? styles.chosen : ""
      }`}
      onClick={() => handleOption(option)}
    >
      <p>{option.name}</p>
      <p>{formatPrice(option.amount, "EUR")}</p>
    </button>
  )
}

export default ShippingMethod
