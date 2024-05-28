import { Orders } from "@/types"
import api from "."

export default {
  getAll: async () => {
    try {
      const res = await api.get("/customerorders")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
