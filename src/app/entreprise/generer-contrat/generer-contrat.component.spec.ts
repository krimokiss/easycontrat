import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererContratComponent } from './generer-contrat.component';

describe('GenererContratComponent', () => {
  let component: GenererContratComponent;
  let fixture: ComponentFixture<GenererContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenererContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
