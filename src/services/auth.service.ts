import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { IActivation, IRegister } from "@/types/auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authServices;
