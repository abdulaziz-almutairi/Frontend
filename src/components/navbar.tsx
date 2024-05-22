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
      <div className="flex justify-center h-24 bg-gray-800">
        <NavigationMenu className="flex w-full">
          {/* <img src="https://dqov5rvavbmnl.cloudfront.net/images/logos/37/logo2-w.png?t=1700451423" /> */}
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className=" text-slate-50">Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {!state.user && (
              <NavigationMenuItem>
                <Link to="/account#login">
                  <NavigationMenuLink className=" text-slate-50">Login</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {!state.user && (
              <NavigationMenuItem>
                <Link to="/account#signup">
                  <NavigationMenuLink className=" text-slate-50">Signup</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {state.user?.role === ROLE.Admin && (
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className=" text-slate-50">Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <Link to="/about-us">
                <NavigationMenuLink className=" text-slate-50">About us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className=" text-slate-50">
                <Cart />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}
