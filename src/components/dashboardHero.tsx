import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { ArrowUpIcon } from "lucide-react"
import { Form, Link } from "react-router-dom"

import ProductService from "@/api/products"
import CategoryService from "@/api/categories"
import UsersService from "@/api/users"
import OrdersService from "@/api/orders"

import { Input } from "@/components/ui/input"
import { Category, Orders, Product, User } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DashboardHero() {
  const queryClint = useQueryClient()
  const [product, setProducts] = useState({
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    image: "",
    categoryId: ""
  })

  const [category, setCategories] = useState({
    name: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProducts({
      ...product,
      [name]: value
    })
  }

  const handleAddCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategories({
      ...category,
      [name]: value
    })
  }

  const handleDeleteProduct = async (id: string) => {
    await ProductService.deleteOne(id)
    queryClint.invalidateQueries({ queryKey: ["products"] })
  }

  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })
  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: CategoryService.getAll
  })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UsersService.getAll
  })

  const { data: orders, error: ordersError } = useQuery<Orders[]>({
    queryKey: ["orders"],
    queryFn: OrdersService.getAll
  })
  const handlCategorySubmit = async (e: FormEvent) => {
    e.preventDefault()
    await CategoryService.createOne(category)
    queryClint.invalidateQueries({ queryKey: ["categories"] })
  }
  return (
    <>
      <main className="bg-gray-100 flex-1 py-12 md:py-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold">{orders?.length}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-gray-600">
                  <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  <span>12%</span>
                </div>
                <Button size="sm" variant="outline">
                  <Link to={`/dashboard/orders`}>View Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold">{categories?.length}</span>
                <Form className="mx-auto" onSubmit={handlCategorySubmit}>
                  <Input
                    className="mt-4 rounded-full"
                    name="name"
                    type="text"
                    placeholder="Category Name"
                    onChange={handleAddCategoryChange}
                  />
                  <Button type="submit" className="mt-4 rounded-full">
                    Add Category
                  </Button>
                </Form>
                <Button className="mt-4" size="sm" variant="outline">
                  <Link to={`/dashboard/categories`}>Edit / Delete</Link>
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between"></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold">{users?.length}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-gray-600">
                  <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  <span>15%</span>
                </div>
                <Button size="sm" variant="outline">
                  <Link to={`/dashboard/users`}>View Users</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold">{products?.length}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Button size="sm" variant="outline">
                  <Link to={`/dashboard/products`}>View Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
