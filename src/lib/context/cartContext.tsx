"use client"
// contexts/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react"
import { StoreCart } from "@medusajs/types"
import {
  addToCart,
  deleteLineItem,
  updateLineItem,
  retrieveCart,
} from "@lib/data/cart"
import { usePathname } from "next/navigation"

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
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cart, setCart] = useState<StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true)
      const cartData = await retrieveCart()
      setCart(cartData)
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 组件挂载时初始化购物车
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  // 路由变化时刷新购物车数据
  useEffect(() => {
    if (pathname) {
      fetchCart()
    }
  }, [pathname, fetchCart])

  const addVariant = async (variantInfo: variantInfo) => {
    try {
      const updatedCart = await addToCart(variantInfo)
      setCart(updatedCart)
    } catch (error) {
      console.error("Failed to add variant:", error)
      await fetchCart()
    }
  }

  const removeVariant = async (lineId: string) => {
    try {
      await deleteLineItem(lineId)
      await fetchCart()
    } catch (error) {
      console.error("Failed to remove variant:", error)
      await fetchCart()
    }
  }

  const updateVariantInfo = async ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    try {
      const updatedCart = await updateLineItem({ lineId, quantity })
      setCart(updatedCart)
    } catch (error) {
      console.error("Failed to update variant:", error)
      await fetchCart()
    }
  }

  const getCart = useCallback(async () => {
    try {
      const cartData = await retrieveCart()
      setCart(cartData)
      return cartData
    } catch (error) {
      console.error("Failed to get cart:", error)
      return null
    }
  }, [])

  const value = useMemo(
    () => ({
      cart,
      setCart,
      getCart,
      addVariant,
      removeVariant,
      updateVariantInfo,
      isLoading,
    }),
    [cart, getCart, isLoading]
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
