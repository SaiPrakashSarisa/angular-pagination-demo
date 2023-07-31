import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  // Make a GET request using query parameter
  users(){
    this.http.get('http://localhost:3000/users', {
      params: new HttpParams().set('pageSize', '10').set('page', '2')
    }).subscribe(data => {
      console.log(data);
    })
  }


  // Make aGET request usign HTTP headers
  getUsers(){
    this.http.get('http://localhost:3000/users', {observe: 'response'}).subscribe(response => {
      const linkHeader = response.headers.get('Link');
      const links = linkHeader?.split(',');
      const prevLink = links?.find(l => l.includes('rel="prev"'));
      const nextLink = links?.find(l => l.includes('rel="next"'));
      console.log(prevLink, nextLink);
    })
  }


}
