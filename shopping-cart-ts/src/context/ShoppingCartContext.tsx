import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartcontext = {
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
  getItemQuantity: (id:number) => number
  increaseCartQuantity: (id:number) => void
  decreaseCartQuantity: (id:number) => void
  removeFromCart: (id:number) => void
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartcontext)

export function useShoppingCart(){
  return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider( {children}: ShoppingCartProviderProps ) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  function cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currentItems => {
      if(currentItems.find(item => item.id === id) == null){
        return [...currentItems, {id, quantity: 1}]
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currentItems => {
      if(currentItems.find(item => item.id === id)?.quantity === 1){
        return currentItems.filter(item => item.id !== id)
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
