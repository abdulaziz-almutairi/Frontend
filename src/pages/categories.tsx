import { DashboardHero } from "@/components/dashboardHero"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

import CategoryService from "@/api/categories"

import { Category } from "@/types"
import { Navbar } from "@/components/navbar"
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
import { Button } from "@/components/ui/button"
import { EditDialog } from "@/components/editDialog"

export function Categories() {
  const queryClint = useQueryClient()

  const [category, setCategories] = useState({
    id: "",
    name: ""
  })

  const handleAddCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategories({
      ...category,
      [name]: value
    })
  }

  const handleDeleteCategory = async (id: string) => {
    await CategoryService.deleteOne(id)
    queryClint.invalidateQueries({ queryKey: ["products"] })
  }
  // Queries

  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: CategoryService.getAll
  })

  return (
    <>
      <Navbar />
      <DashboardHero />
      <main className="bg-gray-100 flex-1 py-12 md:py-24">
        <div className="w-auto">
          <Table className="">
            <TableCaption>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black">
                Categories
              </h3>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="text-left">{category.id}</TableCell>
                  <TableCell className="text-left">{category.name}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      {/* <AlertDialogTrigger>
                        <TableCell className="text-left">
                          <EditDialog category={category} />
                        </TableCell>
                      </AlertDialogTrigger> */}
                      <AlertDialogTrigger>
                        <Button variant="destructive" className="rounded-full">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            <b> {category.name} </b>
                            Category and remove from servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-full"
                            onClick={() => handleDeleteCategory(category.id)}
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
      </main>
    </>
  )
}

export default Categories
