import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusinfoandrequestComponent } from './statusinfoandrequest.component';

describe('StatusinfoandrequestComponent', () => {
  let component: StatusinfoandrequestComponent;
  let fixture: ComponentFixture<StatusinfoandrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusinfoandrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusinfoandrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
