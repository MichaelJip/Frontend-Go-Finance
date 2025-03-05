import { DateValue } from "@heroui/react";

interface IEvent {
  name: string;
  slug: string;
  banner: string | FileList;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  isFeatured: boolean | string;
  isPublish: boolean | string;
  isOnline: boolean | string;
}

interface IEventForm extends IEvent {
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}

export { IEvent, IEventForm };
