import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import regionServices from "@/services/region.service";
import { IEvent, IEventForm } from "@/types/event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please choose category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
  region: yup.string().required("Please select region"),
  address: yup.string().required("Please input address"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  isPublish: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  isOnline: yup.string().required("Please select online or offline"),
});

const useAddEventModal = () => {
  const debounce = useDebounce();
  const {
    isPendingUploadFile,
    isPendingRemoveFile,

    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const banner = watch("banner");
  const fileUrl = getValues("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleRemoveBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleRemoveFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  const [searchRegion, setSearchRegion] = useState<string>("");

  const { data: dataRegions } = useQuery({
    queryKey: ["Regions", searchRegion],
    queryFn: () => regionServices.getRegions(`${searchRegion}`),
    enabled: searchRegion !== "",
  });

  const handleSearchRegion = (name: string) => {
    debounce(() => setSearchRegion(name), DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingAddEvent,
    isSuccess: isSuccessAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      addToast({
        title: "Failed",
        description: error.message,
        color: "primary",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Success add event",
        color: "success",
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
      location: {
        region: `${data.region}`,
        address: `${data.address}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    isPendingAddEvent,
    isSuccessAddEvent,
    reset,
    handleSubmitForm,
    handleAddEvent,
    setValue,

    //Handle Image
    banner,
    handleUploadBanner,
    isPendingUploadFile,

    handleRemoveBanner,
    isPendingRemoveFile,

    handleOnClose,

    //Category Data
    dataCategory,

    //Regions Data
    dataRegions,
    searchRegion,
    handleSearchRegion,
  };
};

export default useAddEventModal;
