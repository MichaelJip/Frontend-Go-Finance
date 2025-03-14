import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { Controller } from "react-hook-form";
import { ITicket } from "@/types/ticket";

interface PropsTypes {
  isOpen: boolean;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}

const UpdateTicketModal = (props: PropsTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const {
    control,
    errors,
    reset,
    setValueUpdateTicket,
    handleSubmitForm,

    //handlePost
    handleUpdateTicket,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,
  } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

  useEffect(() => {
    if (isSuccessUpdateTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessUpdateTicket, refetchTicket, onClose, setSelectedDataTicket]);

  useEffect(() => {
    if (selectedDataTicket) {
      setValueUpdateTicket("name", `${selectedDataTicket?.name}`);
      setValueUpdateTicket("price", `${selectedDataTicket?.price}`);
      setValueUpdateTicket("quantity", `${selectedDataTicket?.quantity}`);
      setValueUpdateTicket("description", `${selectedDataTicket?.description}`);
    }
  }, [setValueUpdateTicket, selectedDataTicket]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedDataTicket(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Ticket Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Price"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.price !== undefined}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Quantity"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.quantity !== undefined}
                    errorMessage={errors.quantity?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingUpdateTicket || isSuccessUpdateTicket}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingUpdateTicket || isSuccessUpdateTicket}
              isLoading={isPendingUpdateTicket || isSuccessUpdateTicket}
            >
              Update Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
