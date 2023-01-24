import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/models/entreprise.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-registerentreprise',
  templateUrl: './registerentreprise.component.html',
  styleUrls: ['./registerentreprise.component.scss']
})
export class RegisterentrepriseComponent implements OnInit {

  inscription = new FormControl('');
  emailRegex!: RegExp;
  passwordRegex!: RegExp;
  postaleRegex!: RegExp;
  villeRegex!: RegExp;
  adresseRegex!: RegExp;
  registerForm!: FormGroup;
  entreprise = new Entreprise()
  isLoading =false
  mdpErreur=true
  hide=true
  apiEntreprise!:any
  list!:any
  test!:any

  title = 'signatureJS';
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: any;

  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/
    this.passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20})/
    this.postaleRegex = /^d[9]/
    this.villeRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    this.adresseRegex = /^[a-zA-Z0-9\s,'-]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153]*$/


    this.registerForm = this.formbuilder.group({
      civilite: [this.entreprise.civilite, [Validators.required]],
      nom: [this.entreprise.nom, [Validators.required]],
      prenom: [this.entreprise.prenom, [Validators.required]],
      telephone: [this.entreprise.telephone, [Validators.required, Validators.minLength(2)]],
      rue: [this.entreprise.rue, [Validators.required]],
      cp: [this.entreprise.cp, [Validators.required]],
      ville: [this.entreprise.ville, [Validators.required]],
      email: [this.entreprise.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      mdp: [this.entreprise.mdp, [Validators.required, Validators.pattern(this.passwordRegex)]],
      siret: [this.entreprise.siret, [Validators.minLength(9),Validators.maxLength(14),Validators.pattern('[0-9]{9}')]],
      raison_sociale: [this.entreprise.raison_sociale, [Validators.required]],
      code_ape: [this.entreprise.code_ape, [Validators.required]],
      role: [this.entreprise.role],
      confirmMdp: [this.entreprise.confirmMdp, [Validators.required]],
      sign: [this.entreprise.sign], 
      // ConfirmPassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],

    });

 


  }
  onGetNom(){
    this.dataService.getApiEntreprise(this.registerForm.value.siret).subscribe((data:any)=>{
      this.apiEntreprise = data.results
      console.log(data.results);
      // this.apiEntreprise.map((result:any)=>{
      //   console.log(result);
      //   this.test =result
      // })
    })
  }
  Send(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.onGetNom()
    }
  }

  showSnackbarAction(content, action) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {
      console.log("Texte apparait apres fermeture de la modale");
    });
    snack.onAction().subscribe(() => {
      console.log("Texte apparait apres le click sur OK de la snackbar");
      this.onSubmit()
    });
  }
  btnText = 'Click me';
  btnDisabled = true;
  buttonClick1() {
    this.btnDisabled = false;
  }

  onSubmit() {

//Verification du mot de passe à l'identique

    const form = this.registerForm.value
    const Register = this.registerForm.value
    const motDePAsse = Register.mdp
    const confirmMotDePasse = Register.confirmMdp
    
    if (motDePAsse !== confirmMotDePasse) {
      this.snackBar.open('Votre second mot de passe n\'est pas identique', 'ok', { verticalPosition: 'top' })
      return;
    }

    this.entreprise = Object.assign(this.entreprise, form)
    console.log('FORM', form);
    
    this.entreprise.sign = this.signaturePad.toDataURL();
    this.dataService.registerEntreprise(this.entreprise).subscribe((result: any) => {
      console.log(result);
      
      if (result) {
        localStorage.setItem('token',(result.token))
        localStorage.setItem('role',(result.newUser.rows[0].role))
        // localStorage.setItem('user', JSON.stringify(this.email))
        this.router.navigate(['/entreprise/overview/gerer-profil-ent'])
        // console.log(result.datas.role);
        
      }
    })
    this.isLoading = true
    setTimeout(() => this.isLoading = false, 95000);

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
    this.entreprise.sign = this.signaturePad.toDataURL();
    console.log(this.signatureImg);
    
    return this.signatureImg
  }
}
