import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/core/service/admin.service';
import { ApiHttpService } from 'src/app/core/service/api-http.service';
import { Profession } from 'src/app/shared/interfaces/profession.type';
import { CellClickedEvent, ColDef, GridReadyEvent, GridApi, RowSelectedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { CustomService } from 'src/app/core/service/custom.service';
import { ToasterService } from 'src/app/core/service/ToasterServices/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-new-preference',
  templateUrl: './add-new-preference.component.html',
  styleUrls: ['./add-new-preference.component.scss']
})
export class AddNewPreferenceComponent {

  allItems!: any[];
  @Input() label!: string;
  @Input() name!: string;
  dateFormat = (val: any) => moment(val).format("DD-MM-YYYY");
  columnDefs: ColDef[] = [
    {
      field: '',
      maxWidth: 60,
      headerCheckboxSelection: false,
      checkboxSelection: true,
    },
    { field: 'id', headerName: 'Id', sort:'desc' },
    {
      field: 'name',
      headerName: 'Name',
      getQuickFilterText: (params) => {
        return params.value;
      },
    },
    {
      field: 'createdAt', valueFormatter: this.dateFormat, headerName: 'Created Date'
    }
  ];
  gridApi!: GridApi;
  searchQuery: string = '';
  disableAdd: boolean = true;
  isLoading: boolean = false;
  disableDelete: boolean = true;

  // DefaultColDef sets props common to all Columns
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    resizable: true,
  };

  constructor(private adminService: AdminService, private toast: ToasterService, private dialog: MatDialog) { }

  Add() {
    this.adminService.addNewPrefrences(`admin/${this.name}/`, { name: this.searchQuery }).subscribe(
      (data: any) => {
        this.searchQuery = "";
        this.toast.Sucess("Suceess", "Item added successfully", 2000);
        this.getGirdData();
      }, (err: any) => {
        this.toast.Error("Failed...", "Can't add. Please try again later", 2000);
      });
  }

  deleteClick() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: true, data: { title: "Confirm", content: "Are you sure??" } });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.closeType == "confirm") {
        this.gridApi.getSelectedRows().forEach((ele: any) => {
          this.adminService.deleteItem(`admin/${this.name}/${ele.id}/`).subscribe((data: any) => {
            this.searchQuery = "";
            this.toast.Sucess("Suceess", "Item deleted successfully", 2000);
            this.getGirdData();
            this.disableDelete = true;
          }, (err: any) => {
            this.toast.Error("Failed...", "Can't delete. Please try again later", 2000);
          })
        })
      }
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getGirdData();
  }

  getGirdData() {
    this.isLoading = true;
    this.adminService.getItem(`get/${this.name}/`).subscribe(
      (data: any[]) => {
        this.allItems = data;
        this.isLoading = false;
      })
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      this.searchQuery
    );
    this.disableAdd = this.gridApi.getDisplayedRowCount() === 0;
  }
  onRowSelected(nodes: RowSelectedEvent) {
    this.disableDelete = this.gridApi.getSelectedRows().length === 0;
  }
}
