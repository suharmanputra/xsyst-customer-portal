import { Component, OnInit } from '@angular/core';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
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
  fullname: string;
  email: string;
  phone: string;
  constructor(
    private snackBar: MatSnackBar,
    public menuBarService: MenuBarService,
    public xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.checkloginbytoken();
    this.username = localStorage.getItem('username');
    this.menuBarService.setMenuVisible(true, true);
    this.menuBarService.setLoadingAnimation(false);

    this.menuBarService.globalIsAuthenticated.subscribe((result) => {
      if (result === false) {
        this.menuBarService.navigatepage('/');
      } else {
      }
    });
  }

  openSetting() {
    this.xsystbackend
      .getcustomerlogindatabyidcustomerlogin()
      .subscribe((jsonObj) => {
        if (jsonObj.status === '00') {
          this.fullname = jsonObj.data.customer_login_list[0].fullname;
          this.email = jsonObj.data.customer_login_list[0].email;
          this.phone = jsonObj.data.customer_login_list[0].phone;
          this.openDialogWithRef(this.settingdialog);

          setTimeout(() => {
            (
              document.getElementById('txtfullname') as HTMLInputElement
            ).focus();
          }, 300);
        } else {
          this.snackBar.open(jsonObj.message, 'Ok', {
            duration: 3000,
          });
        }
      });
  }

  updateProfil(fullname: string, email: string, phone: string) {
    this.xsystbackend
      .updateprofil(fullname, email, phone)
      .subscribe((jsonObj) => {
        if (jsonObj.status === '00') {
          this.closeDialog();
        } else {
        }
        this.snackBar.open(jsonObj.message, 'Ok', {
          duration: 3000,
        });
      });
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
