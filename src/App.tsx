import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { createContext, useEffect, useState } from "react"

import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { DecodedUser, Product } from "./types"
import { ProductDetails } from "./pages/productDetails"
import { Account } from "./pages/account"
import { PrivateRoute } from "./components/privateRoute"

import { Users } from "@/pages/users"
import Categories from "./pages/categories"
import { Products } from "./pages/products"
import { OrdersPage } from "./pages/orders"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/account",
    element: <Account />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/dashboard/users",
    element: <Users />
  },
  {
    path: "/dashboard/categories",
    element: <Categories />
  },
  {
    path: "/dashboard/orders",
    element: <OrdersPage />
  },
  {
    path: "/dashboard/products",
    element: <Products />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  }
])

type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveCart: () => void
  handleRemoveUser: () => void
}

type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)

      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id === id)
    cart.splice(index, 1)

    setState({
      ...state,
      cart: cart
    })
  }
  const handleRemoveCart = () => {
    setState({
      ...state,
      cart: []
    })
  }
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user: user
    })
  }

  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          state,
          handleAddToCart,
          handleDeleteFromCart,
          handleStoreUser,
          handleRemoveCart,
          handleRemoveUser
        }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}
export default App
