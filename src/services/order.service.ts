import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { ICart } from "@/types/ticket";

const orderServices = {
  createOrder: (payload: ICart) => {
    return instance.post(`${endpoint.ORDER}`, payload);
  },
  updateStatusPayment: (id: string, status: string) => {
    return instance.put(`${endpoint.ORDER}/${id}/${status}`);
  },
  getMemberOrder: (params: string) => {
    return instance.get(`${endpoint.ORDER}-history?${params}`);
  },
  getOrderById: (id: string) => {
    return instance.get(`${endpoint.ORDER}/${id}`);
  },
};

export default orderServices;
