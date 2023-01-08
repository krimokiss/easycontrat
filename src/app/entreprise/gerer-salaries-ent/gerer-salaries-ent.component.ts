import { SalarieModalComponent } from './../../modals/salarie-modal/salarie-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gerer-salaries-ent',
  templateUrl: './gerer-salaries-ent.component.html',
  styleUrls: ['./gerer-salaries-ent.component.scss']
})
export class GererSalariesEntComponent implements OnInit {

  allSalarie!: any
  singleSalarie!: any
  profil!: any
  allcontrat !: any
  allSalarieFiltered!: any
  contratBySal!: any
  searchBar: FormControl = new FormControl()

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private dataService: DataService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {



    this.dataService.getAllSalarie().subscribe((response: any) => {
      this.allSalarie = response
      console.log('allSalarie', response);
     
    })
    this.dataService.getProfilEntreprise().subscribe((response: any) => {
      if (response && response) {
        this.profil = response
      }
      this.dataService.getallContrat().subscribe((response: any) => {
        this.allcontrat = response
        console.log('allContrat', response);

      })

    })
    this.dataService.getallContratBySalarie().subscribe((results: any) => {
      this.contratBySal = results
      console.log('ContratBySalarie :', this.contratBySal);
      this.allSalarieFiltered = [...this.contratBySal]
    })



    this.searchBar.valueChanges.subscribe((resultats: any) => {
      this.allSalarieFiltered = this.contratBySal.filter((user: any) => {
        return user.nom.toLowerCase().includes(resultats.toLowerCase()) ||
          user.prenom.toLowerCase().includes(resultats.toLowerCase())
      })
    })

    this.allSalarieFiltered.paginator = this.paginator
  }

  onDetails(id: any) {
    this.dataService.getSingleSalarie(id).subscribe((response: any) => {
      this.singleSalarie = response
      // console.log('Single Salarrie is :', response);

    })

    const dialogRef = this.dialog.open(SalarieModalComponent, {
      // data: { contratValue: this.singlecontrat}
      data: id
    })


    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      this.dialog = result.data
    })
  }

  printPage() {
    window.print();
  }

  // onSubmit(id:any){
  //   this.dataService.deleteSalarie(id).subscribe((response:any)=>{
  //     console.log('response',response);
  //     return window.location.reload()
  //      })      
  //   }

}
