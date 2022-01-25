import React, { useContext } from "react"
import NavBar from "./nav-bar"
import Blur from "./blur"
import Footer from "../footer/footer"
import CartView from "../cart-view/cart-view"
import DisplayContext from "../../context/display-context"
import * as styles from "../../styles/layout.module.css"

import "../../styles/globals.css"

const Layout = ({ location, children }) => {
  const { cartView } = useContext(DisplayContext)
  const isCheckout =
    location.pathname === "/checkout" || location.pathname === "/payment"

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      className={cartView ? styles.noscroll : null}
    >
      <CartView />
      <Blur />
      <NavBar isCheckout={isCheckout} />
      <main style={{ flex: 1 }}>{children}</main>
      {!isCheckout && <Footer />}
    </div>
  )
}

export default Layout
