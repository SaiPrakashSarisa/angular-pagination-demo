import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpensesService } from 'src/app/services/expenses.service';

interface Category {
  name : string;
  code : string;
}

interface IncomeCategory {
  name : String;
  code : String;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // toggle modals
  incomeVisible : boolean = false;
  expenceVisible : boolean = false;

  categories : Category[] = [];
  incomeCategory : IncomeCategory[] =[];

  // forms 
  expencesForm! : FormGroup; 
  incomeForm! : FormGroup;

  ngOnInit() {
    this.categories=[
      {name : 'Food', code : 'FOOD'},
      {name : 'Fashion', code : 'FASH'},
      {name : 'Travel', code : 'TRAV'},
      {name : 'Medical', code : 'MED'},
      {name : 'Entertainment', code: 'ENT'},
    ]
    this.incomeCategory= [
      {name : "SALARY", code : 'SAL'}
    ]
  }

  // constructor
  constructor(private fb: FormBuilder, private eService : ExpensesService) {
    // expences form 
    this.expencesForm = this.fb.group({
      amount : new FormControl('',[Validators.required]),
      category : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
       type : new FormControl('EXPENSE'),
    });

    // incomes form 
    this.incomeForm = this.fb.group({
      amount : new FormControl('',[Validators.required]),
      category : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      type : new FormControl('INCOME'),
    });
  }

  // set modal values
  showDialog(type : string){
    if(type === "expences"){
      this.expenceVisible = true;
    }else{
      this.incomeVisible = true;
    }
  }

  incomeSubmit(){
    this.incomeVisible = false;
    if(this.incomeForm.valid){
      console.log(this.incomeForm.value);
      this.eService.addExpences(this.incomeForm.value).subscribe(async()=> {
        console.log("hello");
      })
    }else{
      console.log('Your form is invalid');
      console.log(this.incomeForm.value);
    }
  }

  expenseSubmit(){
    this.expenceVisible = false;
    if(this.expencesForm.valid){
      console.log(this.expencesForm.value);
      this.eService.addExpences(this.expencesForm.value).subscribe(async()=> {
        await console.log("hello");
      })
    }else{
      console.log("your form is invalid");
      console.log(this.expencesForm.value);
    }
  }



}

       