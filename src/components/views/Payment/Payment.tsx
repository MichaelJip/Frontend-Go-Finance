import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  console.log(status, 'check status')

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/gofinance.png"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustration/success-bear.png"
              : "/images/illustration/pending-bear.png"
          }
          alt={"success"}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold capitalize text-primary-500 md:text-3xl lg:text-3xl">
          Transactions {status}
        </h1>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="primary"
          onPress={() => router.push(`/member/transaction/${order_id}`)}
        >
          Check your transactions here
        </Button>
      </div>
    </div>
  );
};

export default Payment;
