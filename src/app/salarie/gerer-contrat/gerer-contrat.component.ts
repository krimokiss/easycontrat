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

contratByEnt!:any
allSalarie!: any
profilSalarie!: any
singleEntreprise!:any

  constructor(private dataService: DataService,
            private router: Router,
            private dialog : MatDialog) { }

  ngOnInit(): void {
    this.dataService.getProfil().subscribe((response: any) => {
      if (response && response[0]) {
        this.profilSalarie = response[0]
        // console.log('Profil Salarie',this.profilSalarie);
        
      }
    })

this.dataService.getAllSalarie().subscribe((response: any) => {
  this.allSalarie = response
  // console.log('allSalarie', response);

})
this.dataService.getallContratByEnt().subscribe((result:any)=>{
  this.contratByEnt =result
  // console.warn(result);
  
      })

  }
  onSubmit(id:any){

    this.dataService.deleteContrat(id).subscribe((response:any)=>{
    
      // console.log('response',response);
      return window.location.reload()
      
    })
    
      
      
    }
    onDetails(id:any){
      this.dataService.getOneEntreprise(id).subscribe((response:any)=>{
        this.singleEntreprise=response
        // console.log("Response single entreprise", this.singleEntreprise);
        
      })
      const dialogRef = this.dialog.open(DetailsModalComponent,{
        // data: { contratValue: this.singlecontrat}
        data:id
      })
    //  console.log('ID',id);
     
        
        dialogRef.afterClosed()
      
  
    }

}
