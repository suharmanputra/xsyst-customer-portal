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
  constructor(public menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.checkloginbytoken();

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
    // let urlsplitlen: number = window.location.href.split('/').length - 1;

    let backurl: string = window.location.href.split('#')[1],
      lasturl: string = backurl.split('/')[backurl.split('/').length - 1],
      backurlroute: string = '';
    console.log(lasturl);
    console.log(Number.isInteger(parseInt(lasturl)));
    if (Number.isInteger(backurl.split('/')[backurl.split('/').length - 1])) {
      for (let i: number = 0; i < backurl.split('/').length - 2; i++) {
        backurlroute += backurl.split('/')[i] + '/';
      }
    } else {
      for (let i: number = 0; i < backurl.split('/').length - 1; i++) {
        backurlroute += backurl.split('/')[i] + '/';
      }
    }
    // for (let i: number = 0; i < urlsplitlen; i++) {
    //   if (i == urlsplitlen - 1) {
    //     if (!Number.isInteger(window.location.href.split('/')[i])) {
    //       backurl += window.location.href.split('/')[i] + '/';
    //     }
    //   } else {
    //     backurl += window.location.href.split('/')[i] + '/';
    //   }
    // }
    // backurl = backurl.slice(0, -1);
    console.log(backurlroute);
    // this.menuBarService.navigatepage(backurl.split('#')[1]);
  }
}
