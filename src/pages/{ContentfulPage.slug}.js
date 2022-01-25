import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Hero from "../components/hero/hero"
import TileSection from "../components/tile-section/tile-section"
import * as styles from "../styles/home.module.css"

// markup
const Page = ({ data }) => {
  return (
    <div className={styles.container}>
      <SEO
        title={data.page.title}
        description={data.page.metaDescription?.metaDescription}
      />
      <main className={styles.main}>
        {data.page.contentModules.map((cm) => {
          switch (cm.internal.type) {
            case "ContentfulHero":
              return <Hero key={cm.id} data={cm} />
            case "ContentfulTileSection":
              return <TileSection key={cm.id} data={cm} />
            default:
              return null
          }
        })}
      </main>
    </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      title
      metaDescription {
        metaDescription
      }
      contentModules {
        ... on ContentfulHero {
          id
          backgroundImage {
            gatsbyImageData
          }
          title
          cta
          link {
            linkTo
            reference {
              slug
            }
          }
          internal {
            type
          }
        }
        ... on ContentfulTileSection {
          id
          title
          tiles {
            ... on ContentfulProduct {
              id
              title
              handle
              thumbnail {
                gatsbyImageData
              }
              internal {
                type
              }
            }
            ... on ContentfulTile {
              id
              title
              cta
              image {
                gatsbyImageData
              }
              link {
                linkTo
                reference {
                  slug
                }
              }
              internal {
                type
              }
            }
          }
          internal {
            type
          }
        }
      }
    }
  }
`

export default Page
