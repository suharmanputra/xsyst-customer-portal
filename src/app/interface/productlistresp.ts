export interface ProductList {
  id_product_identity: number;
  name: string;
  note: string;
  active: boolean;
}

export interface Data {
  product_list: ProductList[];
}

export interface productlistresp {
  status: string;
  message: string;
  data: Data;
}
