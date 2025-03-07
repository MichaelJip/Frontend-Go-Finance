import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
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
  refetchTicket: () => void;
}

const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedId,
    setSelectedId,
  } = props;

  const { mutateRemoveTicket, isPendingRemoveTicket, isSuccessRemoveTicket } =
    useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessRemoveTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessRemoveTicket, refetchTicket, onClose]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this ticket
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
            disabled={isPendingRemoveTicket || isSuccessRemoveTicket}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            onPress={() => mutateRemoveTicket(selectedId)}
            disabled={isPendingRemoveTicket || isSuccessRemoveTicket}
            isLoading={isPendingRemoveTicket || isSuccessRemoveTicket}
          >
            Delete Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
