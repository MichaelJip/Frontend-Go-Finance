import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react";
import useDetailTransaction from "./useDetailTransaction";
import { convertIDR } from "@/utils/formatCurrency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import Script from "next/script";
import enviorment from "@/config/enviorment";

const DetailTransaction = () => {
  const { dataTransactionById, dataDetailEventById, dataTicket } =
    useDetailTransaction();
  return (
    <Card className="px-5 py-4">
      <Script
        src={enviorment.MIDTRANS_SNAP_URL}
        data-client-key={enviorment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <CardBody className="gap-8">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Order:</h4>
          <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold">Order ID:</p>
              <Skeleton
                isLoaded={!!dataTransactionById?.orderId}
                className="h-4 rounded-md"
              >
                <p className="text-sm">{dataTransactionById?.orderId}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm font-semibold">Ticket:</p>
              <Skeleton
                isLoaded={!!dataTicket?.name}
                className="h-4 rounded-md"
              >
                <p className="text-sm">{`${dataTicket?.name} ( ${convertIDR(dataTicket?.price)} ) x ( ${dataTransactionById?.quantity} )`}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm font-semibold">Total:</p>
              <Skeleton
                isLoaded={!!dataTransactionById?.total}
                className="h-4 rounded-md"
              >
                <p className="text-sm">{`${convertIDR(dataTransactionById?.total)}`}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm font-semibold">Status:</p>
              <Skeleton
                isLoaded={!!dataTransactionById?.status}
                className="h-4 rounded-md"
              >
                <Chip
                  className="capitalize"
                  color={
                    dataTransactionById?.status === "completed"
                      ? "success"
                      : "warning"
                  }
                  variant="flat"
                  size="sm"
                >
                  {dataTransactionById?.status}
                </Chip>
              </Skeleton>
            </div>
          </div>
        </div>
        {dataTransactionById?.status === "completed" && (
          <div className="flex flex-col gap-2">
            <h4 className="font-bold">Ticket</h4>
            <div className="mt-2 flex flex-col gap-4">
              {dataTransactionById?.vouchers?.map(
                (voucher: { voucherId: string }) => (
                  <Card
                    shadow="sm"
                    className="p-4 pt-6 lg:p-2"
                    key={`voucher-${voucher.voucherId}`}
                  >
                    <CardBody className="gap-4 lg:flex-row">
                      <div className="mx-auto mb-4 w-2/3 lg:m-0 lg:w-1/5">
                        <QRCodeSVG
                          value={voucher.voucherId}
                          className="!h-full !w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-md font-bold text-primary lg:text-xl">
                          {dataDetailEventById?.name}
                        </h2>
                        <div className="font-bold">
                          <p className="text-foreground-500">Date</p>
                          <p className="text-sm text-primary lg:text-base">
                            {convertTime(dataDetailEventById?.startDate)} -{" "}
                            {convertTime(dataDetailEventById?.endDate)}
                          </p>
                        </div>
                        <div className="font-bold">
                          <p className="text-foreground-500">Location</p>
                          <p className="text-primary">
                            {dataDetailEventById?.isOnline
                              ? "Online"
                              : "Offline"}
                          </p>
                        </div>
                        {dataDetailEventById?.isOnline && (
                          <Button
                            as={Link}
                            href={`${dataDetailEventById?.location?.address}`}
                            variant="bordered"
                            color="primary"
                            className="w-fit"
                          >
                            Join Now
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}
        {dataTransactionById?.status === "pending" && (
          <Button
            className="w-fit"
            color="primary"
            onPress={() => {
              (
                window as unknown as { snap: { pay: (token: string) => void } }
              ).snap.pay(dataTransactionById?.payment?.token);
            }}
          >
            Pay Now
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default DetailTransaction;
