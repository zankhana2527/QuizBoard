import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeadComponent } from './assign-lead.component';

describe('AssignLeadComponent', () => {
  let component: AssignLeadComponent;
  let fixture: ComponentFixture<AssignLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
