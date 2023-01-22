import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contrat } from './../../models/contrat.model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-modal',
  templateUrl: './signature-modal.component.html',
  styleUrls: ['./signature-modal.component.scss']
})
export class SignatureModalComponent implements OnInit {

  title = 'signatureJS';
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: any;

 
registerForm!: FormGroup;
  profilContrat!:any
  contrat: Contrat = new Contrat();



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dataService : DataService,
              private formbuilder : FormBuilder,
              private snackBar : MatSnackBar,
              private dialogRef : MatDialogRef<SignatureModalComponent>) { }

  ngOnInit(): void {
  
    this.contrat = new Contrat();

    this.registerForm = this.formbuilder.group({
      fki_entreprise: [this.data.fki_entreprise],
      fki_salarie: [this.data.fki_salarie],
      type_contrat: [this.data.type_contrat],
      is_fulltime: [this.data.is_fulltime],
      date_debut: [this.data.date_debut],
      date_fin: [this.data.date_fin],
      periode_essai: [this.data.periode_essai],
      motif: [this.data.motif],
      fonction: [this.data.fonction],
      statut: [this.data.statut],
      remuneration: [this.data.remuneration],
      validation: [this.data.validation, [Validators.required]],
     
    });

    console.log(this.registerForm.value);
    this.contrat = new Contrat();
    this.profilContrat.validation = this.signaturePad.toDataURL();
  
  }
  updateContrat() {
  
    const form = this.registerForm.value
    
    this.contrat = Object.assign(this.contrat, form)
    this.registerForm.value.validation = this.signaturePad.toDataURL();
    
  
    this.dataService.updateContrat(this.data, this.data.contrat_id  ).subscribe(res => {
      this.ngOnInit()
    }
    
    )
    this.dialogRef.close(
      window.location.reload()
      )
      this.snackBar.open("Signature prise en compte, Merci"  , '', { duration: 2000 })
   
  }
  btnText = 'Click me';
  btnDisabled = true;
  buttonClick1() {
    this.btnDisabled = false;
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  
  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser
  
  }
  
  moved(event: Event) {
    // works in device not in browser
  }
  
  clearPad() {
    this.signaturePad.clear();
  }
  
  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.data.validation = this.signaturePad.toDataURL();
    console.log(this.signatureImg);
    
    return this.signatureImg
  }
}


