import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureModalComponent } from './facture-modal.component';

describe('FactureModalComponent', () => {
  let component: FactureModalComponent;
  let fixture: ComponentFixture<FactureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
