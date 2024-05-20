import { useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import jwt_decode from "jwt-decode"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import api from "@/api"
import { GlobalContext } from "@/App"
import { reshapeUser } from "@/lib/utils"

export function Account() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleStoreUser } = context
  console.log("handleStoreUser:", handleStoreUser)

  const navigation = useNavigate()
  const [signup, setSingup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [signin, setSingin] = useState({
    email: "",
    password: ""
  })
  // console.log("signup:", signup)
  const handleSignup = async () => {
    try {
      const res = await api.post(`/users/signup`, signup)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSignin = async () => {
    try {
      const res = await api.post(`/users/login`, signin)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setSingup({
      ...signup,
      [name]: value
    })
  }

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const responce = await handleSignup()
    if (responce) {
      navigation("/account#login")
    }
  }

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setSingin({
      ...signin,
      [name]: value
    })
  }
  const handleSigninSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleSignin()
    // console.log("localStorage:", localStorage)
    if (token) {
      const decodedToken = jwt_decode(token)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      handleStoreUser(user)
      navigation("/")
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <Tabs defaultValue="account" className="w-full md:w-1/3 mx-auto mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger id="login" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your account here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2" onSubmit={handleSigninSubmit}>
                <form>
                  <div className="space-y-1">
                    <Label htmlFor="Email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <Button className="mx-auto flex mt-4">Login</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Singup</CardTitle>
                <CardDescription>Signup to your account here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2" onSubmit={handleSignupSubmit}>
                <form id="signup">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleSignupChange}
                    />
                  </div>
                  <Button className="mx-auto flex mt-4">signup</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
