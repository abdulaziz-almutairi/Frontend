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
import { Hero } from "@/components/hero"

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

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
        <form onSubmit={handleSearch} className="w-full md:w-1/2 mx-auto mb-10 flex gap-2 mt-4">
          <Input
            type="search"
            placeholder="Search for a product"
            onChange={handleChange}
            value={searchBy}
            className="rounded-full"
          />
          <Button type="submit" className="rounded-full">
            Search
          </Button>
        </form>
      </div>
      <Hero />
      <section className="grid justify-center grid-cols-4 mt-8 mb-4">
        {data?.length === 0 && <p>Not Found</p>}
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px] mt-4">
            <CardHeader>
              <img className="mb-5" alt={product.name} src={product.image} />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full font-bold">
              <p>Price: ${product.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="rounded-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
              <Button variant="outline" className="rounded-full">
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
