export type Product = {
  id: string
  name: string
  image: string
  categoryId: string
  price: number
  description: string
  quantity: number
}

export type Category = {
  id: string
  name: string
}

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string
}

export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const
export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  role: keyof typeof ROLE
}