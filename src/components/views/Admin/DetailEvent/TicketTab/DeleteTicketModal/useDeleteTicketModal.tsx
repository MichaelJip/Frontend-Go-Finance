import ticketServices from "@/services/ticket.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteTicketModal = () => {
  const removeTicket = async (id: string) => {
    const res = await ticketServices.removeTicket(id);
    return res;
  };

  const {
    mutate: mutateRemoveTicket,
    isPending: isPendingRemoveTicket,
    isSuccess: isSuccessRemoveTicket,
  } = useMutation({
    mutationFn: removeTicket,
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
        description: "Success delete ticket",
        color: "success",
      });
    },
  });

  return {
    mutateRemoveTicket,
    isPendingRemoveTicket,
    isSuccessRemoveTicket,
  };
};

export default useDeleteTicketModal;
