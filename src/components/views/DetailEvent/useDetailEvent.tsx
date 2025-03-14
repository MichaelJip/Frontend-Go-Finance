import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";
import orderServices from "@/services/order.service";
import { addToast } from "@heroui/toast";

const useDetailEvent = () => {
  const router = useRouter();

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataDetailEvent } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  //Ticket
  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(
      `${dataDetailEvent?._id}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsByEventId,
    enabled: !!dataDetailEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket?._id === cart.ticket);
    }
    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataDetailEvent?._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  const createOrder = async () => {
    const { data } = await orderServices.createOrder(cart);
    return data?.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "primary",
        });
      },
      onSuccess: (result) => {
        const transactionToken = result.payment.token;
        // (window as any).snap.pay(transactionToken);
        (
          window as unknown as { snap: { pay: (token: string) => void } }
        ).snap.pay(transactionToken);
      },
    });

  return {
    dataDetailEvent,

    //ticket
    dataTicket,

    //cart
    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,

    //create order
    mutateCreateOrder,
    isPendingCreateOrder,
  };
};

export default useDetailEvent;
