import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"

import ProductService from "../api/products"
import CategoryService from "../api/categories"
import UsersService from "../api/users"
import OrdersService from "@/api/orders"

import { Category, Orders, Product, User } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Navbar } from "@/components/navbar"

import { Footer } from "@/components/footer"
import { DashboardHero } from "@/components/dashboardHero"

export function Dashboard() {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await ProductService.createOne(product)
    queryClint.invalidateQueries({ queryKey: ["products"] })
  }

  // Queries
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

  const productWithCat = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)

    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })
  const handleSelect = (e) => {
    setProducts({
      ...product,
      categoryId: e.target.value
    })
  }

  const handlCategorySubmit = async (e: FormEvent) => {
    e.preventDefault()
    await CategoryService.createOne(category)
    queryClint.invalidateQueries({ queryKey: ["categories"] })
  }
  const { data: orders, error: ordersError } = useQuery<Orders[]>({
    queryKey: ["orders"],
    queryFn: OrdersService.getAll
  })
  // Get the last 3 orders
  const lastThreeOrders = orders?.slice(-3).reverse()
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 flex-1 py-12 md:py-24">
        <DashboardHero />
        <div className="container mx-auto mt-12 md:mt-24">
          <h2 className="text-3xl font-bold mb-8">Last 3 Orders</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lastThreeOrders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-left">{order.id}</TableCell>
                    <TableCell className="text-left">{order.status}</TableCell>
                    <TableCell className="text-left">{order.totalPrice}</TableCell>
                    <TableCell className="text-left">
                      {new Date(order.date).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
