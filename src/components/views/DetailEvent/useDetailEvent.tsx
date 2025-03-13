import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataDetailEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["Event By Slug"],
    queryFn: getEventBySlug,
  });

  //Ticket
  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(
      `${dataDetailEvent?._id}`,
    );
    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsByEventId,
    enabled: !!dataDetailEvent?._id,
  });

  return {
    dataDetailEvent,
    isLoadingDetailEvent,

    //ticket
    dataTicket,
    isLoadingTicket,
  };
};

export default useDetailEvent;
