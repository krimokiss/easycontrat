import { ContratModalComponent } from './../../modals/contrat-modal/contrat-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contrat } from './../../models/contrat.model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';
// import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-generer-contrat',
  templateUrl: './generer-contrat.component.html',
  styleUrls: ['./generer-contrat.component.scss'],
  // providers: [
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: {showError: true},
  //   },
  // ],
})
export class GenererContratComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
              private dataService : DataService,
              private router : Router,
              public dialog: MatDialog) { }

allSalarie!: any
registerForm!: FormGroup
contrat = new Contrat()
profil!: any
contratByEnt!: any
currentItem!:any;

  ngOnInit(): void {
    this.dataService.getAllSalarie().subscribe((results:any)=>{
      this.allSalarie = results
      console.log('Liste de tous les salaries',results);
      
    })
    this.dataService.getProfilEntreprise().subscribe((result:any)=>{
      this.profil = result
      console.log('profil', result[0]);
      
    })
    this.dataService.getallContratByEnt().subscribe((result:any)=>{
this.contratByEnt =result
console.warn(result);

    })
   
 
  
    this.registerForm = this._formBuilder.group({
      // contrat_id:[this.contrat.contrat_id],
      // fki_entreprise : [this.contrat.fki_entreprise],
      fki_salarie: [this.contrat.fki_salarie, [Validators.required]],
      type_contrat:[this.contrat.type_contrat,[Validators.required]],
      is_fulltime: [this.contrat.is_fulltime,[Validators.required]],
      date_debut: [this.contrat.date_debut,[Validators.required]],
      date_fin: [this.contrat.date_fin],
      periode_essai: [this.contrat.periode_essai, [Validators.required]],
      motif: [this.contrat.motif, [Validators.required]],
      fonction: [this.contrat.fonction, [Validators.required]],
      satut: [this.contrat.satut, [Validators.required]],
    }); 
   
  
  }

onSubmit(){
  const form = this.registerForm.value
  this.contrat.fki_entreprise = this.profil[0].entreprise_id

  this.contrat = Object.assign(this.contrat, form)

  this.dataService.createContrat(this.contrat).subscribe((result:Contrat)=>{
    console.log('Nouveau contrat result : ', result);
    console.log('THIS CONTRAT :', this.contrat);
    // this.router.navigate(['/entreprise/overview/gerer-contrat-ent'])
  })
  
}

openDialog(): void {
  const dialogRef = this.dialog.open(ContratModalComponent,{
    data: { pageValue: this.contrat}
  })
  
  dialogRef.afterClosed().subscribe(result=>{
    console.log('The dialog was closed', result);
    this.dialog = result.data    
  })
}

}
