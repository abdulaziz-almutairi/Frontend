import { useQuery, useQueryClient } from "@tanstack/react-query"

import UsersService from "@/api/users"

import { User } from "@/types"
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Footer } from "@/components/footer"
import { DashboardHero } from "@/components/dashboardHero"

export function Users() {
  const queryClint = useQueryClient()
  const handleDeleteUser = async (id: string) => {
    await UsersService.deleteOne(id)
    queryClint.invalidateQueries({ queryKey: ["users"] })
  }
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UsersService.getAll
  })
  return (
    <>
      <Navbar />
      <DashboardHero />
      <main className="bg-gray-100 flex-1 py-12 md:py-24">
        <div className="w-auto">
          <Table className="mt-8 ">
            <TableCaption>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black">
                Users
              </h3>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-left">{user.firstName}</TableCell>
                  <TableCell className="text-left">{user.email}</TableCell>
                  <TableCell className="text-left">{user.role}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      {/* <AlertDialogTrigger>
                        <TableCell className="text-left">
                          <EditDialog user={user} />
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
                            <b> {user.firstName} </b>
                            account and remove user data from servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-full"
                            onClick={() => handleDeleteUser(user.id)}
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

      <Footer />
    </>
  )
}

export default Users
