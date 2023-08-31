import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesDashboardComponent } from './expences-dashboard.component';

describe('ExpencesDashboardComponent', () => {
  let component: ExpencesDashboardComponent;
  let fixture: ComponentFixture<ExpencesDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpencesDashboardComponent]
    });
    fixture = TestBed.createComponent(ExpencesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
