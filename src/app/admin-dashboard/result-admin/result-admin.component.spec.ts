import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAdminComponent } from './result-admin.component';

describe('ResultAdminComponent', () => {
  let component: ResultAdminComponent;
  let fixture: ComponentFixture<ResultAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
