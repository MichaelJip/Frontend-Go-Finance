import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import useEvent from "./useEvent";
import { Chip, useDisclosure } from "@heroui/react";
import AddEventModal from "./AddEventModal";

const Event = () => {
  const { push, query, isReady } = useRouter();
  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "actions":
          return (
            <DropdownAction
              keyText="event"
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
              }}
            />
          );
        case "isPublish":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue === true ? "success" : "warning"}
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_EVENT}
          totalPages={dataEvent?.pagination.totalPages}
          emptyContent="Event is empty"
          data={dataEvent?.data || []}
          buttonTopContentLabel="Create Event"
          isLoading={isLoadingEvent || isRefetchingEvent}
          onClickButtonTopContent={addEventModal.onOpen}
        />
      )}
      <AddEventModal {...addEventModal} refetchEvent={refetchEvent} />
    </section>
  );
};

export default Event;
