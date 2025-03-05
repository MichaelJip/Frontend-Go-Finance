import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";

const eventServices = {
  getEvents: (params?: string) => {
    return instance.get(`${endpoint.EVENT}?${params}`);
  },
};

export default eventServices;
