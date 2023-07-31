import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  users : any = {};
  totalItems : number = 0;
  currentPage : number = 1;
  itemsPerPage : number = 3;
  totalPages  : number = 0;

  constructor(private http : HttpClient) {}

  ngOnInit() :void {
    this.getUsers();
  }

  getUsers():void {
    
    const skip = (this.currentPage -1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
    const url = `http://localhost:3000/users?skip=${skip}&limit=${limit}`;

    this.http.get(url).subscribe((response:any) => {
      console.log(response);
      this.users = response.data;
      this.totalItems = response.count;

      if(this.totalItems % this.itemsPerPage == 0){
        this.totalPages = this.totalItems / this.itemsPerPage;
      }else{
        this.totalPages = (this.totalItems / this.itemsPerPage) + 1;
      }

    console.log(`Total Pages ${this.totalPages}`);
    });

  }

  
  nextpage():void{
    if(this.totalItems/this.itemsPerPage > this.currentPage){
      this.currentPage++;
      this.getUsers();
    }
    else{
      console.log(`you have reached the page end`);
    }
  }

  previous():void {
    if(this.currentPage > 1){
      this.currentPage--;
      this.getUsers();
    }
    else{
      console.log(`your in the first page`);
    }
  }

  onPageClick(pageNumber : number):void {
    this.currentPage = pageNumber;
    this.getUsers();
  }
}
