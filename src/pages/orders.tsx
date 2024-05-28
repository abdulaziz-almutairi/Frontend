import { useQuery } from "@tanstack/react-query"

import OrdersService from "@/api/orders"

import { DashboardHero } from "@/components/dashboardHero"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Orders } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export function OrdersPage() {
  const { data: orders, error: ordersError } = useQuery<Orders[]>({
    queryKey: ["orders"],
    queryFn: OrdersService.getAll
  })
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 flex-1 py-12 md:py-24">
        <DashboardHero />
        <div className="container mx-auto mt-12 md:mt-24">
          <h2 className="text-3xl font-bold mb-8">ORDERS</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-left">{order.id}</TableCell>
                    <TableCell className="text-left">{order.date}</TableCell>
                    <TableCell className="text-left">{order.status}</TableCell>
                    <TableCell className="text-left">{order.quantity}</TableCell>
                    <TableCell className="text-left">{order.totalPrice}</TableCell>
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
