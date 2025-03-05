import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constants";

const regionServices = {
  getRegions: (name?: string) => {
    return instance.get(`${endpoint.REGION}-search?name=${name}`);
  },
  getRegionById: (id?: string) => {
    return instance.get(`${endpoint.REGION}/${id}/regency`);
  },
};

export default regionServices;
