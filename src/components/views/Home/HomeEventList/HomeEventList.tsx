import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/event";
import Link from "next/link";

interface PropTypees {
  title: string;
  events: IEvent[];
  isLoadingEvents: boolean;
  urlMore?: string;
}

const HomeEventList = (props: PropTypees) => {
  const { title, events, isLoadingEvents, urlMore = "/event" } = props;
  return (
    <section className="mb-16">
      <div className="mb-2 flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        <Link href={urlMore} className="font-semibold text-foreground-500">
          See More
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-1">
        {!isLoadingEvents
          ? events?.map((event) => (
              <CardEvent
                event={event}
                key={`${event._id}`}
                className="lg:last:mr09 first:ml-6 last:mr-6 lg:first:ml-0"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent
                key={`card-event-${index}`}
                className="lg:last:mr09 first:ml-6 last:mr-6 lg:first:ml-0"
                isLoading={isLoadingEvents}
              />
            ))}
      </div>
    </section>
  );
};

export default HomeEventList;
