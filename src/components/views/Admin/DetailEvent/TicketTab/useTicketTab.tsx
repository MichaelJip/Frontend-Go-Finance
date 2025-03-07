import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTicketTab = () => {
  const { query, isReady } = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(`${query.id}`);
    return data.data;
  };

  const {
    data: dataTicket,
    refetch: refetchTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Ticket"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,

    selectedId,
    setSelectedId,
  };
};

export default useTicketTab;
