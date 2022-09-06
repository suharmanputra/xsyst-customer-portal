export interface Data2 {
  id_customer_login_user: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
}

export interface Data {
  valid: boolean;
  expired: boolean;
  data: Data2;
}

export interface tokencheckresp {
  status: string;
  message: string;
  data: Data;
}
