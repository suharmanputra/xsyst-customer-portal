import { Component, OnInit } from '@angular/core';
import { MenuBarService } from '../shared/menu-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  matMenu: string;
  btnmenu: string;
  btnNav: string;
  showProgressBar: boolean;
  menuAdminPanel: boolean;
  constructor(private menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.globalBtnMenu.subscribe((result) => {
      this.btnmenu = result;
    });

    this.menuBarService.globalnavbutton.subscribe((result) => {
      this.btnNav = result;
    });

    this.menuBarService.sharedLoadingAnimation.subscribe((isdisplayed) => {
      this.showProgressBar = isdisplayed;
    });

    this.menuBarService.adminMenuVisible.subscribe((result) => {
      this.menuAdminPanel = result;
    });
  }

  redirect_home() {
    this.menuBarService.navigatepage('/dashboard');
  }

  redirect_back() {
    // console.log(window.location.href);
    let urlsplitlen: number = window.location.href.split('/').length - 1;

    let backurl: string = '';

    for (let i: number = 0; i < urlsplitlen; i++) {
      backurl += window.location.href.split('/')[i] + '/';
    }
    backurl = backurl.slice(0, -1);
    this.menuBarService.navigatepage(backurl.split('#')[1]);
  }

  logout() {
    this.menuBarService.setMenuVisible(false);
    localStorage.setItem('userid', '');
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    this.menuBarService.navigatepage('/login');
  }
}
