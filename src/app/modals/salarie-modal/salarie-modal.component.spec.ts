import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieModalComponent } from './salarie-modal.component';

describe('SalarieModalComponent', () => {
  let component: SalarieModalComponent;
  let fixture: ComponentFixture<SalarieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarieModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
