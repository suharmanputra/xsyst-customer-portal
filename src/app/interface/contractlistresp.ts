export interface ListContract {
  id_contract: number;
  id_owner: number;
  owner_name: string;
  contract_no: string;
  contract_date: Date;
  contract_start_date: Date;
  contract_estimated_end_date: Date;
  kode_sales: string;
  nama_sales: string;
}

export interface Data {
  list_contract: ListContract[];
}

export interface contractlistresp {
  status: string;
  message: string;
  data: Data;
}
