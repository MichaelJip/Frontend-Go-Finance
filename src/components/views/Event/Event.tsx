import { IEvent } from "@/types/event";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import Image from "next/image";

const Event = () => {
  const router = useRouter();
  const { dataEvent, isLoadingEvent, isRefetchingEvent } = useEvent();
  const { setUrlExplore } = useChangeUrl();

  useEffect(() => {
    if (router.isReady) {
      setUrlExplore();
    }
  }, [router.isReady]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <EventFilter />
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingEvent && !isRefetchingEvent
            ? dataEvent?.data?.map((event: IEvent) => (
                <CardEvent event={event} key={`card-event-${event._id}`} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <CardEvent
                  key={`card-event-loading-${index}`}
                  isLoading={true}
                />
              ))}
        </div>
        {!isLoadingEvent && dataEvent?.data?.length > 0 && (
          <EventFooter totalPages={dataEvent?.pagination?.totalPages} />
        )}

        {dataEvent?.data?.length < 1 &&
          !isLoadingEvent &&
          !isRefetchingEvent && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src="/images/illustration/no-databear.png"
                alt="no-data"
                width={400}
                height={400}
              />
              <h2 className="text-center text-2xl font-bold text-primary">
                Event is empty
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default Event;
