import { FactureModalComponent } from 'src/app/modals/facture-modal/facture-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FactureModel } from 'src/app/models/facture.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gerer-facture-ent',
  templateUrl: './gerer-facture-ent.component.html',
  styleUrls: ['./gerer-facture-ent.component.scss']
})
export class GererFactureEntComponent implements OnInit {

  profilEntreprise!: any
  singlefacture = new FactureModel()
  allFacture!: any
  searchBar: FormControl = new FormControl()

  constructor(private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataService.getProfilEntreprise().subscribe((response: any) => {
      if (response && response) {
        this.profilEntreprise = response
      }
    })

    this.dataService.getallFactureByEnt().subscribe((result: any) => {
      this.allFacture = result
    })

  
  }

  onSubmit(id: any) {

    this.dataService.deleteFacture(id).subscribe((response: any) => {
      // this.snackBar.open("Contrat correctement supprimé " + { duration: 2000 })
      // console.log('DELETE CONTRAT :', response);
      return window.location.reload()

    })

  }
  openSnackBar(id: any) {
    this.dataService.getOneFacture(id).subscribe((response: any) => {
      console.log(response);
      
      this.singlefacture = response
      
          this.snackBar.open(`Etes vous sûr de vouloir supprimer la facture du client :  ${response.nom_client} ?`, 'OUI', {
            duration: 5000,
            panelClass: ['style-class'],
            data: id
          }).onAction().subscribe(() => {
            this.onSubmit(id)
            alert('La facture a bien été supprimée')
          });
        
      

    })
  }
  
  onDetails(id: any) {
    this.dataService.getOneFacture(id).subscribe((response: any) => {
      this.singlefacture = response
      console.log("Response single contrat", this.singlefacture);

      const dialogRef = this.dialog.open(FactureModalComponent, {
        // data: { contratValue: this.singlecontrat}
        width: '80%',
        height: '90vh',

        data: { pageValue: this.singlefacture }
      })
      console.log('ID contrat', this.singlefacture);
      dialogRef.afterClosed()
    })
}
}
