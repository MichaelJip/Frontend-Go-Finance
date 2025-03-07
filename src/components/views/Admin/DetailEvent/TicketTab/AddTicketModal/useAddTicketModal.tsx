import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/ticket";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
});

const useAddTicketModal = () => {
  const { query } = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingAddTicket,
    isSuccess: isSuccessAddTicket,
  } = useMutation({
    mutationFn: addTicket,
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
        description: "Success add ticket",
        color: "success",
      });
      reset();
    },
  });
  const handleAddTicket = (data: ITicket) => {
    data.events = `${query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,

    //handlePost
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  };
};

export default useAddTicketModal;
