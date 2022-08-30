import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Injectable()
export class XsystbackendService {
  constructor(private http: HttpClient) {}
  mainURL = 'https://apidev.galva.co.id/xsyst/';

  formatDate(date: string) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  getLogin(username: string, password: string) {
    const url = this.mainURL + 'api/customer/login/checklogin';
    const body = {
      user_name: username,
      user_password: password,
    };
    return this.http.post<loginresp>(url, body);
  }
}

interface LoginInfo {
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

interface Data {
  default_password: boolean;
  login_info: LoginInfo;
  token: string;
}

interface loginresp {
  status: string;
  message: string;
  data: Data;
}
