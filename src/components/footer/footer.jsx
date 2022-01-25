import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import * as styles from "../../styles/footer.module.css"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      nav: contentfulNavigationMenu(title: { eq: "Footer" }) {
        items {
          id
          title
          link {
            linkTo
          }
        }
      }
    }
  `)

  return (
    <div className={styles.container}>
      {data.nav.items.map((ni) => {
        return (
          <a key={ni.id} className={styles.navItem} href={ni.link.linkTo}>
            {ni.title}
          </a>
        )
      })}
    </div>
  )
}

export default Footer
