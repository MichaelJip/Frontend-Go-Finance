import instance from "@/libs/axios/instance";
import { IFileURL } from "@/types/file";
import endpoint from "./endpoint.constants";

const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const uploadServices = {
  uploadFile: (payload: FormData) => {
    return instance.post(
      `${endpoint.MEDIA}/upload-single`,
      payload,
      formDataHeader,
    );
  },
  removeFile: (payload: IFileURL) => {
    return instance.delete(`${endpoint.MEDIA}/remove`, { data: payload });
  },
};

export default uploadServices;
