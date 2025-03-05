import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModel from "./useDeleteEventModal";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
}

const DeleteEventModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = props;

  const { mutateRemoveEvent, isPendingRemoveEvent, isSuccessRemoveEvent } =
    useDeleteEventModel();

  useEffect(() => {
    if (isSuccessRemoveEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessRemoveEvent, refetchEvent, onClose]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Add Event</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this event
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingRemoveEvent}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            onPress={() => mutateRemoveEvent(selectedId)}
            disabled={isPendingRemoveEvent}
            isLoading={isPendingRemoveEvent}
          >
            Delete Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
