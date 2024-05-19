import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router-dom"

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
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  console.log(searchParams.get("searchBy"))

  const [searchBy, setSearchBy] = useState(defaultSearch)
  const queryClint = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?s=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    queryClint.invalidateQueries({ queryKey: ["products"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }
  return (
    <>
      <Navbar />
      <div>
        <form onSubmit={handleSearch} className="w-full md:w-1/2 mx-auto mb-10 flex gap-2">
          <Input
            type="search"
            placeholder="Search for a product"
            onChange={handleChange}
            value={searchBy}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <section className="grid justify-center grid-cols-4 mt-8 mb-4">
        {data?.length === 0 && <p>Not Found</p>}
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <img className="mb-5" alt={product.name} src={product.image} />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
              <Button variant="outline">
                <Link to={`/products/${product.id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
