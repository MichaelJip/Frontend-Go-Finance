import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { IEvent } from "@/types/event";

const eventServices = {
  getEvents: (params?: string) => {
    return instance.get(`${endpoint.EVENT}?${params}`);
  },
  addEvent: (payload: IEvent) => {
    return instance.post(`${endpoint.EVENT}`, payload);
  },
};

export default eventServices;
