interface ITicket {
  _id?: string;
  name?: string;
  price?: number | string;
  quantity?: number | string;
  events?: string;
  description?: string;
}

interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}

export { ITicket, ICart };
