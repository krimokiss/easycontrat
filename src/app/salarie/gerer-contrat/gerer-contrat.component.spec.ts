import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererContratComponent } from './gerer-contrat.component';

describe('GererContratComponent', () => {
  let component: GererContratComponent;
  let fixture: ComponentFixture<GererContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
