import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { Form } from "react-router-dom"

import ProductService from "../api/products"
import CategoryService from "../api/categories"
import UsersService from "../api/users"

import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Category, Product, User } from "@/types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { EditDialog } from "@/components/editDialog"
import { Navbar } from "@/components/navbar"

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProducts({
      ...product,
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
  return (
    <>
      <Navbar />
      <div>
        <Form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Product</h3>
          <Input
            className="mt-4"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            name="description"
            type="text"
            placeholder="Description"
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            name="image"
            type="text"
            placeholder="Image"
            onChange={handleChange}
          />

          <select
            className="mt-4 w-1/3 mx-auto items-center scroll-m-40 "
            name="cats"
            onChange={handleSelect}
          >
            {categories?.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              )
            })}
          </select>
          <div className="flex justify-between">
            <Button type="submit" className="mt-4">
              Submit
            </Button>
            <Button variant="outline" type="reset" className="mt-4">
              Reset
            </Button>
          </div>
        </Form>
      </div>
      <div>
        <h1 className="scroll-m-20 text-4x1 my-10 font-semibold tracking-tight">Products</h1>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>CategoryId</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWithCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">
                  <img src={product.image} alt={product.name} className="w-20 h-20" />
                </TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell className="text-left">{product.quantity}</TableCell>
                <TableCell className="text-left">{product.description}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"destructive"}>X</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure you want to delete {product.name} ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your Product
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell className="text-left">
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
