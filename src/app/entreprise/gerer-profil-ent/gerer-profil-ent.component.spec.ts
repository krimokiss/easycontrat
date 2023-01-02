import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererProfilEntComponent } from './gerer-profil-ent.component';

describe('GererProfilEntComponent', () => {
  let component: GererProfilEntComponent;
  let fixture: ComponentFixture<GererProfilEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererProfilEntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererProfilEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
