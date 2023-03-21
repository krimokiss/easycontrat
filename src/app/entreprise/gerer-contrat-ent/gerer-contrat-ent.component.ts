import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsModalComponent } from './../../modals/details-modal/details-modal.component';
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
  allSalarie!: any
  singlecontrat = new Contrat()
  contratBySalarie!: any
  allContratFiltered!: any
  mesContratsFiltered!: any
  mesContrats!: any
  isChecked = true
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

    this.dataService.getAllSalarie().subscribe((response: any) => {
      this.allSalarie = response
    })

    this.dataService.getMesContrats().subscribe((response: any) => {
      this.mesContrats = response
      this.mesContratsFiltered = [...this.mesContrats]
    })

    this.dataService.getallContratBySalarie().subscribe((result: any) => {
      this.contratBySalarie = result
      this.allContratFiltered = [...this.contratBySalarie]
    })

    this.searchBar.valueChanges.subscribe((resultats: any) => {

      if (this.isChecked) {
        this.allContratFiltered = this.contratBySalarie.filter((user: any) => {

          return user.fonction.toLowerCase().includes(resultats.toLowerCase()) ||
            user.statut.toLowerCase().includes(resultats.toLowerCase()) ||
            user.prenom.toLowerCase().includes(resultats.toLowerCase()) ||
            user.nom.toLowerCase().includes(resultats.toLowerCase())
        })
      } else {
        this.mesContratsFiltered = this.mesContrats.filter((user: any) => {

          return user.fonction.toLowerCase().includes(resultats.toLowerCase()) ||
            user.statut.toLowerCase().includes(resultats.toLowerCase()) ||
            user.prenom.toLowerCase().includes(resultats.toLowerCase()) ||
            user.nom.toLowerCase().includes(resultats.toLowerCase())

        })
      }
    })
  }

  onSubmit(id: any) {

    this.dataService.deleteContrat(id).subscribe((response: any) => {
      // this.snackBar.open("Contrat correctement supprimé " + { duration: 2000 })
      // console.log('DELETE CONTRAT :', response);
      return window.location.reload()
    })
  }
  openSnackBar(id: any) {
    this.dataService.getOneContrat(id).subscribe((response: any) => {
      this.singlecontrat = response
      this.allSalarie.map((value: any) => {
        if (value.salarie_id == this.singlecontrat.fki_salarie) {

          this.snackBar.open(`Etes vous sûr de vouloir supprimer le contrat de :  ${value.prenom}  ${value.nom} ?`, 'OUI', {
            duration: 5000,
            panelClass: ['style-class'],
            data: id
          }).onAction().subscribe(() => {
            this.onSubmit(id)
            alert('Le contrat a bien été supprimé')
          });
        }
      })

    })
  }
  onDetails(id: any) {
    this.dataService.getOneContrat(id).subscribe((response: any) => {
      this.singlecontrat = response
      console.log("Response single contrat", this.singlecontrat);

      const dialogRef = this.dialog.open(DetailsModalComponent, {
        // data: { contratValue: this.singlecontrat}
        width: '80%',
        height: '90vh',
        data: this.singlecontrat
      })
      console.log('ID contrat', this.singlecontrat);
      dialogRef.afterClosed()
    })




  }



  printPage() {
    window.print();
  }
}
