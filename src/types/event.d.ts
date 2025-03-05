import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  banner?: string | FileList;
  category?: string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  location?: {
    region: string;
    coordinates: number[];
  };
  isFeatured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
}

interface IEventForm extends IEvent {
  region?: string;
  latitude?: string;
  longitude?: string;
}

export { IEvent, IEventForm };
