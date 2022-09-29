export type CartItemCategory = {
  id: number;
  name: string;
  uid: string;
};

export type DataFetch = {
  data: Array<CartItemCategory>;
  errors: Array<CartItemCategory>;
};
export type Response = {
  message: String;
};

export type ProductItemType = {
  id: number;
  name: string;
  category_id: number;
  uid: string;
};
