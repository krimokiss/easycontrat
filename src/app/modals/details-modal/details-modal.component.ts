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

  profilEntreprise!: any
  profilSalarie!: any
  contratBySal!: any
  isLoading=false


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private dialogRef: MatDialogRef<DetailsModalComponent>,
    private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {

    this.isLoading=true

    this.activatedRoute.data.subscribe(({contrats})=>{
      console.log('CONTRAT RESOLVER', contrats);
    })
    
    this.dataService.getProfilEntreprise().subscribe((result: any) => {
      this.profilEntreprise = result
    })
    this.dataService.getProfil().subscribe((result: any) => {
      this.profilSalarie = result
    })
    this.dataService.getallContratBySalarie().subscribe((response: any) => {
      this.contratBySal = response
    })
  
  }

  closeDialog() {
    this.dialogRef.close()
  }
  printPage() {
    window.print();
  }
}
