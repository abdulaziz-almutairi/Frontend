import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { useParams } from "react-router-dom"

import { GlobalContext } from "@/App"
import api from "@/api"
import { Navbar } from "@/components/navbar"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"

export function ProductDetails() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context
  const params = useParams()

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["productId"],
    queryFn: getProduct
  })

  if (!product) {
    return <p>Not Found</p>
  }
  if (isLoading) {
    return <p>Loading ... </p>
  }
  return (
    <>
      <Navbar />
      <h2>Product Details</h2>
      <div className="mt-10 flex justify-between items-center">
        <h3>{product.name}</h3>
        <img alt={product.name} src={product.image} />
        <h4>{product.description}</h4>
        <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
      </div>
    </>
  )
}
