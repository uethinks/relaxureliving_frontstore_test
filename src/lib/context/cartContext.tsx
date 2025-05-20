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
  addVariant: (variantInfo: variantInfo) => Promise<StoreCart | null>
  removeVariant: (lineId: string) => Promise<StoreCart | null>
  updateVariantInfo: (params: {
    lineId: string
    quantity: number
  }) => Promise<StoreCart | null>
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
      return cartData
    } catch (error) {
      console.error("Failed to fetch cart:", error)
      return null
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
      await addToCart(variantInfo)
      return await fetchCart()
    } catch (error) {
      console.error("Failed to add variant:", error)
      return await fetchCart()
    }
  }

  const removeVariant = async (lineId: string) => {
    try {
      await deleteLineItem(lineId)
      return await fetchCart()
    } catch (error) {
      console.error("Failed to remove variant:", error)
      return await fetchCart()
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
      await updateLineItem({ lineId, quantity })
      return await fetchCart()
    } catch (error) {
      console.error("Failed to update variant:", error)
      return await fetchCart()
    }
  }

  const getCart = useCallback(async () => {
    return await fetchCart()
  }, [fetchCart])

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
