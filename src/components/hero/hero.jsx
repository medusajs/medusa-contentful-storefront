import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Link from "../link"
import * as styles from "../../styles/hero.module.css"

const Hero = ({ data }) => {
  return (
    <div className={styles.hero}>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <GatsbyImage
          alt={data.title}
          style={{ width: "100%", height: "100%" }}
          imgStyle={{ width: "100%", height: "100%" }}
          objectFit="cover"
          image={getImage(data.backgroundImage)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{data.title}</h2>
          <Link link={data.link} className={styles.button}>
            {data.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Hero
