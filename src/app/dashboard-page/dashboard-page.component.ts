import { Component, OnInit } from '@angular/core';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('settingdialog') settingdialog: TemplateRef<any>;
  username: string;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private menuBarService: MenuBarService,
    private xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.globalIsAuthenticated.subscribe((result) => {
      if (result === false) {
        this.router.navigateByUrl('/');
      } else {
      }
    });
  }

  openSetting() {
    this.xsystbackend
      .getcustomerlogindatabyidcustomerlogin()
      .subscribe((jsonObj) => {
        if (jsonObj.status === '00') {
          // let txtusername = document.getElementById(
          //   'txtusername'
          // ) as HTMLInputElement;

          // let txtfullname = document.getElementById(
          //   'txtfullname'
          // ) as HTMLInputElement;

          // let txtemail = document.getElementById(
          //   'txtemail'
          // ) as HTMLInputElement;

          // let txtphone = document.getElementById(
          //   'txtphone'
          // ) as HTMLInputElement;

          console.log(jsonObj.data.customer_login_list[0].username);
          console.log(this.username);
          // txtusername.value = jsonObj.data.customer_login_list[0].username;
          // txtfullname.value = jsonObj.data.customer_login_list[0].fullname;
          // txtemail.value = jsonObj.data.customer_login_list[0].email;
          // txtphone.value = jsonObj.data.customer_login_list[0].phone;

          this.openDialogWithRef(this.settingdialog);
        } else {
          this.snackBar.open(jsonObj.message, 'Ok', {
            duration: 3000,
          });
        }
      });
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }
}
