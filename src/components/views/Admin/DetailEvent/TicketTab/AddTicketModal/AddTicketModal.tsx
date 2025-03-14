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
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddTicketModal from "./useAddTicketModal";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}
const AddTicketModal = (props: PropsTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,

    //handlePost
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessAddTicket, onClose, refetchTicket]);

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Ticket Event</ModalHeader>
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
              disabled={isPendingAddTicket || isSuccessAddTicket}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingAddTicket}
              isLoading={isPendingAddTicket}
            >
              Create Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
