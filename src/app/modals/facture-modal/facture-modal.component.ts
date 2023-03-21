import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture-modal',
  templateUrl: './facture-modal.component.html',
  styleUrls: ['./facture-modal.component.scss']
})
export class FactureModalComponent implements OnInit {

  factureForm!: any
  ID!: any
  entreprise!: any
  allFacture!: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dataService: DataService,
  private router : Router,
  private _fb: FormBuilder,
  private dialogRef: MatDialogRef<FactureModalComponent>
) {
  this.factureForm = data.pageValue
  // console.log(this.data)
}

todayString: string = new Date().toDateString();

  ngOnInit(): void {
    console.log('FACTUREFORM FROM REGISTER : ', this.factureForm);
    this.dataService.getProfilEntreprise().subscribe((result: any) => {
      // console.log(result);
      this.entreprise = result
    })
    this.dataService.getallFacture().subscribe((result: any) => {
      this.allFacture = result
      // console.log(result);


    })
    // console.log(this.factureForm);
    // console.log(this.data);
    
    

  }
  calculerTotal(): number {
    const tarif = this.data.pageValue.tarif;
    const quantite = this.data.pageValue.quantite;
    const tva = this.data.pageValue.tva;
  
    const totalHt = tarif * quantite;
    const tvaAmount = totalHt * tva / 100;
    const totalTtc = totalHt + tvaAmount;
  
    return totalTtc;
  }
  calculerTva(): number {
    const tarif = this.data.pageValue.tarif;
    const quantite = this.data.pageValue.quantite;
    const tva = this.data.pageValue.tva;
  
    const tvaAmount = (tarif * quantite * tva) / 100;
  
    return tvaAmount;
  }
  calculerHT(): number {
    const tarif = this.data.pageValue.tarif;
    const quantite = this.data.pageValue.quantite;
    const totalHT = tarif*quantite
    
    return totalHT
  }
  

  openPDF() {
    var element = document.getElementById('text');
    var opt = {
      margin: 1,
      filename: 'Facture.pdf',
      image: { type: 'jpg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS:true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }
  

  closeDialog() {
    this.dialogRef.close()
  }
  
printPage(){
  window.print();
}

}


