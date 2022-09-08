import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { XsystbackendService } from '../shared/xsystbackend.service';
@Injectable()
export class MenuBarService {
  private btnMenu = new BehaviorSubject('menu');
  private btnNav = new BehaviorSubject('nav');
  globalBtnMenu = this.btnMenu;
  globalnavbutton = this.btnNav;
  private isAdmin = new BehaviorSubject(false);
  adminMenuVisible = this.isAdmin;
  private isAuthenticated = new BehaviorSubject(false);
  globalIsAuthenticated = this.isAuthenticated;
  private loadingAnimation = new BehaviorSubject(false);
  sharedLoadingAnimation = this.loadingAnimation;

  constructor(
    private router: Router,
    private xsystbackend: XsystbackendService
  ) {}

  setMenuVisible(isonloginpage: boolean, ondashboard: boolean = false) {
    if (isonloginpage) {
      this.btnMenu.next('myMenu');

      if (ondashboard) {
        this.btnNav.next('backbuttonhide');
      } else {
        this.btnNav.next('backbutton');
      }
    } else {
      this.btnMenu.next('myMenuHide');
    }
  }
  setIsAuthenticated(isAuth: boolean) {
    this.isAuthenticated.next(isAuth);
  }
  setLoadingAnimation(isDisplay: boolean) {
    this.loadingAnimation.next(isDisplay);
  }

  checkloginbytoken() {
    if (localStorage.getItem('token') != '') {
      this.xsystbackend.checktoken().subscribe((jsonObj) => {
        if (
          jsonObj.status === '00' &&
          jsonObj.data.valid === true &&
          jsonObj.data.expired === false
        ) {
          this.setIsAuthenticated(true);
        } else {
          this.router.navigateByUrl('/');
        }
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  navigatepage(url: string) {
    this.router.navigateByUrl('/' + url);
  }
}
