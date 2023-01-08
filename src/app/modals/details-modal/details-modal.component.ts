import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {

  singleContrat!: any
  allSalarie !: any
  entreprise!: any
  profilSalarie!: any
  singleEntreprise!: any
  contratBySal!: any
  infos!:any
  ID!: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private dialogRef: MatDialogRef<DetailsModalComponent>,
    private activatedRoute: ActivatedRoute) {
    // this.ID = data
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(({contrats})=>{
      console.log('CONTRAT RESOLVER', contrats);
      
    })

    // console.log(this.data)
  
    // this.dataService.getOneContrat(this.data[0]).subscribe((response: any) => {
    //   this.singleContrat = response
    //   console.log("Response single contrat", response);
    // })

    
    this.dataService.getProfilEntreprise().subscribe((result: any) => {
      // console.log('Profil entreprise from modal',result);
      this.entreprise = result
    })
    this.dataService.getAllSalarie().subscribe((result: any) => {
      this.allSalarie = result
      // console.log('AllSalarie from modal',result);
    })



   
    this.dataService.getallContrat().subscribe((response: any) => {
      this.contratBySal = response
      // console.log('CONTRAT BY SALARIE', response);
    })
    // this.dataService.getOneEntreprise(this.data[0]).subscribe((response: any) => {
    //   this.singleEntreprise = response
    //   console.log('SINGLE ENTREPRISE', this.singleEntreprise);
    // })
    this.dataService.getProfil().subscribe((result: any) => {
      this.profilSalarie = result
      // console.log('PROFIL SALARIE', result);
    })
  
   
    // this.activatedRoute.data.subscribe(({profile})=>{
    //   this.allSalarie = profile
    // })

  }
  closeDialog() {
    this.dialogRef.close()
  }
  printPage() {
    window.print();
  }


}
