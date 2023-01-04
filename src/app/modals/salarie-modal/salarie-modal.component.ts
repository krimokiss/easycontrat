import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-salarie-modal',
  templateUrl: './salarie-modal.component.html',
  styleUrls: ['./salarie-modal.component.scss']
})
export class SalarieModalComponent implements OnInit {

  salarie!: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dataService : DataService,
              private dialogRef: MatDialogRef<SalarieModalComponent>) { }



  ngOnInit(): void {
    // console.log(this.data);
    this.dataService.getSingleSalarie(this.data).subscribe((result: any) => {
      this.salarie = result
      // console.log('AllSalarie from modal',result);
    })

    
  }
  closeDialog() {
    this.dialogRef.close()
  }
  printPage(){
    window.print();
  }

}
