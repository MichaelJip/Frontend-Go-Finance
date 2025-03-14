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
import { ITicket } from "@/types/ticket";

interface PropTypes {
  isOpen: boolean;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
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
    selectedDataTicket,
    setSelectedDataTicket,
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
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataTicket(null);
            }}
            disabled={isPendingRemoveTicket || isSuccessRemoveTicket}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onPress={() => mutateRemoveTicket(`${selectedDataTicket?._id}`)}
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
