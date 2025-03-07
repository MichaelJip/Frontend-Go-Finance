import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { ITicket } from "@/types/ticket";

const ticketServices = {
  getTicketByEventId: (eventId: string) => {
    return instance.get(`${endpoint.TICKET}/${eventId}/events`);
  },
  getTicketId: (id: string) => {
    return instance.get(`${endpoint.TICKET}/${id}`);
  },
  addTicket: (payload: ITicket) => {
    return instance.post(`${endpoint.TICKET}`, payload);
  },
  removeTicket: (id: string) => {
    return instance.delete(`${endpoint.TICKET}/${id}`);
  },
  updateTicket: (id: string, payload: ITicket) => {
    return instance.put(`${endpoint.TICKET}/${id}`, payload);
  },
};

export default ticketServices;
