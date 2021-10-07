import React from "react"
import { DisplayProvider } from "./src/context/display-context"
import { StoreProvider } from "./src/context/store-context"
import Layout from "./src/components/layout/layout"

export const wrapRootElement = ({ element }) => {
  return (
    <StoreProvider>
      <DisplayProvider>{element}</DisplayProvider>
    </StoreProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  const location = props.location

  return <Layout location={location}>{element}</Layout>
}
