import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexpageComponent } from './indexpage.component';

describe('IndexpageComponent', () => {
  let component: IndexpageComponent;
  let fixture: ComponentFixture<IndexpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexpageComponent]
    });
    fixture = TestBed.createComponent(IndexpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
