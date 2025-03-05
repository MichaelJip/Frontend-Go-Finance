import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import regionServices from "@/services/region.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  isOnline: yup.string().required("Please select online or offline"),
});

const useLocationTab = () => {
  const debounce = useDebounce();
  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
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

  return {
    dataRegions,
    searchRegion,
    handleSearchRegion,

    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
  };
};

export default useLocationTab;
