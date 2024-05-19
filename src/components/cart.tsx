import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { GlobalContext } from "@/App"
import { useContext } from "react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleDeleteFromCart } = context

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex gap-2">
            <ShoppingCart className="cursor-pointer hover:bg-slate-200" />
            <span>({state.cart.length})</span>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-80 mt-4">
          <div>
            {state.cart.length === 0 && <p>No Items</p>}
            {state.cart.map((product) => {
              return (
                <div className="mb-4 flex items-center gap-4" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-contain"
                  />
                  <h4>{product.name}</h4>
                  <span className="font-bold">{product.price}</span>
                  <Button
                    variant="destructive"
                    className="p-4"
                    onClick={() => handleDeleteFromCart(product.id)}
                  >
                    X
                  </Button>
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
