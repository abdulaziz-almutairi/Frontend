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

export function Navbar() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state } = context

  console.log(state)

  return (
    <>
      <div className="flex justify-between	">
        <h3>Logo</h3>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/account#login">
                <NavigationMenuLink>Login</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/account#signup">
                <NavigationMenuLink>Signup</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
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