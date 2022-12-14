import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('changepassworddialog') changepassworddialog: TemplateRef<any>;
  @ViewChild('privacypolicydialog') privacypolicydialog: TemplateRef<any>;
  hide = true;
  privacypolicystring: string;
  constructor(
    private snackBar: MatSnackBar,
    private menuBarService: MenuBarService,
    private xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);

    if (localStorage.getItem('token') != '') {
      this.xsystbackend.checktoken().subscribe((jsonObj) => {
        if (
          jsonObj.status === '00' &&
          jsonObj.data.valid === true &&
          jsonObj.data.expired === false
        ) {
          this.menuBarService.setIsAuthenticated(true);
          this.menuBarService.navigatepage('/dashboard');
        } else {
          localStorage.setItem('userid', '');
          localStorage.setItem('username', '');
          localStorage.setItem('token', '');
        }
      });
    } else {
      localStorage.setItem('userid', '');
      localStorage.setItem('username', '');
      localStorage.setItem('token', '');
    }

    this.xsystbackend.getprivacypolicy().subscribe((jsonObj) => {
      this.privacypolicystring =
        jsonObj.data.privacy_policy_list[0].privacy_policy_string;
    });
    this.menuBarService.setLoadingAnimation(false);
  }

  checkLogin(username: string, password: string) {
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend.getLogin(username, password).subscribe((jsonObj) => {
      if (jsonObj.status === '00') {
        // harus reset password jika password masih menggunakan default

        if (jsonObj.data.default_password) {
          // dialog password reset on login

          this.snackBar.open('Please Change Password for the first time', '', {
            duration: 3000,
          });

          this.openDialogWithRef(this.changepassworddialog);

          let txtpassword = document.getElementById(
            'passwordInput'
          ) as HTMLInputElement;
          let txtoldpassword = document.getElementById(
            'oldpassword'
          ) as HTMLInputElement;
          let txtnewpassword = document.getElementById(
            'newpassword'
          ) as HTMLInputElement;
          txtoldpassword.value = txtpassword.value;

          setTimeout(() => {
            txtnewpassword.focus();
          }, 300);
        } else {
          //navigate ke dashboard
          this.menuBarService.setIsAuthenticated(true);
          this.menuBarService.navigatepage('dashboard');
        }

        localStorage.setItem(
          'userid',
          String(jsonObj.data.login_info.id_customer_login_user)
        );
        localStorage.setItem('username', jsonObj.data.login_info.username);
        localStorage.setItem('token', jsonObj.data.token);
      } else {
        this.snackBar.open(jsonObj.message, 'Ok', {
          duration: 3000,
        });
      }
    });
    this.menuBarService.setLoadingAnimation(false);
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  changepassword(oldpassword: string, newpassword: string) {
    if (oldpassword === '') {
      this.snackBar.open('Old password cant be empty', 'Ok', {
        duration: 3000,
      });
    } else {
      if (newpassword === '') {
        this.snackBar.open('New password cant be empty', 'Ok', {
          duration: 3000,
        });
      } else {
        this.menuBarService.setLoadingAnimation(true);
        let id_cust_login = Number(localStorage.getItem('userid'));
        this.xsystbackend
          .changepassword(id_cust_login, oldpassword, newpassword)
          .subscribe((jsonObj) => {
            if (jsonObj.status === '00') {
              this.menuBarService.setIsAuthenticated(true);
              this.menuBarService.navigatepage('dashboard');
            } else {
              this.snackBar.open(jsonObj.message, 'Ok', {
                duration: 3000,
              });
            }
          });
      }
    }
    this.menuBarService.setLoadingAnimation(false);
  }
}
