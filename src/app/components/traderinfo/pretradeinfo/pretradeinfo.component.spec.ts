import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretradeinfoComponent } from './pretradeinfo.component';

describe('PretradeinfoComponent', () => {
  let component: PretradeinfoComponent;
  let fixture: ComponentFixture<PretradeinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PretradeinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PretradeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
