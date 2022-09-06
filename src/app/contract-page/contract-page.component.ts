import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { contractlistresp } from '../interface/contractlistresp';

export interface ListContract {
  id_contract: number;
  id_owner: number;
  owner_name: string;
  contract_no: string;
  contract_date: Date;
  contract_start_date: Date;
  contract_estimated_end_date: Date;
  kode_sales: string;
  nama_sales: string;
}

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.css'],
})
export class ContractPageComponent implements OnInit {
  displayedColumns: string[] = [
    'id_contract',
    'id_owner',
    'owner_name',
    'contract_no',
    'contract_date',
    'contract_start_date',
    'contract_estimated_end_date',
    'nama_sales',
  ];

  dataSource: MatTableDataSource<ListContract>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public menuBarService: MenuBarService,
    public xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend.getallcontract().subscribe((jsonObj) => {
      // console.log(jsonObj);
      this.dataSource = new MatTableDataSource(jsonObj.data.list_contract);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.menuBarService.setLoadingAnimation(false);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
