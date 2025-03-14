import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationArrow } from "react-icons/fa";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import enviorment from "@/config/enviorment";

const DetailEvent = () => {
  const {
    dataDetailEvent,
    //ticket
    dataTicket,
    //cart
    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
    //create order
    mutateCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();
  
  return (
    <div className="px-8 md:px-0">
      <Script
        src={enviorment.MIDTRANS_SNAP_URL}
        data-client-key={enviorment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <Skeleton
        className="h-6 w-1/4 rounded-lg"
        isLoaded={!!dataDetailEvent?.name}
      >
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>
      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataDetailEvent?.name}
            className="mb-2 h-10 rounded-lg"
          >
            <h1 className="text-2xl font-semibold text-danger">
              {dataDetailEvent?.name}
            </h1>
          </Skeleton>
          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={
              !!dataDetailEvent?.startDate || !!dataDetailEvent?.endDate
            }
          >
            <div className="flex items-center gap-4 text-foreground-500">
              <FaClock width={16} />
              <p>
                {convertTime(dataDetailEvent?.startDate)} -{" "}
                {convertTime(dataDetailEvent?.endDate)}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={
              !!dataDetailEvent?.isOnline || !!dataDetailEvent?.location
            }
          >
            <div className="flex items-center gap-4 text-foreground-500">
              <FaLocationArrow width={16} />
              <p>
                {dataDetailEvent?.isOnline ? "Online" : "Offline"}{" "}
                {dataDetailEvent?.isOnline
                  ? ""
                  : `- ${dataDetailEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-4 aspect-video w-full"
            isLoaded={!!dataDetailEvent?.banner}
          >
            <Image
              alt="cover"
              src={dataDetailEvent?.banner && dataDetailEvent?.banner}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>
          <Tabs aria-label="Tab Detail Event" fullWidth>
            <Tab key="Description" title="Description">
              <h2 className="text-xl font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton
                className="mt-2 h-32 w-full rounded-lg"
                isLoaded={!!dataDetailEvent?.description}
              >
                <p className="text-foreground-500">
                  {dataDetailEvent?.description}
                </p>
              </Skeleton>
            </Tab>
            <Tab key="Ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataTicket?.map((ticket: ITicket) => (
                  <DetailEventTicket
                    key={`ticket-${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${ticket?._id}`)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>

        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingCreateOrder}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
