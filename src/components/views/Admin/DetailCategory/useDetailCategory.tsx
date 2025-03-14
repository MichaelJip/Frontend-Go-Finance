import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/category";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
      `${query.id}`,
      payload,
    );

    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      addToast({
        title: "Failed",
        description: error.message,
        color: "primary",
      });
    },
    onSuccess: () => {
      refetchCategory();
      addToast({
        title: "Success",
        description: "Success update category",
        color: "success",
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  };
};

export default useDetailCategory;
