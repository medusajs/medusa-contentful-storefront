import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Link from "../link"
import * as styles from "../../styles/tile-section.module.css"

const Tile = ({ data }) => {
  let title = data.title
  let cta = data.cta
  let img = data.image

  if (data.internal.type === "ContentfulProduct") {
    title = data.title
    img = data.thumbnail
  }

  return (
    <Link
      link={data.link}
      to={data.handle ? `/product/${data.handle}` : null}
      className={styles.tile}
    >
      <GatsbyImage alt={title} image={getImage(img)} />
      <div className={styles.tileBody}>
        <h4 className={"tile-title"}>{title}</h4>
        {cta}
      </div>
    </Link>
  )
}

export default Tile
