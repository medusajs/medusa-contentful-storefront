import React from "react"

import * as styles from "../../styles/tile-section.module.css"
import Tile from "./tile"

const TileSection = ({ data }) => {
  return (
    <div className={styles.tileSection}>
      <h3>{data.title}</h3>
      <div className={styles.tileWrapper}>
        {data.tiles?.map((tile) => (
          <Tile key={tile.id} data={tile} />
        ))}
      </div>
    </div>
  )
}

export default TileSection
