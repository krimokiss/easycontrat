import { DetailsModalComponent } from './../../modals/details-modal/details-modal.component';
import { ContratModalComponent } from './../../modals/contrat-modal/contrat-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Contrat } from './../../models/contrat.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-contrat-ent',
  templateUrl: './gerer-contrat-ent.component.html',
  styleUrls: ['./gerer-contrat-ent.component.scss']
})
export class GererContratEntComponent implements OnInit {

  profilEntreprise!: any
  allContrat!: any
  allSalarie!: any
  singlecontrat= new Contrat()
  contratByEnt!: any
  contratBySalarie!: any
  allContratFiltered!: any
  searchBar: FormControl = new FormControl()

  constructor(private dataService: DataService,
    private router: Router,
    public dialog : MatDialog) { }

  ngOnInit(): void {

    this.dataService.getProfilEntreprise().subscribe((response: any) => {
      if (response && response) {
        this.profilEntreprise = response
        console.log('Profil entreprise', this.profilEntreprise);

      }
    })
    this.dataService.getallContrat().subscribe((response: any) => {
      if (response && response) {
        this.allContrat = response
        console.log('Contrats', response);

      }
    })

    this.dataService.getAllSalarie().subscribe((response: any) => {
      this.allSalarie = response
      console.log('allSalarie', response);

    })
    this.dataService.getallContratByEnt().subscribe((result: any) => {
      this.contratByEnt = result
      console.warn(result);
  

    })
    this.dataService.getallContratBySalarie().subscribe((result: any) => {
      this.contratBySalarie = result
      console.warn('contratBysalarie', result);
      this.allContratFiltered = [...this.contratBySalarie]
    })
    this.searchBar.valueChanges.subscribe((resultats: any) => {

      this.allContratFiltered = this.contratBySalarie.filter((user: any) => {

        return user.fonction.toLowerCase().includes(resultats.toLowerCase()) ||
          user.satut.toLowerCase().includes(resultats.toLowerCase()) ||
          user.prenom.toLowerCase().includes(resultats.toLowerCase()) ||
          user.nom.toLowerCase().includes(resultats.toLowerCase())
      })
    })
    

  }

  onSubmit(id: any) {

    this.dataService.deleteContrat(id).subscribe((response: any) => {

      console.log('DELETE CONTRAT :', response);
      return window.location.reload()

    })

  }
  onDetails(id:any){
    this.dataService.getOneContrat(id).subscribe((response:any)=>{
      this.singlecontrat=response
      console.log("Response single contrat", this.singlecontrat);
      
    })
    const dialogRef = this.dialog.open(DetailsModalComponent,{
      // data: { contratValue: this.singlecontrat}
      data:id
    })
   console.log('ID contrat',id);
   
      
      dialogRef.afterClosed()
    

  }

 

  printPage() {
    window.print();
  }
}
