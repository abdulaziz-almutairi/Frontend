import { useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { GlobalContext } from "@/App"
import React from "react"
import Navbar from "@/components/ui/navbar"

export function Home() {
  // const queryClint = useQueryClient()
  const [product, setProduct] = useState({
    productId: ""
  })
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleAddToCart } = context
  console.log("state:", state)

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const deleteProducts = async (id) => {
    // e.preventDefault()
    const res = await api
      .delete(`/products/:${id}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
        return Promise.reject(new Error("Something went wrong"))
      })
    return res
  }
  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: getProducts
  })

  return (
    <>
      <Navbar />
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <h3>Cart : ({state.cart.length})</h3>
      <section className="grid justify-center grid-cols-4">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
              <Button name="name" className="w-full" onClick={() => deleteProducts(product.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
