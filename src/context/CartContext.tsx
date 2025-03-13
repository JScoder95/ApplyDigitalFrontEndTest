"use client"

import { type CartItem, useCart } from "@/hooks/useCart"
import type { Game } from "@/utils/endpoint"
import { createContext, useContext, type ReactNode } from "react"

interface CartContextType {
  cart: CartItem[]
  addToCart: (game: Game) => void
  removeFromCart: (gameId: string) => void
  updateQuantity: (gameId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (gameId: string) => boolean
  getCartTotal: () => number
  getCartItemsCount: () => number
  isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartUtils = useCart()

  return <CartContext.Provider value={cartUtils}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}

