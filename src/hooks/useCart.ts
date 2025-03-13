"use client"

import type { Game } from "@/utils/endpoint"
import { useEffect, useState } from "react"

export interface CartItem extends Game {
  quantity: number
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (game: Game) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === game.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...game, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (gameId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== gameId))
  }

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === gameId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (gameId: string) => {
    return cart.some((item) => item.id === gameId)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartTotal,
    getCartItemsCount,
    isLoaded,
  }
}

