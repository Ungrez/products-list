export type CartItemCategory = {
  id: number;
  name: string;
  uid: string;
};

export type DataFetch = {
  data: Array<CartItemCategory>;
  errors: Array<CartItemCategory>;
};

export const headers = new Headers({
  "Content-Type": "application/json",
  accept: "application/json",
  Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
});

export type ProductItemType = {
  id: number;
  name: string;
  category_id: number;
};
