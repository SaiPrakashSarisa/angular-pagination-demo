import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as reader from 'xlsx'

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

  // for primengTable
  cols : Column[] = [];

  exportColumns : any[] =[];

  constructor(private eService : ExpensesService) {}

  ngOnInit () {
     this.eService.getExpenses().subscribe(async (res : HttpResponse<any>) => {
      let data = await JSON.parse(res.body.body);
      console.log(data.data);
      this.expenses = data.data;
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

  writeData(){
    const file = reader.readFile('C:/Users/C45688/Downloads/expenses_exports.xlsx');
   
    const writer = reader.utils.json_to_sheet(this.expenses);
    console.log(writer);
    reader.utils.book_append_sheet(file, writer, 'sheet 1');
    reader.writeFile(file,'C:/Users/C45688/Downloads/expenses_exports.xlsx' );
  }

  // // export as Excel
  // exportExcel(){
  //   import('xlsx').then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.expenses);
  //     const workbook = {Sheets : {'data' : worksheet }, SheetNames : ['Expenses'] };
  //     const excelBuffer : any = xlsx.write(workbook, {bookType : 'xlsx', type : 'array' });
  //     this.saveAsExcelFile(excelBuffer, "expenses");
  //   })
  // }

  // saveAsExcelFile(buffer : any , fileName : string) : void {
  //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   let EXCEL_EXTENSION = '.xlsx';
  //   const data : Blob = new Blob([buffer], {
  //     type : EXCEL_TYPE
  //   });
  //   saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

}
