import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import * as styles from "../../styles/rich-text.module.css"

const RichText = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data.body ? renderRichText(data.body) : ""}
      </div>
    </div>
  )
}

export default RichText
