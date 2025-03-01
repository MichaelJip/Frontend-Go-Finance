import categoryServices from "@/services/category.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = () => {
  const removeCategory = async (id: string) => {
    const res = await categoryServices.removeCategory(id);
    return res;
  };

  const {
    mutate: mutateRemoveCategory,
    isPending: isPendingRemoveCategory,
    isSuccess: isSuccessRemoveCategory,
  } = useMutation({
    mutationFn: removeCategory,
    onError: (error) => {
      addToast({
        title: "Failed",
        description: error.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Success delete category",
        color: "success",
      });
    },
  });

  return {
    mutateRemoveCategory,
    isPendingRemoveCategory,
    isSuccessRemoveCategory,
  };
};

export default useDeleteCategoryModal;
