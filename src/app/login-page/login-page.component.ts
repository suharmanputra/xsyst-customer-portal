import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuBarService } from '../shared/menu-bar.service';
import { XsystbackendService } from '../shared/xsystbackend.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private menuBarService: MenuBarService,
    private xsystbackend: XsystbackendService
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);
  }

  checkLogin(username: string, password: string) {
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend.getLogin(username, password).subscribe((jsonObj) => {
      if (jsonObj.status === '00') {
        this.menuBarService.setIsAuthenticated(true);
        this.router.navigateByUrl('/dashboard');
        localStorage.setItem('userid', btoa(jsonObj.data.login_info.username));
        localStorage.setItem('username', btoa(username.toLowerCase()));
      } else {
        this.snackBar.open(jsonObj.message, 'Ok', {
          duration: 3000,
        });
      }
      this.menuBarService.setLoadingAnimation(false);
    });
  }
}
