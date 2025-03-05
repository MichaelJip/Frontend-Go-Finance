interface IEvent {
  name?: string;
  slug: string;
  banner?: string | FileList;
  category?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: {
    region: string;
    coordinates: {
      x: number;
      y: number;
    };
  };
  isFeatured?: boolean;
  isPublish?: boolean;
}

export { IEvent };
