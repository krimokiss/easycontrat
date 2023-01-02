import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-contrat-modal',
  templateUrl: './contrat-modal.component.html',
  styleUrls: ['./contrat-modal.component.scss']
})
export class ContratModalComponent implements OnInit {

  contratForm!: any
  ID!: any
  entreprise!: any
  allSalarie!: any


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<ContratModalComponent>
  ) {
    this.contratForm = data.pageValue
  }


  todayString: string = new Date().toDateString();

  ngOnInit(): void {
    console.log('CONTRATFORM FROM REGISTER : ', this.contratForm);
    this.dataService.getProfilEntreprise().subscribe((result: any) => {
      console.log(result);
      this.entreprise = result[0]
    })
    this.dataService.getAllSalarie().subscribe((result: any) => {
      this.allSalarie = result
      console.log(result);


    })

  }
  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.ID })
  }

}
