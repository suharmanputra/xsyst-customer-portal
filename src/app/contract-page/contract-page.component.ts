import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListContract } from '../interface/contractlistresp';

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.css'],
})
export class ContractPageComponent implements OnInit {
  displayedColumns: string[] = [
    'owner_name',
    'contract_no',
    'contract_date',
    'contract_start_date',
    'contract_estimated_end_date',
    'nama_sales',
    'detail',
  ];

  dataSource: MatTableDataSource<ListContract>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    public menuBarService: MenuBarService,
    public xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
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

  showdetail(id_contract: number) {
    this.menuBarService.navigatepage(
      'dashboard/contract/product?id=' + id_contract
    );
  }
}
