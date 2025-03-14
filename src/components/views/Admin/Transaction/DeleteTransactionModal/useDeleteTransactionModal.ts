import orderServices from "@/services/order.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteTransactionModal = () => {
  const removeTransaction = async (id: string) => {
    const res = await orderServices.removeOrderById(id);
    return res;
  };

  const {
    mutate: mutateRemoveTransaction,
    isPending: isPendingRemoveTransaction,
    isSuccess: isSuccessRemoveTransaction,
  } = useMutation({
    mutationFn: removeTransaction,
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
        description: "Success delete transaction",
        color: "success",
      });
    },
  });

  return {
    mutateRemoveTransaction,
    isPendingRemoveTransaction,
    isSuccessRemoveTransaction,
  };
};

export default useDeleteTransactionModal;
