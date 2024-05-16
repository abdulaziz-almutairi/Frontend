import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Product } from "@/types"
import { Form } from "react-router-dom"

export function Dashboard() {
  const queryClint = useQueryClient()
  const [product, setProducts] = useState({
    name: "",
    price: 0,
    categoryId: "3fa85f64-5717-4562-b3fc-2c963f66af22"
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setProducts({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postProducts
      queryClint.invalidateQueries({ queryKey: ["products"] })
    } catch (error) {
      console.log(error)
    }
  }

  const postProducts = async () => {
    try {
      const res = await api.post("products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: postProducts
  })

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <h3>Add Product</h3>
          <Input name="name" type="text" placeholder="name" onChange={handleChange} />
          <Input name="price" type="number" placeholder="price" onChange={handleChange} />
          {/* <Input name="categoryId" type="text" placeholder="Category" onChange={handleChange} /> */}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  )
}
