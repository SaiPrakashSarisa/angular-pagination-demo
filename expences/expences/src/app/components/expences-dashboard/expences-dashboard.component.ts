import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { HttpResponse } from '@angular/common/http';
import { ExcelService } from 'src/app/services/excel.service';
import { Table } from 'primeng/table';

interface Expenses  {
  amount : Number,
  categorie : String,
  date : String,
  desc : String,
  type : String,
  _id : String
}


interface Column {
  field : String,
  header : String
}

@Component({
  selector: 'app-expences-dashboard',
  templateUrl: './expences-dashboard.component.html',
  styleUrls: ['./expences-dashboard.component.scss']
})
export class ExpencesDashboardComponent {

  expenses : Expenses[] = [] ;
  selectedExpenses : Expenses[] = [];

  // switch tables
  showFilters : boolean = true;
  // primeNg table with filter data
  loading : boolean = true;
  activityValues: number[] = [0, 100];
  //ends

  // for primengTable
  cols : Column[] = [];

  exportColumns : any[] =[];

  constructor(private eService : ExpensesService, private excelService : ExcelService) {}

  ngOnInit () {
     this.eService.getExpenses().subscribe(async (res : HttpResponse<any>) => {
      let data = await JSON.parse(res.body.body);
      console.log(data.data);
      this.expenses = data.data;
      this.loading = false;
    });

    console.log(this.expenses)

    this.cols = [
      {field : 'date', header : 'Date'},
      {field : 'amount', header : 'Amount'},
      {field : 'type', header : 'Type'},
      {field : 'categorie', header : 'Category'},
      {field : 'desc', header : 'Description'}
    ]

    this.exportColumns = this.cols.map(col => ({title : col.header, dataKey : col.field}));
  }

  downloadExcel(){
    this.excelService.generateExcel(this.expenses, 'MyExpenses');
  }

  clear(table: Table) {
        table.clear();
  }

  getSeverity(status: string) :any{
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    }
}
