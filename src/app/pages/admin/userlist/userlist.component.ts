import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  allItems!: any[];
  dateFormat = (val: any) => moment(val).format("DD-MM-YYYY");
  isLoading: boolean = false;
  columnDefs: ColDef[] = [
    {
      field: '',
      maxWidth: 60,
      headerCheckboxSelection: false,
      checkboxSelection: true,
    },
    { field: 'id', headerName: 'Id', sort: 'desc' },
    {
      field: 'first_name',
      headerName: 'First Name',
      getQuickFilterText: (params) => {
        return params.value;
      },
    },
    {
      field: 'middle_name',
      headerName: 'Middle Name',
      getQuickFilterText: (params) => {
        return params.value;
      },
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      getQuickFilterText: (params) => {
        return params.value;
      },
    },
    {
      field: "email",
      headerName: 'Email'
    },
    {
      field: "gender",
      headerName: "Gender"
    },
    {
      field: "zip_code",
      headerName: "ZipCode"
    },
    {
      field: "martialstatus",
      headerName: "Married?"
    },
    {
      field: "is_online",
      headerName: "Online/Offline",
      valueFormatter: (val: any) => val ? 'Online' : 'Offline'
    },
    {
      field: 'createdAt', valueFormatter: this.dateFormat, headerName: 'Created Date'
    }
  ];
  gridApi!: GridApi;
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    resizable: true,
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getGirdData();
  }

  getGirdData() {
    this.isLoading = true;
    this.adminService.getUserList().subscribe(
      data => {
        this.allItems = data.data;
      }
    )
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(""
      // this.searchQuery
    );
  }
  onRowSelected(nodes: RowSelectedEvent) {
  }

}
