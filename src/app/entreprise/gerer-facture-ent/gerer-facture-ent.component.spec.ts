import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererFactureEntComponent } from './gerer-facture-ent.component';

describe('GererFactureEntComponent', () => {
  let component: GererFactureEntComponent;
  let fixture: ComponentFixture<GererFactureEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererFactureEntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererFactureEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
