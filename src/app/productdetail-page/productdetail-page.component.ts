import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUtil } from '../shared/table-util';
import { CounterHistory } from '../interface/productdetailresp';
import { DeviceDeliveryHistory } from '../interface/productdetailresp';
import { ServiceHistory } from '../interface/productdetailresp';
import { PartsReplacementHistory } from '../interface/productdetailresp';
import { ConsumableRequestHistory } from '../interface/productdetailresp';

@Component({
  selector: 'app-productdetail-page',
  templateUrl: './productdetail-page.component.html',
  styleUrls: ['./productdetail-page.component.css'],
})
export class ProductdetailPageComponent implements OnInit {
  discolCounterHistory: string[] = [
    'collection_date',
    'mono_copy',
    'mono_print',
    'mono_large_copy',
    'mono_large_print',
    'color_copy',
    'color_print',
    'color_large_copy',
    'color_large_print',
  ];

  discolDeviceDelivery: string[] = ['doc_date', 'delivery_type', 'doc_no'];
  discolServiceHistory: string[] = ['req_date', 'svo_type', 'svo_no'];
  discolPartHistory: string[] = ['doc_date', 'doc_no'];
  discolConsumableHistory: string[] = ['req_date', 'svo_no'];

  dsCounterHistory: MatTableDataSource<CounterHistory>;
  dsDeviceDelivery: MatTableDataSource<DeviceDeliveryHistory>;
  dsServiceHistory: MatTableDataSource<ServiceHistory>;
  dsPartHistory: MatTableDataSource<PartsReplacementHistory>;
  dsConsumableHistory: MatTableDataSource<ConsumableRequestHistory>;

  @ViewChild(MatPaginator) paginatorcounter: MatPaginator;
  @ViewChild(MatPaginator) paginatordelivery: MatPaginator;
  @ViewChild(MatPaginator) paginatorservice: MatPaginator;
  @ViewChild(MatPaginator) paginatorpart: MatPaginator;
  @ViewChild(MatPaginator) paginatorconsumable: MatPaginator;
  @ViewChild(MatSort) sortcounter: MatSort;
  @ViewChild(MatSort) sortdelivery: MatSort;
  @ViewChild(MatSort) sortservice: MatSort;
  @ViewChild(MatSort) sortpart: MatSort;
  @ViewChild(MatSort) sortconsumable: MatSort;

  constructor(
    private actRouter: ActivatedRoute,
    private snackBar: MatSnackBar,
    public menuBarService: MenuBarService,
    public xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);

    this.menuBarService.setMenuVisible(true);
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend
      .getproductdetail(this.actRouter.snapshot.params['idproduct'])
      .subscribe((jsonObj) => {
        //counter hostory
        this.dsCounterHistory = new MatTableDataSource(
          jsonObj.data.counter_history
        );
        this.dsCounterHistory.paginator = this.paginatorcounter;
        this.dsCounterHistory.sort = this.sortcounter;

        //device delivery
        this.dsDeviceDelivery = new MatTableDataSource(
          jsonObj.data.device_delivery_history
        );
        this.dsDeviceDelivery.paginator = this.paginatordelivery;
        this.dsDeviceDelivery.sort = this.sortcounter;

        //Service History
        this.dsServiceHistory = new MatTableDataSource(
          jsonObj.data.service_history
        );
        this.dsServiceHistory.paginator = this.paginatorservice;
        this.dsServiceHistory.sort = this.sortservice;

        //Part History
        this.dsPartHistory = new MatTableDataSource(
          jsonObj.data.parts_replacement_history
        );
        this.dsPartHistory.paginator = this.paginatorpart;
        this.dsPartHistory.sort = this.sortservice;

        //Consumable History
        this.dsConsumableHistory = new MatTableDataSource(
          jsonObj.data.consumable_request_history
        );
        this.dsConsumableHistory.paginator = this.paginatorconsumable;
        this.dsConsumableHistory.sort = this.sortconsumable;

        this.menuBarService.setLoadingAnimation(false);
      });
  }

  applyFilterCounterHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsCounterHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsCounterHistory.paginator) {
      this.dsCounterHistory.paginator.firstPage();
    }
  }

  applyFilterDeviceDelivery(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsDeviceDelivery.filter = filterValue.trim().toLowerCase();
    if (this.dsDeviceDelivery.paginator) {
      this.dsDeviceDelivery.paginator.firstPage();
    }
  }

  applyFilterServiceHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsServiceHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsServiceHistory.paginator) {
      this.dsServiceHistory.paginator.firstPage();
    }
  }

  applyFilterPartHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsPartHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsPartHistory.paginator) {
      this.dsPartHistory.paginator.firstPage();
    }
  }

  applyFilterConsumableHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsConsumableHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsConsumableHistory.paginator) {
      this.dsConsumableHistory.paginator.firstPage();
    }
  }

  exporttable(tableid: string) {
    TableUtil.exportTableToExcel(tableid, tableid);
  }
}
