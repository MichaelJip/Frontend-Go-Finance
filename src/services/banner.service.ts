import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";
import { IBanner } from "@/types/banner";

const bannerServices = {
  getBanner: (params?: string) => {
    return instance.get(`${endpoint.BANNER}?${params}`);
  },
  getBannerById: (id: string) => {
    return instance.get(`${endpoint.BANNER}/${id}`);
  },
  addBanner: (payload: IBanner) => {
    return instance.post(`${endpoint.BANNER}`, payload);
  },
  removeBanner: (id: string) => {
    return instance.delete(`${endpoint.BANNER}/${id}`);
  },
  updateBanner: (id: string, payload: IBanner) => {
    return instance.put(`${endpoint.BANNER}/${id}`, payload);
  },
};
export default bannerServices;
