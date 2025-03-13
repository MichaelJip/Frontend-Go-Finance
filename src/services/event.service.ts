import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { IEvent } from "@/types/event";

const eventServices = {
  getEvents: (params?: string) => {
    return instance.get(`${endpoint.EVENT}?${params}`);
  },
  getEventById: (id: string) => {
    return instance.get(`${endpoint.EVENT}/${id}`);
  },
  getEventBySlug: (slug: string) => {
    return instance.get(`${endpoint.EVENT}/${slug}/slug`);
  },
  addEvent: (payload: IEvent) => {
    return instance.post(`${endpoint.EVENT}`, payload);
  },
  removeEvent: (id: string) => {
    return instance.delete(`${endpoint.EVENT}/${id}`);
  },
  updateEvent: (id: string, payload: IEvent) => {
    return instance.put(`${endpoint.EVENT}/${id}`, payload);
  },
};

export default eventServices;
