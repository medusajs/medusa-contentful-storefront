import zeroDecimalCurrencies from "./zero-decimal-currencies"

export const quantity = (item) => {
  return item.quantity
}

export const sum = (prev, next) => {
  return prev + next
}

export const formatPrice = (price, currency) => {
  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return `${price} ${currency.toUpperCase()}`
  }

  return `${(price / 100).toFixed(2)} ${currency.toUpperCase()}`
}

export const getSlug = (path) => {
  const tmp = path.split("/")
  return tmp[tmp.length - 1]
}

export const resetOptions = (product) => {
  const variantId = product.variants.slice(0).reverse()[0].medusaId
  const size = product.variants.slice(0).reverse()[0].title
  return {
    variantId: variantId,
    quantity: 1,
    size: size,
  }
}
