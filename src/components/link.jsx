import React from "react"
import { Link as GLink } from "gatsby"

const Link = ({ link, to, children, ...rest }) => {
  link = link || {}
  let linkTo = to || link.linkTo

  if (link.reference) {
    linkTo = link.reference.slug || link.reference.handle
  }

  const internal = /^\/(?!\/)/.test(linkTo)

  if (internal) {
    return (
      <GLink to={linkTo} {...rest}>
        {children}
      </GLink>
    )
  }

  return (
    <a {...rest} href={linkTo}>
      {children}
    </a>
  )
}

export default Link
