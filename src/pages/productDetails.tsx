import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { CopyIcon, HeartIcon, StarIcon } from "lucide-react"

import api from "@/api"

import { GlobalContext } from "@/App"
import { Navbar } from "@/components/navbar"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function ProductDetails() {
  const url = window.location.href

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context
  const params = useParams()

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["productId"],
    queryFn: getProduct
  })

  if (!product) {
    return <p>Not Found</p>
  }
  if (isLoading) {
    return <p>Loading ... </p>
  }

  return (
    <>
      <Navbar />
      <h2>Product Details</h2>
      <div className="mt-10 flex justify-between items-center">
        <h3>{product.name}</h3>
        <img alt={product.name} src={product.image} />
        <h4>{product.description}</h4>
        <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={url} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => {
                navigator.clipboard.writeText(url)
              }}
            >
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="hidden md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl">Acme Prism Phone: The Cutting-Edge Smartphone</h1>
              <div>
                <p>
                  Experience the future of mobile technology with the Acme Prism Phone. Crafted with
                  precision and packed with cutting-edge features, this smartphone redefines the
                  boundaries of what's possible.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <span className="text-2xl font-bold">4.3</span>
              </div>
            </div>
          </div>
          <form className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="color">
                Color
              </Label>
              <RadioGroup className="flex items-center gap-2" defaultValue="black" id="color">
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-black"
                >
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-white"
                >
                  <RadioGroupItem id="color-white" value="white" />
                  White
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-blue"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="storage">
                Storage
              </Label>
              <RadioGroup className="flex items-center gap-2" defaultValue="128gb" id="storage">
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="storage-64gb"
                >
                  <RadioGroupItem id="storage-64gb" value="64gb" />
                  64GB
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="storage-128gb"
                >
                  <RadioGroupItem id="storage-128gb" value="128gb" />
                  128GB
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="storage-256gb"
                >
                  <RadioGroupItem id="storage-256gb" value="256gb" />
                  256GB
                </Label>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg">Buy Now</Button>
              <Button size="lg" variant="outline">
                <HeartIcon className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </form>
          <Separator />
          <div className="grid gap-4 text-sm leading-loose">
            <div>
              <h3 className="text-lg font-bold">Specifications</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>6.1-inch OLED display with 2532 x 1170 resolution</li>
                <li>A15 Bionic chip with 6-core CPU and 4-core GPU</li>
                <li>12MP dual-camera system with advanced features</li>
                <li>5G connectivity for lightning-fast downloads</li>
                <li>Up to 19 hours of video playback on a single charge</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      The Acme Prism Phone is a game-changer! The camera quality is amazing, and the
                      battery life is impressive. Highly recommended.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">Alex Smith</h4>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I've been using the Acme Prism Phone for a few weeks now, and I'm thoroughly
                      impressed. The performance is top-notch, and the design is sleek and modern.
                      Definitely worth the investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3 items-start">
          <div className="flex md:hidden items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl">
                Acme Prism Phone: The Cutting-Edge Smartphone
              </h1>
              <div>
                <p>
                  Experience the future of mobile technology with the Acme Prism Phone. Crafted with
                  precision and packed with cutting-edge features, this smartphone redefines the
                  boundaries of what's possible.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <span className="text-2xl font-bold">4.3</span>
              </div>
            </div>
            <div className="text-2xl font-bold ml-auto">$999</div>
          </div>
          <div className="grid gap-4">
            <img
              alt="Product Image"
              className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="hidden md:flex gap-4 items-start">
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  alt="Preview thumbnail"
                  className="aspect-square object-cover"
                  height={100}
                  src="/placeholder.svg"
                  width={100}
                />
                <span className="sr-only">View Image 1</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  alt="Preview thumbnail"
                  className="aspect-square object-cover"
                  height={100}
                  src="/placeholder.svg"
                  width={100}
                />
                <span className="sr-only">View Image 2</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  alt="Preview thumbnail"
                  className="aspect-square object-cover"
                  height={100}
                  src="/placeholder.svg"
                  width={100}
                />
                <span className="sr-only">View Image 3</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  alt="Preview thumbnail"
                  className="aspect-square object-cover"
                  height={100}
                  src="/placeholder.svg"
                  width={100}
                />
                <span className="sr-only">View Image 4</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
