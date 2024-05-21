import * as React from "react"
import { Link } from "react-router-dom"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Cart } from "./cart"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"

export function Navbar() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state } = context

  return (
    <>
      <div className="flex justify-between  bg-black bg-opacity-50">
        <h3>Logo</h3>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {!state.user && (
              <NavigationMenuItem>
                <Link to="/account#login">
                  <NavigationMenuLink>Login</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {!state.user && (
              <NavigationMenuItem>
                <Link to="/account#signup">
                  <NavigationMenuLink>Signup</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {state.user?.role === ROLE.Admin && (
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <Link to="/about-us">
                <NavigationMenuLink>About us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Cart />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}
