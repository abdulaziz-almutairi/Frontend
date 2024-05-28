import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router-dom"

import api from "@/api"
import { Button } from "@/components/ui/button"

import { Product } from "@/types"
import { GlobalContext } from "@/App"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

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
      <section className="bg-white py-12 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data?.length === 0 && <p>Not Found</p>}
            {data?.map((product) => (
              <div key={product.id} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <img
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  height={400}
                  src={product.image}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover"
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="rounded-full ml-4">
                    <Link to={`/products/${product.id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-gray-100 py-12 md:py-24 flex-1">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              alt="Product"
              className="rounded-lg shadow-lg"
              src="https://www.sony.com/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg"
              style={{
                aspectRatio: "600/600",
                objectFit: "cover"
              }}
              width={600}
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Wireless Headphones</h1>
            <p className="text-gray-600">
              Experience the ultimate in audio quality and comfort with our state-of-the-art
              wireless headphones. Featuring advanced noise cancellation, long-lasting battery life,
              and a sleek, modern design, these headphones are the perfect companion for your
              on-the-go lifestyle.
            </p>
            <p className="text-2xl font-bold">$99</p>
          </div>
        </div>
      </div>
      <Footer />
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
