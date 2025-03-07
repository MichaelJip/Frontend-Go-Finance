import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/formatCurrency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_EVENT_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";

const TicketTab = () => {
  const {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
    selectedId,
    setSelectedId,
  } = useTicketTab();

  const addTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];
      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              keyText="ticket"
              onPressButtonDetail={() => {
                setSelectedId(`${ticket._id}`);
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedId(`${ticket._id}`);
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteTicketModal, updateTicketModal],
  );
  return (
    <section>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-sm text-default-400">
              Manage Ticket information of this event
            </p>
          </div>
          <Button color="danger" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            renderCell={renderCell}
            columns={COLUMN_LIST_EVENT_TICKET}
            totalPages={1}
            showLimit={false}
            showSearch={false}
            emptyContent="Event Ticket is empty"
            isLoading={isPendingTicket || isRefetchingTicket}
            data={dataTicket || []}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
      <DeleteTicketModal
        {...deleteTicketModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTicket={refetchTicket}
      />
    </section>
  );
};

export default TicketTab;
