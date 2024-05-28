import * as React from "react"
import { Form, Link } from "react-router-dom"

import { Cart } from "@/components/cart"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"
import { Button } from "./ui/button"

export function Navbar() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  return (
    <>
      <div className="flex flex-col">
        <header className="bg-gray-900 text-white py-4 px-6 md:px-12">
          <div className="container mx-auto flex items-center justify-between">
            <Link className="text-2xl font-bold" to="/">
              ElectroTech
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link className="hover:text-gray-300" to="/">
                Home
              </Link>
              {!state.user && <Link to="/account#login">Login</Link>}
              {!state.user && <Link to="/account#signup">Signup</Link>}
              {state.user?.role === ROLE.Admin && <Link to="/dashboard">Dashboard</Link>}
              {state.user && (
                <Form onSubmit={handleLogout}>
                  <Button type="submit">Logout</Button>
                </Form>
              )}
              <Link className="hover:text-gray-300" to="/about-us">
                About
              </Link>
              <Link className="hover:text-gray-300" to="/Contact">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Cart />
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
