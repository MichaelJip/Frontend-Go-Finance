import eventServices from "@/services/event.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModel = () => {
  const removeEvent = async (id: string) => {
    const res = await eventServices.removeEvent(id);
    return res;
  };

  const {
    mutate: mutateRemoveEvent,
    isPending: isPendingRemoveEvent,
    isSuccess: isSuccessRemoveEvent,
  } = useMutation({
    mutationFn: removeEvent,
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
        description: "Success delete event",
        color: "success",
      });
    },
  });

  return {
    mutateRemoveEvent,
    isPendingRemoveEvent,
    isSuccessRemoveEvent,
  };
};

export default useDeleteEventModel;
