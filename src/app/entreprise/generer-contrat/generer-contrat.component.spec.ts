import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GenererContratComponent } from './generer-contrat.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('GenererContratComponent', () => {
  let component: GenererContratComponent;
  let fixture: ComponentFixture<GenererContratComponent>;
   let mockDataService;

   beforeEach(async () => {
    mockDataService = jasmine.createSpyObj(['getallContratByEnt']);

    await TestBed.configureTestingModule({
      declarations: [ GenererContratComponent ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DataService, useValue: mockDataService }, FormBuilder, MatDialog, HttpClient, Overlay
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenererContratComponent);
    component = fixture.componentInstance;

    mockDataService.getallContratByEnt.and.returnValue(of([{contrat_id: 85, fki_entreprise: 10, fki_salarie: 9}]));

    fixture.detectChanges();
  });

  it('should get all contrat by entreprise', () => {
    expect(mockDataService.getallContratByEnt).toHaveBeenCalled();
    expect(component.contratByEnt.length).toEqual(1);
    expect(component.contratByEnt[0].contrat_id).toEqual(85);
    expect(component.contratByEnt[0].fki_entreprise).toEqual(10);
    expect(component.contratByEnt[0].fki_salarie).toEqual(9);
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(GenererContratComponent);
  //   component = fixture.componentInstance;

  //   mockDataService.getAllSalarie.and.returnValue(of([{salarie_id: 1, nom: 'Dupont', prenom: 'Jean'}]));

  //   fixture.detectChanges();
  // });

  // it('should get all salarie', () => {
  //   expect(mockDataService.getAllSalarie).toHaveBeenCalled();
  //   expect(component.allSalarie.length).toEqual(1);
  //   expect(component.allSalarie[0].salarie_id).toEqual(1);
  //   expect(component.allSalarie[0].nom).toEqual('Dupont');
  //   expect(component.allSalarie[0].prenom).toEqual('Jean');
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(GenererContratComponent);
  //   component = fixture.componentInstance;

  //   mockDataService.getProfilEntreprise.and.returnValue(of({entreprise_id: 1, nom: 'ABC'}));

  //   fixture.detectChanges();
  // });

  // it('should get entreprise profile', () => {
  //   expect(mockDataService.getProfilEntreprise).toHaveBeenCalled();
  //   expect(component.profil.entreprise_id).toEqual(1);
  //   expect(component.profil.nom).toEqual('ABC');
  // });

});
