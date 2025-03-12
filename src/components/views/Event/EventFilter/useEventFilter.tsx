import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string(),
  isOnline: yup.string(),
  isFeatured: yup.string(),
});

const useEventFilter = () => {
  const { control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategory, isSuccess: isSuccessCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    control,
    dataCategory,
    isSuccessCategory,
    setValue,
  };
};

export default useEventFilter;
