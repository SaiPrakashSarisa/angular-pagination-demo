import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable, map } from 'rxjs';

interface Expence {
  amount : Number,
  category : {
    name : String,
    code : String
  },
  description : String,
  type : String
}

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http : HttpClient) { }

  addExpences(expense : Expence) {
    console.log(expense, "expenses from service");
    return this.http.post('http://172.17.12.160:1001/user/expences', {expense});
  }

   getExpenses(): Observable<HttpResponse<any>> {
    return this.http.get('http://172.17.12.160:1001/user/allExpences', { observe: 'response' });
  }
}
