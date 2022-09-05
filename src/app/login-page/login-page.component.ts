import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('changepassworddialog') changepassworddialog: TemplateRef<any>;
  hide = true;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private menuBarService: MenuBarService,
    private xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setIsAuthenticated(true);
    this.menuBarService.setMenuVisible(false);
    this.router.navigateByUrl('/dashboard');
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

          this.menuBarService.setLoadingAnimation(false);
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
        } else {
          //navigate ke dashboard
          this.menuBarService.setIsAuthenticated(true);
          this.router.navigateByUrl('/dashboard');
        }

        localStorage.setItem(
          'userid',
          String(jsonObj.data.login_info.id_customer_login_user)
        );
        localStorage.setItem('username', jsonObj.data.login_info.username);
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
              this.router.navigateByUrl('/dashboard');
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
