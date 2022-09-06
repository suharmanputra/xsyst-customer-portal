import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MenuBarService } from '../shared/menu-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  matMenu: string;
  btnmenu: string;
  showProgressBar: boolean;
  menuAdminPanel: boolean;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private menuBarService: MenuBarService
  ) {}

  ngOnInit() {
    this.menuBarService.globalBtnMenu.subscribe((result) => {
      this.btnmenu = result;
    });

    this.menuBarService.sharedLoadingAnimation.subscribe((isdisplayed) => {
      this.showProgressBar = isdisplayed;
    });

    this.menuBarService.adminMenuVisible.subscribe((result) => {
      this.menuAdminPanel = result;
    });
  }

  redirect_home() {
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    this.menuBarService.setMenuVisible(false);
    localStorage.setItem('userid', '');
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    this.router.navigateByUrl('/login');
  }
}
