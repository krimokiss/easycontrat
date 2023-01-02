import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererContratEntComponent } from './gerer-contrat-ent.component';

describe('GererContratEntComponent', () => {
  let component: GererContratEntComponent;
  let fixture: ComponentFixture<GererContratEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererContratEntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererContratEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
