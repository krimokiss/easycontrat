import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererSalariesEntComponent } from './gerer-salaries-ent.component';

describe('GererSalariesEntComponent', () => {
  let component: GererSalariesEntComponent;
  let fixture: ComponentFixture<GererSalariesEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererSalariesEntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererSalariesEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
