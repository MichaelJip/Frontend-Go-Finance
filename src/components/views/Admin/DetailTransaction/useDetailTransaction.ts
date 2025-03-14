import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
  const router = useRouter();

  //Transaction
  const getTransactionById = async () => {
    const { data } = await orderServices.getOrderById(`${router.query.id}`);
    return data.data;
  };

  const { data: dataTransactionById } = useQuery({
    queryKey: ["TransactionById"],
    queryFn: getTransactionById,
    enabled: !!router.query.id,
  });

  //Events
  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataTransactionById?.events}`,
    );
    return data.data;
  };

  const { data: dataDetailEventById } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!dataTransactionById?.events,
  });

  //Ticket
  const getTicketById = async () => {
    const { data } = await ticketServices.getTicketId(
      `${dataTransactionById.ticket}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["TransactionsByTicketId"],
    queryFn: getTicketById,
    enabled: !!dataTransactionById?.ticket,
  });

  return {
    dataTransactionById,
    dataDetailEventById,
    dataTicket,
  };
};

export default useDetailTransaction;
