import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  generateExcel(data : any[], fileName : string) : void {

   
    const ws : XLSX.WorkSheet = XLSX.utils.json_to_sheet(data); // copying json to excel and creatinga sheet

    // logic add styling to sheet

    for(const cellAddress in ws){
      if(ws.hasOwnProperty(cellAddress)){
        // skip no data cells
        if(cellAddress[0] === '!') continue ;

        const cell = ws[cellAddress];
        const cellValue = cell.v; 

        console.log(cellValue);

        if(cellValue === 'EXPENSE'){
          console.log('value is expense')
          // cell.s.color = {rgb : 'red'};
          cell.s ={color  : {rgb : 'red'} } ;
        }else if(cellValue === 'INCOME'){
          console.log('value is income')
          cell.s = {color : {rgb : 'green'}};
        }
      }
    }

    // creating work book

    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    const excelBuffer : any = XLSX.write(wb, {bookType : 'xlsx', type : 'array', cellStyles : true});
    const blob = new Blob([excelBuffer], {type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  }
}
