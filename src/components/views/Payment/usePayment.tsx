import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  console.log(router.query, 'check query use payment')

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

  console.log(status, "check status payment");

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
