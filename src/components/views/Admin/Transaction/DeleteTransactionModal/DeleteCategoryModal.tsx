import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropsTypes {
  isOpen: boolean;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTransaction: () => void;
}

const DeleteTransactionModal = (props: PropsTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTransaction,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateRemoveTransaction,
    isPendingRemoveTransaction,
    isSuccessRemoveTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessRemoveTransaction) {
      onClose();
      refetchTransaction();
    }
  }, [isSuccessRemoveTransaction, refetchTransaction, onClose]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Transaction</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Transaction
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingRemoveTransaction}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onPress={() => mutateRemoveTransaction(selectedId)}
            disabled={isPendingRemoveTransaction}
            isLoading={isPendingRemoveTransaction}
          >
            Delete Transaction
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
