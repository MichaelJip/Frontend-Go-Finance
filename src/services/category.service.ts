import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { ICategory } from "@/types/category";

const categoryServices = {
  getCategories: (params?: string) => {
    return instance.get(`${endpoint.CATEGORY}?${params}`);
  },
  getCategoryById: (id: string) => {
    return instance.get(`${endpoint.CATEGORY}/${id}`);
  },
  addCategory: (payload: ICategory) => {
    return instance.post(`${endpoint.CATEGORY}`, payload);
  },
  removeCategory: (id: string) => {
    return instance.delete(`${endpoint.CATEGORY}/${id}`);
  },
  updateCategory: (id: string, payload: ICategory) => {
    return instance.put(`${endpoint.CATEGORY}/${id}`, payload);
  },
};

export default categoryServices;
