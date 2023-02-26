import { Router } from '@angular/router';
import { Entreprise } from 'src/app/models/entreprise.model';
import { Salarie } from 'src/app/models/salarie.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginentrepriseComponent } from './loginentreprise.component';

describe('LoginentrepriseComponent', () => {
  let component: LoginentrepriseComponent;
  let fixture: ComponentFixture<LoginentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginentrepriseComponent ],
      providers:[
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  DataService,
  Salarie,
  Entreprise,
  Router
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

