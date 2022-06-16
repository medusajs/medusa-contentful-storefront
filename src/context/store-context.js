import React, { useEffect, useReducer, useRef } from "react"

import { createClient } from "../utils/client"

export const defaultStoreContext = {
  adding: false,
  cart: {
    items: [],
  },
  order: {},
  products: [],
  currencyCode: "eur",
  /**
   *
   * @param {*} variantId
   * @param {*} quantity
   * @returns
   */
  addVariantToCart: async () => {},
  createCart: async () => {},
  removeLineItem: async () => {},
  updateLineItem: async () => {},
  setShippingMethod: async () => {},
  updateAddress: async () => {},
  createPaymentSession: async () => {},
  completeCart: async () => {},
  retrieveOrder: async () => {},
  dispatch: () => {},
}

const StoreContext = React.createContext(defaultStoreContext)
export default StoreContext

const reducer = (state, action) => {
  switch (action.type) {
    case "setCart":
      return {
        ...state,
        cart: action.payload,
        currencyCode: action.payload.region.currency_code,
      }
    case "setOrder":
      return {
        ...state,
        order: action.payload,
      }
    case "setProducts":
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}

const client = createClient()

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStoreContext)
  const stateCartId = useRef()

  useEffect(() => {
    stateCartId.current = state.cart.id
  }, [state.cart])

  useEffect(() => {
    let cartId
    if (localStorage) {
      cartId = localStorage.getItem("cart_id")
    }

    if (cartId) {
      client.carts.retrieve(cartId).then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
      })
    } else {
      client.carts.create({}).then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
        if (localStorage) {
          localStorage.setItem("cart_id", cart.id)
        }
      })
    }

    client.products.list().then(({ products }) => {
      dispatch({ type: "setProducts", payload: products })
    })
  }, [])

  const createCart = () => {
    if (localStorage) {
      localStorage.removeItem("cart_id")
    }
    client.carts.create({}).then(({ cart }) => {
      dispatch({ type: "setCart", payload: cart })
    })
  }

  const setPaymentSession = async (provider) => {
    client.carts
      .setPaymentSession(state.cart.id, {
        provider_id: provider,
      })
      .then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
        return cart
      })
  }

  const addVariantToCart = async ({ variantId, quantity }) => {
    client.carts.lineItems
      .create(state.cart.id, {
        variant_id: variantId,
        quantity: quantity,
      })
      .then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
      })
  }

  const removeLineItem = async (lineId) => {
    client.carts.lineItems.delete(state.cart.id, lineId).then(({ cart }) => {
      dispatch({ type: "setCart", payload: cart })
    })
  }

  const updateLineItem = async ({ lineId, quantity }) => {
    client.carts.lineItems
      .update(state.cart.id, lineId, { quantity: quantity })
      .then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
      })
  }

  const getShippingOptions = async () => {
    const shipping_options = await client.shippingOptions
      .list()
      .then(({ shipping_options }) => shipping_options)

    if (shipping_options) {
      return shipping_options
    } else {
      return undefined
    }
  }

  const setShippingMethod = async (id) => {
    return await client.carts
      .addShippingMethod(state.cart.id, {
        option_id: id,
      })
      .then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
        return cart
      })
  }

  const createPaymentSession = async () => {
    return await client.carts
      .createPaymentSessions(state.cart.id)
      .then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
        return cart
      })
  }

  const completeCart = async () => {
    const data = await client.carts
      .complete(state.cart.id)
      .then(({ data }) => data)

    if (data) {
      return data
    } else {
      return undefined
    }
  }

  const retrieveOrder = async (orderId) => {
    const order = await client.orders.retrieve(orderId).then(({ order }) => order)

    if (order) {
      return order
    } else {
      return undefined
    }
  }

  const updateAddress = (address, email) => {
    client.carts
      .update(state.cart.id, {
        shipping_address: address,
        billing_address: address,
        email: email,
      })
      .then(({ cart }) => {
        dispatch({ type: "setCart", payload: cart })
      })
  }

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addVariantToCart,
        createCart,
        removeLineItem,
        updateLineItem,
        getShippingOptions,
        setShippingMethod,
        setPaymentSession,
        createPaymentSession,
        updateAddress,
        completeCart,
        retrieveOrder,
        dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
