import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { GlobalContext } from "@/App"
import { useContext } from "react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleDeleteFromCart, handleAddToCart, handleRemoveCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex gap-2">
            <ShoppingCart className="cursor-pointer" />
            <span>({Object.keys(groups).length})</span>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-160 mt-9 decoration-sky-900 bg-gray-900 text-white rounded-t">
          <div>
            {state.cart.length === 0 && <p>No Items</p>}
            {Object.keys(groups).map((key) => {
              const products = groups[key]
              const product = products[0]
              const total = products.reduce((acc, curr) => {
                return acc + curr.price
              }, 0)
              return (
                <div className="w-auto items-center justify-between" key={product.id}>
                  <div className="mb-4 flex items-center gap-4 ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain"
                    />
                    <h4>{product.name}</h4>
                    <span className="font-bold">${total}</span>
                  </div>
                  <div className="mb-4 flex items-center gap-4 justify-between">
                    <Button
                      variant="destructive"
                      className="rounded-full"
                      onClick={() => handleDeleteFromCart(product.id)}
                    >
                      -
                    </Button>
                    <span className="font-bold">({products.length})</span>
                    <Button
                      variant="default"
                      className="rounded-full bg-gray-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <span>Total : {total}</span>
        </PopoverContent>
      </Popover>
    </>
  )
}
