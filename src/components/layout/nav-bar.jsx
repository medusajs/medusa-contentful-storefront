import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Link from "../link"
import DisplayContext from "../../context/display-context"
import StoreContext from "../../context/store-context"
import { quantity, sum } from "../../utils/helper-functions"
import { BiShoppingBag } from "react-icons/bi"
import * as styles from "../../styles/nav-bar.module.css"

const NavBar = ({ isCheckout }) => {
  const { updateCartViewDisplay } = useContext(DisplayContext)
  const { cart } = useContext(StoreContext)

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      logo: contentfulAsset(title: { eq: "Logo" }) {
        id
        file {
          url
        }
      }
      nav: contentfulNavigationMenu(title: { eq: "Main" }) {
        items {
          id
          title
          link {
            linkTo
            reference {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <div className={styles.container}>
      <Link to="/">
        <img alt="Medusa Logo" src={data.logo.file.url} />
      </Link>
      {!isCheckout && (
        <div className={styles.mainNav}>
          {data.nav.items.map((item) => {
            return (
              <Link key={item.id} className={styles.navItem} link={item.link}>
                {item.title}
              </Link>
            )
          })}
        </div>
      )}
      {!isCheckout ? (
        <button className={styles.btn} onClick={() => updateCartViewDisplay()}>
          <BiShoppingBag />{" "}
          <span>
            {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
          </span>
        </button>
      ) : null}
    </div>
  )
}

export default NavBar
