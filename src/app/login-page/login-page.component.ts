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
    this.menuBarService.setMenuVisible(false);
  }

  checkLogin(username: string, password: string) {
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend.getLogin(username, password).subscribe((jsonObj) => {
      if (jsonObj.status === '00') {
        if (jsonObj.data.default_password) {
          this.snackBar.open('Please Change Password for the first time', '', {
            duration: 3000,
          });
          this.menuBarService.setLoadingAnimation(false);
          this.openDialogWithRef(this.changepassworddialog);
        } else {
          this.menuBarService.setIsAuthenticated(true);
          this.router.navigateByUrl('/dashboard');
          localStorage.setItem(
            'userid',
            btoa(jsonObj.data.login_info.username)
          );
          localStorage.setItem('username', btoa(username.toLowerCase()));
        }
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

  changepassword(oldpassword: string, newpassword: string) {
    let id_cust_login = BigInt(localStorage.getItem('store_owner_ad_contacts'));
    this.xsystbackend
      .changepassword(id_cust_login, oldpassword, newpassword)
      .subscribe((jsonObj) => {
        if (jsonObj.status === '00') {
          this.menuBarService.setIsAuthenticated(true);
          this.router.navigateByUrl('/dashboard');
        }
      });
  }
}
