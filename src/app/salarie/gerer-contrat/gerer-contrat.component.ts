import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsModalComponent } from './../../modals/details-modal/details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-contrat',
  templateUrl: './gerer-contrat.component.html',
  styleUrls: ['./gerer-contrat.component.scss']
})
export class GererContratComponent implements OnInit {

  contratByEnt!: any
  allSalarie!: any
  profilSalarie!: any
  singleEntreprise!: any
  allEntreprise!: any

  constructor(private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataService.getProfil().subscribe((response: any) => {
      if (response && response) {
        this.profilSalarie = response
      }
    })

    this.dataService.getAllSalarie().subscribe((response: any) => {
      this.allSalarie = response
    })
    this.dataService.getallContratByEnt().subscribe((result: any) => {
      this.contratByEnt = result
    })
    this.dataService.getAllEntreprise().subscribe((result: any) => {
      this.allEntreprise = result
    })

  }
  // onSubmit(id:any){

  //   this.dataService.deleteContrat(id).subscribe((response:any)=>{
  //     this.snackBar.open("Contrat correctement supprimé " + { duration: 2000 })
  //     console.log('response',response);
  //     return window.location.reload()
  //   })
  //   }

  // openSnackBar(id:any){
  //   this.dataService.getOneContrat(id).subscribe((response:any)=>{
  //     this.contratByEnt=response
  //     this.allEntreprise.map((value:any)=>{
  //       if (value.entreprise_id == this.contratByEnt.fki_entreprise) {
  //         this.snackBar.open(`Etes vous sûr de vouloir supprimer ${value.raison_sociale} ?`, 'OUI',  {
  //           duration: 2000,
  //           panelClass: ['style-class'],
  //           data: id
  //         }).onAction().subscribe(() => {
  //           this.onSubmit(id)
  //           // alert('Le contrat a bien été supprimé')
  //         });
  //       }
  //     })

  //   })
  // }

  onDetails(id: any) {
    this.dataService.getOneEntreprise(id).subscribe((response: any) => {
      this.singleEntreprise = response
      // console.log("Response single entreprise", this.singleEntreprise);
      const dialogRef = this.dialog.open(DetailsModalComponent, {
        // data: { contratValue: this.singlecontrat}
        width: '80%',
        height: '90vh',
        data: this.singleEntreprise
      })
      // console.log('ID FROM GERER CONTRAT',this.singleEntreprise);
      dialogRef.afterClosed()
    })
  }

}
