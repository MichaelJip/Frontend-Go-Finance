interface ITicket {
  _id?: string;
  name?: string;
  price?: number | string;
  quantity?: number | string;
  events?: string;
  description?: string;
}

export { ITicket };
