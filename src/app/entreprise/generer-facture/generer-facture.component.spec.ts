import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererFactureComponent } from './generer-facture.component';

describe('GenererFactureComponent', () => {
  let component: GenererFactureComponent;
  let fixture: ComponentFixture<GenererFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenererFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
