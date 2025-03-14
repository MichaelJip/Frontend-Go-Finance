import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { ICart } from "@/types/ticket";

const orderServices = {
  createOrder: (payload: ICart) => {
    return instance.post(`${endpoint.ORDER}`, payload);
  },
};

export default orderServices;
