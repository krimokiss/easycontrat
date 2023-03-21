import { FactureModel } from './../../models/facture.model';
import { Component, OnInit } from '@angular/core';
import { FactureModalComponent } from 'src/app/modals/facture-modal/facture-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generer-facture',
  templateUrl: './generer-facture.component.html',
  styleUrls: ['./generer-facture.component.scss']
})
export class GenererFactureComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog) { }


    allFacture!: any
    registerForm!: FormGroup
    facture = new FactureModel()
    profil!: any
    factureByEnt!: any

  ngOnInit(): void {
    this.dataService.getallFacture().subscribe((results: any) => {
      this.allFacture = results
      // console.log('Liste de tous les salaries',results);

    })
    this.dataService.getProfilEntreprise().subscribe((result: any) => {
      this.profil = result
      // console.log('profil', result);

    })
    this.dataService.getallFactureByEnt().subscribe((result: any) => {
      this.factureByEnt = result
      // console.warn(result);

    })

    this.registerForm = this._formBuilder.group({
      // facture_id:[this.facture.facture_id],
      // fki_entreprise : [this.facture.fki_entreprise],
      nom_client: [this.facture.nom_client, [Validators.required]],
      adresse_client: [this.facture.adresse_client, [Validators.required]],
      cp_client: [this.facture.cp_client, [Validators.required]],
      ville_client: [this.facture.ville_client, [Validators.required]],
      date_facture: [this.facture.date_facture,[Validators.required]],
      description: [this.facture.description, [Validators.required]],
      tarif: [this.facture.tarif, [Validators.required]],
      quantite: [this.facture.quantite, [Validators.required]],
      tva: [this.facture.tva, [Validators.required]],
      paiement: [this.facture.paiement, [Validators.required]],
      payer: [this.facture.payer, [Validators.required]],
    });

  }

  onSubmit() {
    const form = this.registerForm.value
    this.facture.fki_entreprise = this.profil.entreprise_id

    this.facture = Object.assign(this.facture, form)

    this.dataService.createFacture(this.facture).subscribe((result) => {
      // console.log('Nouvelle facture générée : ', result);
      // console.log('THIS FACTURE :', this.facture);
      // console.log(result.rows[0].facture_id);
      this.facture.facture_id = result.rows[0].facture_id
    })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FactureModalComponent, {
      data: { pageValue: this.facture }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.dialog = result.data
    })
    // console.log(this.facture);
    
  }

}
