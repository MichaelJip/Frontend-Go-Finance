import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;

  const standardizeStatus = (status: string) => {
    switch (status) {
      case "success":
        return "completed";
      case "progress":
        return "pending";
      case "failed":
        return "cancelled";
      default:
        return status;
    }
  };

  const updateTransactions = async () => {
    const result = await orderServices.updateStatusPayment(
      `${order_id}`,
      standardizeStatus(`${status}`),
    );

    return result;
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateTransactions,
  });

  return {
    mutateUpdateOrderStatus,
  };
};

export default usePayment;
