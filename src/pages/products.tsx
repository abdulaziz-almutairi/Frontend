import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"

import ProductService from "@/api/products"
import CategoryService from "@/api/categories"
import UsersService from "@/api/users"

import { DashboardHero } from "@/components/dashboardHero"
import { EditDialog } from "@/components/editDialog"
import { Navbar } from "@/components/navbar"
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
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Category, Product, User } from "@/types"
import { Input } from "@/components/ui/input"
import { Form } from "react-router-dom"
import { Footer } from "@/components/footer"

export function Products() {
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
    id: "",
    name: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProducts({
      ...product,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await ProductService.createOne(product)
    queryClint.invalidateQueries({ queryKey: ["products"] })
  }
  const handleSelect = (e) => {
    setProducts({
      ...product,
      categoryId: e.target.value
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

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 flex-1 py-12 md:py-24">
        <DashboardHero />
        <div className="flex items-center">
          <Form className="mt-20 w-1/2 mx-auto" onSubmit={handleSubmit}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Product</h3>
            <Input
              className="mt-4 rounded-full"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
            <Input
              className="mt-4 rounded-full"
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
            />
            <Input
              className="mt-4 rounded-full"
              name="quantity"
              type="number"
              placeholder="Quantity"
              onChange={handleChange}
            />
            <Input
              className="mt-4 rounded-full"
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleChange}
            />
            <Input
              className="mt-4 rounded-full"
              name="image"
              type="text"
              placeholder="Image"
              onChange={handleChange}
            />

            <select
              className="mt-4 mx-auto items-center scroll-m-70 rounded-full"
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
            <div className="flex rounded justify-between">
              <Button type="submit" className="mt-4 rounded-full">
                Submit
              </Button>
              <Button variant="outline" type="reset" className="mt-4 rounded-full">
                Reset
              </Button>
            </div>
          </Form>
        </div>
        <div className="container mx-auto mt-12 md:mt-24">
          <h2 className="text-3xl font-bold mb-8">Products</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
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
                      <EditDialog product={product} />
                    </TableCell>
                    <TableCell className="text-left">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"destructive"} className="rounded-full">
                            X
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure you want to delete {product.name} ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              Product and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="rounded-full"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
