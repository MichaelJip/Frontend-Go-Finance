import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { ICategory } from "@/types/category";

const categoryServices = {
  getCategories: (params?: string) => {
    return instance.get(`${endpoint.CATEGORY}?${params}`);
  },
  addCategory: (payload: ICategory) => {
    return instance.post(`${endpoint.CATEGORY}`, payload)
  }
};

export default categoryServices;
