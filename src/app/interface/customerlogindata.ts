export interface CustomerLoginList {
  id_customer_login_user: number;
  id_customer: number;
  active: boolean;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  created_by: string;
  created_date: Date;
  last_updated_by: string;
  last_updated_date: Date;
}

export interface Data {
  customer_login_list: CustomerLoginList[];
}

export interface CustomerLoginDataResp {
  status: string;
  message: string;
  data: Data;
}
