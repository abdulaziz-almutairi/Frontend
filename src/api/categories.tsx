import { Category } from "@/types"
import api from "."

export default {
  getAll: async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  CreateOne: async (category: Category) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/categorys", category, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
