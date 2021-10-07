import React from "react"
import { DisplayProvider } from "./src/context/display-context"
import Layout from "./src/components/layout/layout"

export const wrapRootElement = ({ element }) => {
  return <DisplayProvider>{element}</DisplayProvider>
}

export const wrapPageElement = ({ element, props }) => {
  const location = props.location

  return <Layout location={location}>{element}</Layout>
}
