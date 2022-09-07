import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { loginresp } from '../interface/loginresp';
import { ChangepasswordResp } from '../interface/changepassword';
import { CustomerLoginDataResp } from '../interface/customerlogindata';
import { tokencheckresp } from '../interface/tokencheckresp';
import { contractlistresp } from '../interface/contractlistresp';
import { productlistresp } from '../interface/productlistresp';

@Injectable()
export class XsystbackendService {
  constructor(private http: HttpClient) {}
  mainURL = 'https://apidev.galva.co.id/xsyst/';
  // mainURL = 'https://localhost:44359/';

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

  changepassword(
    id_cust_login: number,
    oldpassword: string,
    newpassword: string
  ) {
    const url = this.mainURL + 'api/customer/login/changepassword';
    const body = {
      id_customer_login_user: id_cust_login,
      old_password: oldpassword,
      new_password: newpassword,
    };
    return this.http.put<ChangepasswordResp>(url, body);
  }

  getcustomerlogindatabyidcustomerlogin() {
    const url = this.mainURL + 'api/customer/login/id';
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.get<CustomerLoginDataResp>(url, {
      headers,
    });
  }

  updateprofil(fullname: string, email: string, phone: string) {
    const url = this.mainURL + 'api/customer/login/updateinfo';
    const body = {
      id_customer_login_user: localStorage.getItem('userid'),
      fullname: fullname,
      email: email,
      phone: phone,
    };

    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.put<ChangepasswordResp>(url, body, {
      headers,
    });
  }

  checktoken() {
    const url = this.mainURL + 'api/token/checkcustomerlogin';
    const body = {
      jwt: localStorage.getItem('token'),
    };
    return this.http.post<tokencheckresp>(url, body);
  }

  getallcontract() {
    const url = this.mainURL + 'api/customer/login/getallcontract';
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.get<contractlistresp>(url, {
      headers,
    });
  }

  getallproduct(id_contract: string) {
    const url = this.mainURL + 'api/customer/login/getallproduct';
    const body = {
      id_contract: id_contract,
    };
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.post<productlistresp>(url, body, {
      headers,
    });
  }
}
