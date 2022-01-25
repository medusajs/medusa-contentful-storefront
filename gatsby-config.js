require("dotenv").config()

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || ""
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || ""

module.exports = {
  siteMetadata: {
    title: "Store",
    titleTemplate: "%s | Medusa Contentful Store",
    description:
      "Getting you up an running with a powerful headless ecommerce site in no time",
    url: "https://www.medusa-commerce.com",
    image: "/images/banner.jpg",
    twitterUsername: "@medusajs",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
