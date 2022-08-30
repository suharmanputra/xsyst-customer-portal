export interface LoginInfo {
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
  default_password: boolean;
  login_info: LoginInfo;
  token: string;
}

export interface loginresp {
  status: string;
  message: string;
  data: Data;
}
