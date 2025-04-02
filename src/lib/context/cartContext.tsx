"use client"
// contexts/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react"
import { StoreCart } from "@medusajs/types"
import {
  addToCart,
  deleteLineItem,
  updateLineItem,
  retrieveCart,
} from "@lib/data/cart"
type variantInfo = {
  variantId: string
  quantity: number
  countryCode: string
}
interface CartContextType {
  cart: StoreCart | null
  setCart: (cart: StoreCart | null) => void
  getCart: () => Promise<StoreCart | null>
  addVariant: (variantInfo: variantInfo) => Promise<void>
  removeVariant: (lineId: string) => Promise<void>
  updateVariantInfo: (params: {
    lineId: string
    quantity: number
  }) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cart, setCart] = useState<StoreCart | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart()
        setCart(cartData)
      } catch (error) {
        console.error("Failed to fetch cart:", error)
      }
    }

    fetchCart()
  }, []) // 空依赖数组表示只在组件挂载时执行一次

  const addVariant = async (variantInfo: variantInfo) => {
    const cartData = await addToCart(variantInfo)
    // setCart(cartData)
  }

  const removeVariant = async (lineId: string) => {
    const cartData = await deleteLineItem(lineId)
    // setCart(cartData)
  }

  const updateVariantInfo = async ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    const cartData = await updateLineItem({ lineId, quantity })
    // setCart(cartData)
  }

  const getCart = async () => {
    const cartData = await retrieveCart()
    console.log("getCart", cartData)
    setCart(cartData)
    return cartData
  }

  const value = useMemo(
    () => ({
      cart,
      setCart,
      getCart,
      addVariant,
      removeVariant,
      updateVariantInfo,
    }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
